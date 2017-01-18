import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import _ from 'lodash';

import Navigation from '../components/navigation';
import IcoStatus from '/lib/icoStatus';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const categoryCountsSub = Meteor.subscribe('ico.category-counts');

  if (categoryCountsSub.ready()) {
    const categoryCounts = Collections.Counts.findOne({_id: 'categories'});
    if (categoryCounts) {
      LocalState.set({ categoryCounts: categoryCounts });
    } else {
      console.error('ico.category-counts publication likely didn\'t provide any data.');
    }
  }

  if (Meteor.userId() || LocalState.get('globalCounts') || FlowRouter.getRouteName() || LocalState.get('categoryCounts')) {
    const routeName = FlowRouter.getRouteName();
    // map ico.home route to ico.index for nav item highlighting
    let view = routeName === 'ico.home' ? 'ico.index' : routeName;

    let subNav;
    const allowedRouteNames = ['ico.profile', 'ico.index', 'ico.home', 'ico.concepts'];
    if (_.includes(allowedRouteNames, routeName)) {
      // if ico.home routename is active then ongoing tab is default subView
      let subView = FlowRouter.getParam('subView') || 'ongoing';

      // for this route we want to highlight nav items which belongs to view/subview of current shown ICO
      if (routeName === 'ico.profile' && LocalState.get('ico.single-sub-ready')) {
        const currentIco = Collections.IcoProjects.findOne({_id: FlowRouter.getParam('icoSlug')});
        if (currentIco) {
          const icoStatus = IcoStatus.compute(currentIco);
          const icoEntityState = IcoStatus.computeEntityState(currentIco);

          view = icoEntityState === 'published' ? 'ico.index' : 'ico.concepts';
          subView = icoStatus;
        }
      }

      let categoryCounts = {};
      if (LocalState.get('categoryCounts')) {
        const icoEntityState = (view === 'ico.concepts') ? 'concept': 'published';
        const categoryCountsObj = LocalState.get('categoryCounts');

        categoryCounts = {
          ongoing: categoryCountsObj[icoEntityState].ongoing,
          upcoming: categoryCountsObj[icoEntityState].upcoming,
          finished: categoryCountsObj[icoEntityState].finished,
          scam: categoryCountsObj[icoEntityState].scam,
          suspicious: categoryCountsObj[icoEntityState].suspicious
        };
      }

      // separate data for sub nav component, also with copied view property
      subNav = {
        subView: subView,
        view: view,
        categoryCounts: categoryCounts
      };
    }

    onData( null, {
      globalCounts: LocalState.get('globalCounts'),
      userId: Meteor.userId(),
      view: view,
      subNav: subNav
    });
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Navigation);
