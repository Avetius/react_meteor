import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import IcoProfile from '../components/icoProfile';

export const composer = ({context, icoSlug}, onData) => {
  const {Meteor, Collections} = context();

  // todo implement real slug
  const icoId = icoSlug;

  if (Meteor.subscribe('ico.single', icoId).ready()) {
    const icoEntity = Collections.IcoProjects.findOne(icoId);
    if (icoEntity) {
      onData(null, {icoEntity});
    } else {
      FlowRouter.go('404');
    }

  } else {
    onData();
  }

};

export const depsMapper = (context, actions) => ({
  // todo implement actions.icoProject.addToWatch,
  publishConcept: actions.icoProject.publishConcept,
  unPublish: actions.icoProject.unPublish,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(IcoProfile);
