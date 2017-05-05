import AddOrEditIco from '../components/addOrEditIco';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {Meteor} from 'meteor/meteor';

export const composer = ({context, editMode}, onData) => {
  const {Meteor, Collections} = context();

  // lets fetch and edit ICO //
  if (editMode && editMode.icoId) {

    if (Meteor.subscribe('ico.single', { id: editMode.icoId }).ready()) {
      const icoEntity = Collections.IcoProjects.findOne(editMode.icoId);
      if (icoEntity) {
        onData(null, { icoEntity, userId: Meteor.userId() });
      } else {
        FlowRouter.go('404');
      }

    } else {
      const icoEntity = Collections.IcoProjects.findOne(editMode.icoId);
      if (icoEntity) {
        onData(null, { icoEntity, userId: Meteor.userId() });
      } else {
        onData(null, { userId: Meteor.userId() });
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
  context: () => context
});

export default composeAll(
  // consider add: null, null, {pure:true}
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddOrEditIco);
