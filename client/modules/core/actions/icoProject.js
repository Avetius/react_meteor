export default {
  add({Meteor, FlowRouter}, icoProject) {
    if (!icoProject) {
      return console.warn('ADD_ICO_ERROR', 'icoProject is required.');
    }

    const id = Meteor.uuid();
    console.log('ico.add is calling..');
    Meteor.call('ico.add', id, icoProject, (err) => {
      if (err) {
        return console.error('ADD_ICO_ERROR', err.error, err.reason);
      } else {
        FlowRouter.go('ico.profile', { icoSlug: id });
      }
    });
  },

  edit({Meteor, FlowRouter}, id, icoProject) {
    if (!icoProject) {
      return console.warn('EDIT_ICO_ERROR', 'icoProject is required.');
    }

    Meteor.call('ico.edit', id, icoProject, (err) => {
      if (err) {
        return console.error('EDIT_ICO_ERROR', err.error, err.reason);
      } else {
        FlowRouter.go('ico.profile', { icoSlug: id });
      }
    });
  },

  saveAsConcept ({Meteor}, icoProject) {
    if (!icoProject) {
      return console.warn('SAVE_AS_CONCEPT_ERROR', 'icoProject is required.');
    }

    const id = Meteor.uuid();
    console.log('ico.saveAsConcept is calling..');
    Meteor.call('ico.saveAsConcept', id, icoProject, (err) => {
      if (err) {
        return console.error('SAVE_AS_CONCEPT_ERROR', err.error, err.reason);
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

  clearErrors({LocalState}) {
    //return LocalState.set('CREATE_COMMENT_ERROR', null);
  }
}
