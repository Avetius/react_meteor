import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import IcoFrontList from '../components/icoFrontList';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

    if (Meteor.subscribe('ico.list').ready()) {
      const icoEntities = Collections.IcoProjects.find({}).fetch();
      if (icoEntities) {
        onData(null, {icoEntities});
      } else {
        // todo move error message to i18n
        onData(null, {error: true, errorMessage: 'ico.list publication likely didn\'t provide any data.'});
      }

    } else {
      const icoEntities = Collections.IcoProjects.find({}).fetch();
      if (icoEntities) {
        onData(null, {icoEntities});
      } else {
        onData();
      }
    }

};

export const depsMapper = (context, actions) => ({
  // todo implement actions.icoProject.watch,
  //saveNewIco: actions.icoProject.addToWatchList,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(IcoFrontList);
