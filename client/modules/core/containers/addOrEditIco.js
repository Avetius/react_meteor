import AddOrEditIco from '../components/addOrEditIco';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, icoId}, onData) => {
  const {Meteor, Collections} = context();

  // lets fetch and edit ICO
  if (icoId) {

    if (Meteor.subscribe('ico.single', icoId).ready()) {
      const icoEntity = Collections.IcoProjects.findOne(icoId);
      if (icoEntity) {
        onData(null, {icoEntity});
      } else {
        // todo move error message to i18n
        onData(null, {error: true, errorMessage: 'Editing ICO not found.'});
      }

    } else {
      const icoEntity = Collections.IcoProjects.findOne(icoId);
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
  saveAsConcept: actions.icoProject.saveAsConcept,
  context: () => context
});

export default composeAll(
  // consider add: null, null, {pure:true}
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddOrEditIco);
