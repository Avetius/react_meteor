export default {
  add({Meteor}, icoProject) {
    if (!icoProject) {
      return console.warn('ADD_ICO_ERROR', 'icoProject is required.');
    }

    const id = Meteor.uuid();
    console.log('ico.add is calling..');
    Meteor.call('ico.add', id, icoProject, (err) => {
      if (err) {
        return console.warn('ADD_ICO_ERROR', err.message);
      }
    });
  },

  edit({Meteor}, id, icoProject) {
    if (!icoProject) {
      return console.warn('EDIT_ICO_ERROR', 'icoProject is required.');
    }

    Meteor.call('ico.edit', id, icoProject, (err) => {
      if (err) {
        return console.warn('EDIT_ICO_ERROR', err.message);
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
        return console.warn('SAVE_AS_CONCEPT_ERROR', err.message);
      }
    });
  },

  clearErrors({LocalState}) {
    //return LocalState.set('CREATE_COMMENT_ERROR', null);
  }
}
