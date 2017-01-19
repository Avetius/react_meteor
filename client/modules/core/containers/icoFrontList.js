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


    icoEntities = icoEntities.sort((a,b) => {
      /**
       * Negative number = a first, positive number = b first, 0 means unchanged;
       *
       * In other words date 'a' on the right side means - dates later in time go first,
       * date 'a' on left means dates sooner go first.
       *
       */

      if (_.includes(['scam', 'suspicious'], subView)) {
        return b.createdAt - a.createdAt;
      } else if (subView === 'ongoing') {
        return a.icoEndDatetime - b.icoEndDatetime;
      } else if (subView === 'finished') {
        return b.icoEndDatetime - a.icoEndDatetime;

      } else if (subView === 'upcoming') {
        // if dates missing show it at last

        if (!a.icoStartDatetime && !a.icoEndDatetime) {
          return 1;
        }
        if (!b.icoStartDatetime && !b.icoEndDatetime) {
          return -1;
        }
        return a.icoStartDatetime - b.icoStartDatetime;
      }

    });

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
