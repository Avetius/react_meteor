import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import IcoProfile from '../components/icoProfile';

export const composer = ({context, icoSlug}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (Meteor.subscribe('ico.profile', {icoSlug}).ready()) {
    LocalState.set({'ico.single-sub-ready': true});
    const icoEntity = Collections.IcoProjects.findOne({slugUrlToken: icoSlug});
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
