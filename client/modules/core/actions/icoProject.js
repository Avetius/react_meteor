import IcoStatus from '/lib/icoStatus';

/*
 * NON REDUX actions
 *
 */
export default {
  addAsConcept ({Meteor, Collections, CacheCollections: {IcoProjectsCache}}, icoProject) {
    if (!icoProject) {
      return console.warn('ADD_AS_CONCEPT_ERROR', 'icoProject is required.');
    }

    const _id = Meteor.uuid();
    console.log('ico.addAsConcept is calling..');
    Meteor.call('ico.addAsConcept', _id, icoProject, (err, slugUrlToken) => {
      if (err) {
        return console.error('ADD_AS_CONCEPT_ERROR', err.error, err.reason);
      } else {
        // add newly added ICO to ClientCache
        // todo: move it to separate class
        IcoProjectsCache.insert({_id,
          insertedAt: new Date(),
          icoStatus: IcoStatus.compute(icoProject),
          entityState: { state: 'concept'},
          slugUrlToken,
          ...icoProject });
        FlowRouter.go('ico.profile', { icoSlug: slugUrlToken });
      }
    });
  },

  edit({Meteor, FlowRouter, Collections, CacheCollections: {IcoProjectsCache}}, _id, icoProjectToSave) {
    if (!icoProjectToSave) {
      return console.warn('EDIT_ICO_ERROR', 'icoProject is required.');
    }
    Meteor.call('ico.edit', _id, icoProjectToSave, (err, slugUrlToken) => {
      if (err) {
        return console.error('EDIT_ICO_ERROR', err.error, err.reason);
      } else {
        // update local cache, so we can see changed ico in front list without refresh
        // todo: move it to separate class
        const originIco = IcoProjectsCache.findOne({ _id });

        if (originIco) {
          const state = originIco.entityState && originIco.entityState.state;
          IcoProjectsCache.update({_id}, {
            insertedAt: originIco.insertedAt,
            icoStatus: originIco.icoStatus,
            entityState: { state },
            ...icoProjectToSave });
        }

        FlowRouter.go('ico.profile', { icoSlug: slugUrlToken });
      }
    });
  },

  publishConcept ({Meteor}, _id) {
    console.log('ico.publish is calling..');
    if (!_id) {
      return console.warn('PUBLISH_CONCEPT', 'Id of icoProject is required.');
    }

    Meteor.call('ico.publish', _id, (err) => {
      if (err) {
        return console.error('PUBLISH_CONCEPT', err.error, err.reason);
      }
    });
  },

  unPublish ({Meteor}, _id) {
    console.log('ico.unPublish is calling..');
    if (!_id) {
      return console.warn('UN_PUBLISH_CONCEPT', 'Id of icoProject is required.');
    }

    Meteor.call('ico.unPublish', _id, (err) => {
      if (err) {
        return console.error('UN_PUBLISH_CONCEPT', err.error, err.reason);
      }
    });
  },

  deleteIco({Meteor, CacheCollections: {IcoProjectsCache}}, _id) {
    console.log('ico.delete is calling..');
    if (!_id) {
      return console.warn('DELETE_ICO', 'Id of icoProject is required.');
    }

    Meteor.call('ico.delete', _id, (err) => {
      if (err) {
        return console.error('DELETE_ICO', err.error, err.reason);
      }
    });
    const originIco = IcoProjectsCache.findOne({ _id });
    IcoProjectsCache.remove({_id});
    if (originIco && originIco.icoStatus) {
      FlowRouter.go('ico.concepts', { subView: originIco.icoStatus });
    } else {
      FlowRouter.go('ico.concepts', { subView: 'ongoing' });
    }

  },

  loadMore ({LocalState, NonReactiveLocalState}) {
    if (NonReactiveLocalState['icoProjects.infiniteScrollingEnd'] === true) {
      return;
    }

    const currentSkip = LocalState.get('skipDocsNum');
    // todo: put this number to global constant (same as with limit amount in db query)
    LocalState.set('skipDocsNum', currentSkip + 10);
  },

  stopInfiniteScrolling({NonReactiveLocalState}) {
    NonReactiveLocalState['icoProjects.infiniteScrollingEnd'] = true;
  },

  resetInfiniteScrolling ({LocalState, NonReactiveLocalState}) {
    LocalState.set('skipDocsNum', 0);
    NonReactiveLocalState['icoProjects.infiniteScrollingEnd'] = false;
    window.scrollTo(0, NonReactiveLocalState['view.categoryNavTopPosition']);
  },

  clearCacheIfNeeded ({CacheCollections: {IcoProjectsCache}}) {
    if (IcoProjectsCache.find({}).count() >= 180) {
      console.log('clearing cache..');
      const icosToRemove = IcoProjectsCache.find({}, { limit: 10, sort: { insertedAt: 1 }}).fetch();
      const icoIdsToRemove = icosToRemove.map((ico) => {
        return ico._id;
      });
      icoIdsToRemove.forEach((id) => {
        IcoProjectsCache.remove(id);
      });
    }
  },

  clearErrors({LocalState}) {
    //return LocalState.set('CREATE_COMMENT_ERROR', null);
  }
}
