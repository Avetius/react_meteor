export default {
  add({Meteor}, icoEntity) {
    if (!icoEntity) {
      return console.warn('ADD_ICO_ERROR', 'icoEntity is required.');
    }

    const id = Meteor.uuid();
    console.log('ico.add is calling..');
    Meteor.call('ico.add', id, icoEntity, (err) => {
      if (err) {
        return console.warn('ADD_ICO_ERROR', err.message);
      }
    });
  },

  saveAsConcept ({Meteor}, icoEntity) {
    if (!icoEntity) {
      return console.warn('SAVE_AS_CONCEPT_ERROR', 'icoEntity is required.');
    }

    const id = Meteor.uuid();
    console.log('ico.saveAsConcept is calling..');
    Meteor.call('ico.saveAsConcept', id, icoEntity, (err) => {
      if (err) {
        return console.warn('SAVE_AS_CONCEPT_ERROR', err.message);
      }
    });
  },

  clearErrors({LocalState}) {
    //return LocalState.set('CREATE_COMMENT_ERROR', null);
  }
}
