import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {Meteor} from 'meteor/meteor';
import _ from 'lodash';
import UsersMgmtShared from '/lib/usersMgmtShared';

import ChangeRequestsList from '../components/changeRequestsMgmt/changeRequestsList';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (Meteor.subscribe('ico.change-requests').ready()) {
    let changeRequests = Collections.ChangeRequests.find({}).fetch();
    changeRequests = _.map(changeRequests, (changeRequest) => {
      const author = UsersMgmtShared.getChangeRequestAuthor(changeRequest.author);
      return _.assign(changeRequest, {authorName: UsersMgmtShared.extractName(author)});
    });
    if (changeRequests) {
      onData(null, { changeRequests, userId: Meteor.userId() });
    }

  } else {
    onData();
  }

};

export const depsMapper = (context, actions) => ({
  // todo implement actions.icoProject.addToWatchList,0
  //addToWatchList: actions.icoProject.addToWatchList,
  loadMore: actions.icoProject.loadMore,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ChangeRequestsList);
