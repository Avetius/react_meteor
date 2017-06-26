import AddOrEditIco from '../components/addOrEditIco';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {Meteor} from 'meteor/meteor';
import UsersMgmtShared from '/lib/usersMgmtShared';
import IcoStatus from '/lib/icoStatus'

export const composer = ({context, editMode}, onData) => {
  const {Meteor, Collections} = context();
  const userId = Meteor.userId();
  // lets fetch and edit ICO //
  if (editMode && editMode.icoId) {
    if (Meteor.subscribe('ico.single', { id: editMode.icoId }).ready()) {
      if (!UsersMgmtShared.isCurrentUserSuperAdmin() && !UsersMgmtShared.isCurrentUserContentAdmin()) {
        FlowRouter.go('404');
      }
      const icoEntity = Collections.IcoProjects.findOne(editMode.icoId);
      if (icoEntity) {
        onData(null, { icoEntity, userId: userId, published: IcoStatus.isIcoPublished(icoEntity)});
      } else {
        FlowRouter.go('404');
      }
    } else {
      const icoEntity = Collections.IcoProjects.findOne(editMode.icoId);
      if (icoEntity) {
        onData(null, { icoEntity, userId: userId, published: IcoStatus.isIcoPublished(icoEntity)});
      } else {
        onData(null, { userId: userId });
      }
    }

  // lets create new ICO
  } else {
    onData(null, { userId: Meteor.userId() });
  }

};

export const depsMapper = (context, actions) => ({
  saveEditedIco: actions.icoProject.edit,
  addAsConcept: actions.icoProject.addAsConcept,
  deleteIco: actions.icoProject.deleteIco,
  sendChangeRequest: actions.icoProject.sendChangeRequest,
  context: () => context
});

export default composeAll(
  // consider add: null, null, {pure:true}
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddOrEditIco);
