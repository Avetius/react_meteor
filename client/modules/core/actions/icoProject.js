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

  clearErrors({LocalState}) {
    //return LocalState.set('CREATE_COMMENT_ERROR', null);
  }
}
