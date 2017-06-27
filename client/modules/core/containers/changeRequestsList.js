import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import _ from 'lodash';
import UsersMgmtShared from '/lib/usersMgmtShared';

import ChangeRequestsList from '../components/changeRequestsMgmt/changeRequestsList';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  if (Meteor.userId()) {
    if (Meteor.subscribe('ico.change-requests').ready()) {
      let changeRequests = Collections.ChangeRequests.find({}).fetch();
      const actionTypes = ['rejectedBy', 'approvedBy', 'publishedBy'];
      if (UsersMgmtShared.isCurrentUserSuperAdmin() || UsersMgmtShared.isCurrentUserContentAdmin()) {
        changeRequests = _.map(changeRequests, (changeRequest) => {
          _.each(actionTypes, (actionType) => {
            if (changeRequest[actionType]) {
              const user = UsersMgmtShared.findUserByLongLivedUserId(changeRequest[actionType]);
              _.assign(changeRequest, {
                [actionType]: {
                  name: UsersMgmtShared.extractName(user),
                  longLivedUserId: changeRequest[actionType]
                }
              });
            }
          });
          if (UsersMgmtShared.isCurrentUserSuperAdmin()) {
            const author = UsersMgmtShared.findUserByLongLivedUserId(changeRequest.author.longLivedUserId);
            _.assign(changeRequest, {authorName: UsersMgmtShared.extractName(author)});
          }
          return changeRequest;
        });
      }
      if (changeRequests) {
        onData(null, {changeRequests, userId: Meteor.userId()});
      }
    }
  } else {
    FlowRouter.go('404');
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ChangeRequestsList);
