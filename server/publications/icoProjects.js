import {IcoProjects, Counts} from '/lib/collections';
import { getSelector, getSort, inIcoListUsableFields } from '../icoProject/queries'
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {Counter} from 'meteor/natestrauser:publish-performant-counts';
import AccountsMgmt from '/lib/accountsMgmt';

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
    const options = { sort: getSort({ icoStatus: 'ongoing'}), ...previewOptions };
    const selector = getSelector({ icoStatus: 'ongoing', entityState: 'published' });

    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.list-preview-upcoming', function () {
    const options = { sort: getSort({ icoStatus: 'upcoming' }), ...previewOptions };
    const selector = getSelector({ icoStatus: 'upcoming', entityState: 'published' });

    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.list-preview-finished', function () {
    const options = { sort: getSort({ icoStatus: 'finished' }), ...previewOptions };
    const selector = getSelector({ icoStatus: 'finished', entityState: 'published' });

    return IcoProjects.find(selector, options);
  });


  Meteor.publish('ico.single', function (queryObj) {
    check(queryObj, Object);

    let options = {
      fields: {}
    };

    let selector = { $or: [{ 'entityState.state': 'published' }, { 'entityState.state': 'concept' }]};

    const { icoSlug, id } = queryObj;
    if (!icoSlug && !id) {
      console.error('ico.single publication error: ', 'query object does not have icoSlug or id property.');
      return [];
    }
    if (!icoSlug) {
      selector._id = id;
    } else {
      selector.slugUrlToken = icoSlug;
    }

    if (!this.userId) {
      // todo make some omits for admin data for non-admins?
      options.fields = {...options.fields };
    }
    const ico = IcoProjects.findOne(selector, options);
    console.log(ico);
    return IcoProjects.find(selector, options);
  });


  /**
   * global counts part
   *
   *  we're using publish-performant-counts (https://github.com/nate-strauser/meteor-publish-performant-counts)
   implementation is not complicated: https://github.com/nate-strauser/meteor-publish-performant-counts/blob/master/lib/server.js
   */

  const counter = new Counter('concepts-prod', IcoProjects.find({
    'meta.dataStatus': 'production',
    'entityState.state': 'concept'
  }));

  const counter2 = new Counter('published-prod', IcoProjects.find({
    'meta.dataStatus': 'production',
    'entityState.state': 'published'
  }));

  const counter3 = new Counter('all-test', IcoProjects.find({
    'meta.dataStatus': 'test'
  }));

  Meteor.publish('ico.global-counts', function() {
    if (this.userId) {
      return [counter, counter2, counter3];
    } else {
      return [counter2];
    }
  });

  /**
   *   category counts part
   *
   *   for categories counts we're using own separate collection; we compute those data in Methods
   */
  Meteor.publish('ico.category-counts', function() {
    return Counts.find({_id: 'categories'});
  });
}
