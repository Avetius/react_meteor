import Meteor from 'meteor/meteor';
import {IcoProjects} from '/lib/collections';

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
