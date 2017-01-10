export default {
  addAsConcept ({Meteor}, icoProject) {
    if (!icoProject) {
      return console.warn('ADD_AS_CONCEPT_ERROR', 'icoProject is required.');
    }

    const _id = Meteor.uuid();
    console.log('ico.addAsConcept is calling..');
    Meteor.call('ico.addAsConcept', _id, icoProject, (err) => {
      if (err) {
        return console.error('ADD_AS_CONCEPT_ERROR', err.error, err.reason);
      } else {
        FlowRouter.go('ico.profile', { icoSlug: _id });
      }
    });
  },

  edit({Meteor, FlowRouter}, _id, icoProject) {
    if (!icoProject) {
      return console.warn('EDIT_ICO_ERROR', 'icoProject is required.');
    }

    Meteor.call('ico.edit', _id, icoProject, (err) => {
      if (err) {
        return console.error('EDIT_ICO_ERROR', err.error, err.reason);
      } else {
        FlowRouter.go('ico.profile', { icoSlug: _id });
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

  deleteIco({Meteor}, _id) {
    console.log('ico.delete is calling..');
    if (!_id) {
      return console.warn('DELETE_ICO', 'Id of icoProject is required.');
    }

    Meteor.call('ico.delete', _id, (err) => {
      if (err) {
        return console.error('DELETE_ICO', err.error, err.reason);
      }
    });
    FlowRouter.go('ico.concepts', {});
  },

  clearErrors({LocalState}) {
    //return LocalState.set('CREATE_COMMENT_ERROR', null);
  }
}
