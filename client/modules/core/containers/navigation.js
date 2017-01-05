import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import Navigation from '../components/navigation';

export const composer = ({context, icoSlug}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (Meteor.userId() || LocalState.get('globalCounts')) {
    onData( null, { globalCounts: LocalState.get('globalCounts'), userId: Meteor.userId() });
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Navigation);
