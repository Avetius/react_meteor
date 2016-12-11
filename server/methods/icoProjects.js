import {IcoProjects} from '/lib/collections';
import {IcoTypeDef, IcoType} from '/lib/icoProject';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'lodash';

import t from 'tcomb-validation';

export default function () {
  Meteor.methods({
    'ico.add'(_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      // todo allow this only for this.userId which is in admin group

      // validation
      const validationResult = t.validate(icoProject, IcoType);
      if (!validationResult.isValid()) {
        throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      }

      const createdAt = new Date();
      const icoEntity = {
        _id,
        createdAt,
        entityState: {
          isConcept: false,
          isChangeRequest: false
        },
        ...icoProject
      };

      IcoProjects.insert(icoEntity);
    },

    'ico.edit' (_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      // todo allow this only for this.userId which is in admin group

      // validation
      const validationResult = t.validate(icoProject, IcoType);
      if (!validationResult.isValid()) {
        throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      }

      // pick only those fields which are present in IcoTypeDef and set values from icoEntity
      const objectToSet = _.mapValues(IcoTypeDef, (value, key, obj) => {
        return icoProject[key];
      });

      objectToSet.updateAt = new Date();

      IcoProjects.update({ _id: _id },{ $set: objectToSet });
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
