import {IcoProjects} from '/lib/collections';
import {Meteor} from 'meteor/meteor';

export default () => {
  // Deny all client-side updates to user documents
  Meteor.users.deny({
    update() { return true; }
  });

  // Deny all client-side updates on the IcoProjects collection
  IcoProjects.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
  });
}

// Facebook integration setup
Meteor.startup(function() {
  ServiceConfiguration.configurations.update({
      'service': 'facebook',
    },
    {
      $set: {
        'appId': '897986073678471',
        'secret': '99058f8a113bf0d520b876b5e5f28b0c'
      }
    },
    {
      upsert: true
    });
});
