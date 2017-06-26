import ManageChangeRequest from '../components/changeRequestsMgmt/manageChangeRequest';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {Meteor} from 'meteor/meteor';

export const composer = ({context, requestId}, onData) => {
  const {Meteor, Collections} = context();

  if (requestId) {
    const userId = Meteor.userId();
    if (Meteor.subscribe('ico.change-requests').ready()) {
      const changeRequest = Collections.ChangeRequests.findOne(requestId);
      if (changeRequest) {
        onData(null, {changeRequest, userId: userId});
      } else {
        FlowRouter.go('404');
      }
    }
  } else {
    onData(null, {userId: Meteor.userId()});
  }

};

export const depsMapper = (context, actions) => ({
  saveEditedIco: actions.icoProject.edit,
  approveChangeRequest: actions.icoProject.approveChangeRequest,
  rejectChangeRequest: actions.icoProject.rejectChangeRequest,
  rejectApproved: actions.icoProject.rejectApproved,
  approveRejected: actions.icoProject.approveRejected,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ManageChangeRequest);
