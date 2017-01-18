import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import _ from 'lodash';

import IcoStatus from '/lib/icoStatus';
import IcoFrontList from '../components/icoFrontList';

export const composer = ({context, entityStateQuery, subView}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const selector = { 'entityState.state': entityStateQuery };
  const icoListSub = Meteor.subscribe('ico.list', 140);

  // without passing empty data we will show loading component automatically until subscription is ready
  if (icoListSub.ready()) {
    let icoEntities = Collections.IcoProjects.find(selector).fetch();
    icoEntities = IcoStatus.filter(icoEntities, subView);

    //icoEntities = icoEntities.sort((a,b) => {
    //  // negative number = a first, positive number = b first, 0 means unchanged
    //
    //  if (_.includes(['ongoing', 'finished', 'scam', 'suspicious'], subView)) {
    //    return new Date(b.icoEndDatetime) - new Date(a.icoEndDatetime);
    //  } else if (subView === 'upcoming') {
    //    return new Date(a.icoStartDatetime) - new Date(b.icoStartDatetime);
    //  }
    //
    //});

    onData(null, {
      icoEntities: icoEntities,
      subView
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
