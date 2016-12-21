import {check} from 'meteor/check';

import t from 'tcomb-validation';

export default function ({Meteor, Collections}) {
  Meteor.methods({
    'ico.add'(_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      // validation
      const validationResult = t.validate(icoProject, IcoType);
      if (!validationResult.isValid()) {
        throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      }

      const createdAt = new Date();
      const icoEntity = {
        _id, createdAt,
        ...icoProject
      };

      // post-process -- todo put into separate class
      icoEntity.icoEvents = icoEntity.icoEvents || [];
      icoEntity.coFounders = icoEntity.coFounders || [];

      Collections.IcoProjects.insert(icoEntity);
    },
    'ico.edit' (_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      // validation
      const validationResult = t.validate(icoProject, IcoType);
      if (!validationResult.isValid()) {
        throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      }

      icoProject.updateAt = new Date();

      // post-process -- todo put into separate class
      icoProject.icoEvents = icoProject.icoEvents || [];
      icoProject.coFounders = icoProject.coFounders || [];

      Collections.IcoProjects.update({ _id: _id },{ $set: icoProject });
    },
    'ico.saveAsConcept' (_id, icoProject) {
      // TODO
    }
  });
}
