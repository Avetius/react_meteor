import AddOrEditIco from '../components/addOrEditIco';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, editMode}, onData) => {
  const {Meteor, Collections} = context();

  // lets fetch and edit ICO
  if (editMode && editMode.icoId) {

    if (Meteor.subscribe('ico.single', { id: editMode.icoId }).ready()) {
      const icoEntity = Collections.IcoProjects.findOne(editMode.icoId);
      if (icoEntity) {
        onData(null, {icoEntity});
      } else {
        FlowRouter.go('404');
      }

    } else {
      const icoEntity = Collections.IcoProjects.findOne(editMode.icoId);
      if (icoEntity) {
        onData(null, {icoEntity});
      } else {
        onData();
      }
    }

  // lets create new ICO
  } else {
    onData(null, {});
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
