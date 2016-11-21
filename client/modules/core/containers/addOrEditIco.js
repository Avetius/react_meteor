import AddOrEditIco from '../components/addOrEditIco';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, editMode}, onData) => {
  const {Meteor, Collections} = context();

  // lets fetch and edit ICO
  if (editMode && editMode.icoId) {

    if (Meteor.subscribe('ico.single', editMode.icoId).ready()) {
      const icoEntity = Collections.IcoProjects.findOne(editMode.icoId);
      if (icoEntity) {
        onData(null, {icoEntity});
      } else {
        // todo move error message to i18n
        onData(null, {error: true, errorMessage: 'Editing ICO not found.'});
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
  saveNewIco: actions.icoProject.add,
  saveEditedIco: actions.icoProject.edit,
  saveAsConcept: actions.icoProject.saveAsConcept,
  context: () => context
});

export default composeAll(
  // consider add: null, null, {pure:true}
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddOrEditIco);
