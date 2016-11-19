import {check} from 'meteor/check';

export default function ({Meteor, Collections}) {
  Meteor.methods({
    'ico.add'(_id, icoEntity) {
      check(_id, String);
      check(icoEntity, Object);

      const createdAt = new Date();
      const icoEntityResult = {
        _id, createdAt,
        ...icoEntity
      };

      Collections.IcoProjects.insert(icoEntityResult);
    },
    'ico.saveAsConcept' (_id, icoEntity) {
      // TODO
    }
  });
}
