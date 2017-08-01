import {IcoProjects, Counts, ChangeRequests} from '/lib/collections';
import _ from 'lodash';
import {getSelector, getSort, inIcoListUsableFields} from '../icoProject/queries'
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {Counter} from 'meteor/natestrauser:publish-performant-counts';
import UsersMgmtShared from '/lib/usersMgmtShared';
import IcoProfilePublishFields from '/lib/icoPublishFields/icoProfilePublishFields';
import IcoPublicPublishFormFields from '/lib/icoPublishFields/icoPublicPublishFormFields';

/**
 * Publications performances::
 * if you want to unblock some heavy publications in future, try  https://github.com/meteorhacks/unblock
 * but be careful according to this issue: https://github.com/meteorhacks/unblock/issues/11#issuecomment-266263478
 *
 * To be more effective, try adjusting sequence of subscribing.
 */

export default function () {

  const previewOptions = {
    // 2 * visible items = 6 (for now)
    limit: 6,
    fields: inIcoListUsableFields
  };

  Meteor.publish('ico.list-preview-ongoing', function () {
    const options = {sort: getSort({icoStatus: 'ongoing'}), ...previewOptions};
    const selector = getSelector({icoStatus: 'ongoing', entityState: 'published'});
    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.list-preview-upcoming', function () {
    const options = {sort: getSort({icoStatus: 'upcoming'}), ...previewOptions};
    const selector = getSelector({icoStatus: 'upcoming', entityState: 'published'});
    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.list-preview-finished', function () {
    const options = {sort: getSort({icoStatus: 'finished'}), ...previewOptions};
    const selector = getSelector({icoStatus: 'finished', entityState: 'published'});
    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.editMode', function (queryObj) {
    check(queryObj, Object);

    const {icoSlug} = queryObj;
    if (!icoSlug) {
      console.error('ico.editMode publication error: ', 'query object does not have icoSlug');
      return false;
    }

    let options = {
      fields: {}
    };
    if (UsersMgmtShared.isUserIcoAdmin(this.userId, icoSlug)) {
      //publish only fields which are visible on public ico edit form
      options.fields = IcoPublicPublishFormFields;
    } else if(UsersMgmtShared.isUserContentAdmin(this.userId) || UsersMgmtShared.isUserSuperAdmin(this.userId)) {
      //publish all fields
      options.fields = {};
    } else {
      throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
    }

    let selector = {slugUrlToken: icoSlug};
    //publish also related change request for content and ico admins
    if (UsersMgmtShared.isUserContentAdmin(this.userId) || UsersMgmtShared.isUserIcoAdmin(this.userId, icoSlug)) {
      const currentUser = Meteor.users.findOne(this.userId);
      const userEmail = UsersMgmtShared.extractEmail(currentUser);
      let changeRequestSelector = {
        published: { $ne: true },
        'author.email': userEmail,
        approved: false,
        rejected: false,
        icoSlug: icoSlug
      };
      return [
        IcoProjects.find(selector, options),
        ChangeRequests.find(changeRequestSelector)
      ];
    }

    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.profile', function (queryObj) {
    check(queryObj, Object);

    const {icoSlug} = queryObj;
    if (!icoSlug) {
      console.error('ico.profile publication error: ', 'query object does not have icoSlug');
      return false;
    }

    let publishedStateSelector = {'entityState.state': 'published', 'meta.dataStatus': 'production'};
    let conceptStateSelector = {'entityState.state': 'concept', 'meta.dataStatus': 'production'};
    let useConceptStateSelector = false;
    let selector = {slugUrlToken: icoSlug};
    if (this.userId && UsersMgmtShared.isUserIcoAdmin(this.userId, icoSlug)) {
      const currentUser = Meteor.users.findOne(this.userId);
      const managedIcosSlugs = UsersMgmtShared.getManagedIcosSlugs(currentUser);
      //publish concept ico only if it is own created
      _.assign(conceptStateSelector, {slugUrlToken: {$in: managedIcosSlugs}});
      useConceptStateSelector = true;
    }
    if(this.userId && (UsersMgmtShared.isUserContentAdmin(this.userId) || UsersMgmtShared.isUserSuperAdmin(this.userId))) {
      useConceptStateSelector = true;
    }
    if (useConceptStateSelector) {
      _.assign(selector, {$or: [publishedStateSelector, conceptStateSelector]});
    } else {
      //publish only if it is published ico
      _.assign(selector, publishedStateSelector);
    }

    let options = {
      //publish only fields which are visible on profile page
      fields: IcoProfilePublishFields
    };

    return IcoProjects.find(selector, options);
  });
}
