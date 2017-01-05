import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import IcoFrontList from '../components/icoFrontList';

export const composer = ({context, mode}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  let selector;

  if (mode === 'concepts') {
    selector = { 'entityState.state': 'concept' };
  } else {
    selector = { 'entityState.state': 'published' };
  }

  const icoListSub = Meteor.subscribe('ico.list', 120);
  const categoryCountsSub = Meteor.subscribe('ico.category-counts');

  // without passing empty data we will show loading component automatically until subscription is ready
  if (icoListSub.ready()) {
    const icoEntities = Collections.IcoProjects.find(selector).fetch();
    if (icoEntities) {
      LocalState.set({icoEntities: icoEntities});
    } else {
      // todo move error message to i18n
      onData(null, {error: true, errorMessage: 'ico.list publication likely didn\'t provide any data.'});
    }
  }

  if (categoryCountsSub.ready()) {
    const categoryCounts = Collections.Counts.findOne({_id: 'categories'});
    if (categoryCounts) {
      LocalState.set({ categoryCounts: categoryCounts });
    } else {
      // todo move error message to i18n
      onData(null, {error: true, errorMessage: 'ico.category-counts publication likely didn\'t provide any data.'});
    }
  }

  if (icoListSub.ready() && categoryCountsSub.ready()) {
    onData(null, {
      icoEntities: LocalState.get('icoEntities'),
      // subscribed in globalSubscriptions
      globalCounts: LocalState.get('globalCounts'),
      categoryCounts: LocalState.get('categoryCounts'),
      mode: mode
    });
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
