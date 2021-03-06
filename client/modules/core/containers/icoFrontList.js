import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import _ from 'lodash';

import IcoStatus from '/lib/icoStatus';
import IcoFrontList from '../components/icoFrontList';
import actions from '../actions';

export const composer = ({context, entityState, subView }, onData) => {
  const {Meteor, LocalState, NonReactiveLocalState, CacheCollections: {IcoProjectsCache}} = context();

  /**
   *  fast render block - these items are not saved anywhere, only rendered
   */
  if (!NonReactiveLocalState['icoProjects.fastRenderedInserted']) {
    const payload = FastRender.debugger.getPayload();
    if (payload) {
      const collections = FastRender.debugger.getPayload().collectionData;
      const icoProjectsFastRendered = collections && collections.icoProjects && collections.icoProjects[0];
      if (icoProjectsFastRendered) {
        icoProjectsFastRendered.forEach((icoProject) => {
          icoProject._id = (Math.random()*1000).toString();
        });

        NonReactiveLocalState['icoProjects.fastRenderedInserted'] = true;
        onData(null, {
          icoEntities: icoProjectsFastRendered,
          subView
        });
      }
    }
  }


  /**
   *  standard meteor methods block - these items are saved in cache client side collection and rendered
   */

  // render from client cache sub-section;
  // if it is not needed to fetch new icos - just render those from client cache

  let shouldFetch;
  if (LocalState.get('categoryCounts')) {

    const categoryCountsObj = LocalState.get('categoryCounts');
    const icoProjectsInCache = IcoProjectsCache.find({ icoStatus: subView, 'entityState.state': entityState }, { reactive: false }).fetch();
    if (icoProjectsInCache.length === categoryCountsObj[entityState][subView]) {

      //console.log('goingToRender from cache: ');
      onData(null, {
        icoEntities: icoProjectsInCache,
        subView
      });
      shouldFetch = false;

    } else {
      shouldFetch = true;
    }
  } else {
    shouldFetch = true;
  }


  if (shouldFetch) {

    // fetch new ICOs sub-section
    const timestampKey = 'icoProjects.timestampToBound.' + entityState + '.' + subView;
    if (!NonReactiveLocalState[timestampKey]) {
      NonReactiveLocalState[timestampKey] = new Date();
    }

    const skipDocsNum = LocalState.get('skipDocsNum') || 0;
    //console.log('going to fetch new:', skipDocsNum);
    Meteor.call('ico.getByQuery', { entityState: entityState, icoStatus: subView }, skipDocsNum, NonReactiveLocalState[timestampKey],
      (err, icoProjectsSlice) => {
        if (err) {
          console.error(err);
        } else {
          // insert icoProjects into client cache
          icoProjectsSlice.forEach((icoProject) => {
            icoProject.icoStatus = subView;
            icoProject.insertedAt = new Date();
            IcoProjectsCache.upsert(icoProject._id, icoProject);
          });

          if (icoProjectsSlice.length === 0) {
            actions.icoProject.stopInfiniteScrolling(context());
          }

          onData(null, {
            icoEntities: IcoProjectsCache.find({ icoStatus: subView, 'entityState.state': entityState }, { reactive: false }).fetch(),
            subView
          });

          actions.icoProject.clearCacheIfNeeded(context());
        }
      }
    );

  }
};

export const depsMapper = (context, actions) => ({
  // todo implement actions.icoProject.addToWatchList,
  //addToWatchList: actions.icoProject.addToWatchList,
  loadMore: actions.icoProject.loadMore,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(IcoFrontList);
