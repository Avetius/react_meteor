/*
 * NON REDUX actions
 *
 */
export default {
  addContentAdmin ({Meteor}, userId) {
    if (!userId) {
      return console.warn('ADD_CONTENT_ADMIN_ERROR', 'userId is required.');
    }
    Meteor.call('users.addContentAdmin', userId, (err) => {
      if (err) {
        return console.error('ADD_CONTENT_ADMIN_ERROR', err.error, err.reason);
      }
    });
  },

  removeContentAdmin ({Meteor}, userId) {
    if (!userId) {
      return console.warn('REMOVE_CONTENT_ADMIN_ERROR', 'userId is required.');
    }
    Meteor.call('users.deleteContentAdmin', userId, (err) => {
      if (err) {
        return console.error('REMOVE_CONTENT_ADMIN_ERROR', err.error, err.reason);
      }
    });
  },
}