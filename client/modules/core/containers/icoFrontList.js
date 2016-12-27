import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import IcoFrontList from '../components/icoFrontList';

export const composer = ({context, mode}, onData) => {
  const {Meteor, Collections} = context();

  let selector;

  if (mode === 'concepts') {
    selector = { 'entityState.state': 'concept' };
  } else {
    selector = { 'entityState.state': 'published' };
  }

  // without passing empty data we will show loading component automatically until subscription is ready
  if (Meteor.subscribe('ico.list', 120).ready()) {
    const icoEntities = Collections.IcoProjects.find(selector).fetch();
    if (icoEntities) {
      onData(null, {icoEntities});
    } else {
      // todo move error message to i18n
      onData(null, {error: true, errorMessage: 'ico.list publication likely didn\'t provide any data.'});
    }
  }

};

export const depsMapper = (context, actions) => ({
  // todo implement actions.icoProject.watch,
  //toWatch: actions.icoProject.addToWatchList,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(IcoFrontList);
