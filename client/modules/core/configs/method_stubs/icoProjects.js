import {check} from 'meteor/check';

export default function ({Meteor, Collections}) {
  Meteor.methods({
    'ico.add'(_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      const createdAt = new Date();
      const icoEntity = {
        _id, createdAt,
        ...icoProject
      };

      Collections.IcoProjects.insert(icoEntity);
    },
    'ico.edit' (_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      icoProject.updateAt = new Date();
      Collections.IcoProjects.update({ _id: _id },{ $set: icoProject });
    },
    'ico.saveAsConcept' (_id, icoProject) {
      // TODO
    }
  });
}
