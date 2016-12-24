import {IcoProjects} from '/lib/collections';
import {IcoTypeDef, IcoType} from '/lib/icoProject';
import createInitialTestData from '/server/configs/initial_adds';

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
        // meta info about app data
        meta: {
          dataStatus: 'production'
        },
        entityState: {
          state: 'published'
        },
        ...icoProject
      };

      // post-process -- todo put into separate class
      icoEntity.icoEvents = icoEntity.icoEvents || [];
      icoEntity.coFounders = icoEntity.coFounders || [];

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

      // post-process -- todo put into separate class
      objectToSet.icoEvents = objectToSet.icoEvents || [];
      objectToSet.coFounders = objectToSet.coFounders || [];

      IcoProjects.update({ _id: _id },{ $set: objectToSet });
    },

    'ico.saveAsConcept' (_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      // todo allow this only for this.userId which is in admin group

      // todo: find some minimum validation
      //const validationResult = t.validate(icoProject, IcoType);
      //if (!validationResult.isValid()) {
      //  throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      //}

      const createdAt = new Date();
      const icoEntity = {
        _id,
        createdAt,
        // meta info about app data
        meta: {
          dataStatus: 'production'
        },
        entityState: {
          state: 'concept'
        },
        ...icoProject
      };

      // post-process -- todo put into separate class
      icoEntity.icoEvents = icoEntity.icoEvents || [];
      icoEntity.coFounders = icoEntity.coFounders || [];

      IcoProjects.insert(icoEntity);
    },

    'ico.publish' (_id) {
      check(_id, String);

      // todo: find some minimum validation
      //const validationResult = t.validate(icoProject, IcoType);
      //if (!validationResult.isValid()) {
      //  throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      //}

      // todo allow this only for this.userId which is in admin group
      IcoProjects.update({ _id: _id}, { $set: {'entityState.state': 'published' } });
    },

    'ico.importConcepts' (icoProjects) {
      check(icoProjects, Array);
      console.log('icoProjects: ', icoProjects);
      const icoEntities = icoProjects.map((icoProject) => {

        const createdAt = new Date();
        const icoEntity = {
          createdAt,
          meta: {
            dataStatus: 'production'
          },
          entityState: {
            // one of concept, changeRequest, published
            state: 'concept'
          },
          ...icoProject
        };

        // post-process -- todo put into separate class
        icoEntity.icoEvents = icoEntity.icoEvents || [];
        icoEntity.coFounders = icoEntity.coFounders || [];

        return icoEntity;
      });

      console.log('icoEntities:', icoEntities);
      icoEntities.forEach((icoEntity) => {
        IcoProjects.insert(icoEntity);
      });

    },

    // TODO remove in production
    'ico.remove'(_id) {
      check(_id, String);
      console.log(`ICO project with _id: ${_id} removed`);
      IcoProjects.remove(_id);
    },

    'ico.redeployTestData'() {
      // todo add admin check
      if (this.userId) {
        createInitialTestData({redeploy: true});
      }
    }
  });
}
