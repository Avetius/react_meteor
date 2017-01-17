import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import IcoStatus from '/lib/icoStatus';
import IcoFrontList from '../components/icoFrontList';

export const composer = ({context, entityStateQuery, subView}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const selector = { 'entityState.state': entityStateQuery };
  const icoListSub = Meteor.subscribe('ico.list', 120);

  // without passing empty data we will show loading component automatically until subscription is ready
  if (icoListSub.ready()) {
    let icoEntities = Collections.IcoProjects.find(selector).fetch();
    icoEntities = IcoStatus.filter(icoEntities, subView);
    onData(null, {
      icoEntities: icoEntities
    });
  }
};

export const depsMapper = (context, actions) => ({
  // todo implement actions.icoProject.addToWatchList,
  //addToWatchList: actions.icoProject.addToWatchList,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(IcoFrontList);
