import _ from 'lodash';
import {Meteor} from 'meteor/meteor';
import {ChangeRequests} from '/lib/collections';
import {Counter} from 'meteor/natestrauser:publish-performant-counts';
import UsersMgmtShared from '/lib/usersMgmtShared';

export default function () {

  Meteor.publish('ico.change-requests', function () {
    if(!this.userId || (!UsersMgmtShared.isUserSuperAdmin(this.userId) && !UsersMgmtShared.isUserContentAdmin(this.userId) && !UsersMgmtShared.isUserAnyIcoAdmin(this.userId))) {
      throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
    }

    let selector = {};
    let fields = {
      createdAt: 1,
      updatedAt: 1,
      publishRequest: 1,
      published: 1,
      approved: 1,
      rejected: 1,
      icoSlug: 1,
      projectName: 1,
      abbreviation: 1,
      icoId: 1,
      fields: 1
    };

    if (UsersMgmtShared.isUserContentAdmin(this.userId) || UsersMgmtShared.isUserAnyIcoAdmin(this.userId)) {
      const currentUser = Meteor.users.findOne(this.userId);
      selector['author.email'] = UsersMgmtShared.extractEmail(currentUser);
    }

    let userFields =  {publicProfile: 1, longLivedUserId: 1};
    let longLivedUserIds = [];
    if (UsersMgmtShared.isUserSuperAdmin(this.userId) || UsersMgmtShared.isUserContentAdmin(this.userId)) {
      const changeRequests = ChangeRequests.find(selector).fetch();
      _.forEach(changeRequests, (changeRequest) => {
        longLivedUserIds.push(changeRequest.author.longLivedUserId);
        if (changeRequest.approvedBy) {
          longLivedUserIds.push(changeRequest.approvedBy);
        }
        if (changeRequest.rejectedBy) {
          longLivedUserIds.push(changeRequest.rejectedBy);
        }
        if (changeRequest.publishedBy) {
          longLivedUserIds.push(changeRequest.publishedBy);
        }

      });
      _.assign(fields, {approvedBy: 1, rejectedBy: 1, publishedBy: 1, author: 1});
    }

    return [
      Meteor.users.find({longLivedUserId: {$in: longLivedUserIds}}, {fields: userFields}),
      ChangeRequests.find(selector)
    ];
  });
}