import AddOrEditIco from '../components/addOrEditIco';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, icoId}, onData) => {
  const {Meteor, Collections} = context();
  // tmp
  const params = icoId;
  console.log(icoId);

  // todo - currently deadloop:

  // lets fetch and edit ICO
  if (params && params.icoId) {
    console.log('inside container; icoId: ', params.icoId);
    let icoEntity = Collections.IcoProjects.findOne({ _id: params.icoId });
    if (icoEntity) {
      console.log('fetched icoEntity: ', icoEntity);
      onData(null, {icoEntity});
    } else {
      if (Meteor.subscribe('ico.single', params.icoId).ready()) {
        icoEntity = Collections.IcoProjects.findOne({_id: params.icoId});
        console.log('fetched icoEntity: ', icoEntity);
        onData(null, {icoEntity});
      } else {
        onData();
      }
    }
  // lets create new ICO
  } else {
    onData(null, {null});
  }

};

export const depsMapper = (context, actions) => ({
  saveNewIco: actions.icoProject.add,
  saveAsConcept: actions.icoProject.saveAsConcept,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddOrEditIco);
