import {IcoProjects} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'ico.add'(_id, icoEntity) {
      check(_id, String);
      check(icoEntity, Object);

      const createdAt = new Date();
      const icoEntityResult = {
        _id,
        createdAt,
        entityState: {
          isConcept: false,
          isChangeRequest: false
        },
        ...icoEntity
      };

      IcoProjects.insert(icoEntityResult);
    },
    'ico.saveAsConcept' (_id, icoEntity) {
      // TODO
    },

    // TODO remove in production
    'ico.remove'(_id) {
      check(_id, String);
      console.log(`ICO project with _id: ${_id} removed`);
      IcoProjects.remove(_id);
    }
  });
}
