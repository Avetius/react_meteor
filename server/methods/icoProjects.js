import {IcoProjects, Counts} from '/lib/collections';
import {IcoTypeDef, IcoType} from '/lib/icoProject';
import CountsCompute from '/lib/countsCompute';
import PostValidation from './serverPostValidation';
import createInitialTestData from '/server/configs/initial_adds';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'lodash';

import t from 'tcomb-validation';

export default function () {
  Meteor.methods({
    'ico.addAsConcept' (_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      if (!this.userId) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      const validationResult = t.validate(icoProject, IcoType);
      if (!validationResult.isValid()) {
        throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      }

      icoProject = PostValidation.normalizeIcoProject(icoProject);

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

      IcoProjects.insert(icoEntity);

      // update appropriate category counts
      CountsCompute.compute();
    },

    'ico.edit' (_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      if (!this.userId) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      // validation
      const validationResult = t.validate(icoProject, IcoType);
      if (!validationResult.isValid()) {
        throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      }

      icoProject = PostValidation.normalizeIcoProject(icoProject);

      // pick only those fields which are present in IcoTypeDef and set values from icoEntity
      const objectToSet = _.mapValues(IcoTypeDef, (value, key, obj) => {
        return icoProject[key];
      });

      objectToSet.updatedAt = new Date();

      IcoProjects.update({ _id: _id },{ $set: objectToSet });
    },

    'ico.publish' (_id) {
      check(_id, String);

      // todo: find some minimum validation
      //const validationResult = t.validate(icoProject, IcoType);
      //if (!validationResult.isValid()) {
      //  throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      //}

      if (!this.userId) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      IcoProjects.update({ _id: _id}, { $set: {'entityState.state': 'published', updatedAt: new Date() } });

      // update appropriate category counts
      CountsCompute.compute();
    },

    'ico.unPublish' (_id) {
      check(_id, String);

      if (!this.userId) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      IcoProjects.update({ _id: _id}, { $set: {'entityState.state': 'concept', updatedAt: new Date() } });

      // update appropriate category counts
      CountsCompute.compute();
    },

    'ico.delete'(_id) {
      check(_id, String);

      if (!this.userId) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      IcoProjects.update({ _id: _id}, { $set: {'entityState.state': 'deleted', updatedAt: new Date() } });

      // update appropriate category counts
      CountsCompute.compute();
    },

    'ico.importConcepts' (icoProjects) {
      check(icoProjects, Array);

      if (!this.userId) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      console.log('icoProject 1: ', icoProjects[0]);
      const icoEntities = icoProjects.map((icoProject) => {

        icoProject = PostValidation.normalizeIcoProject(icoProject);

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

        return icoEntity;
      });

      console.log('icoEntity 1:', icoEntities[0]);
      icoEntities.forEach((icoEntity) => {
        IcoProjects.insert(icoEntity);
      });

      // update appropriate category counts
      CountsCompute.compute();
    },

    'ico.redeployTestData'() {
      // todo add admin check
      if (!this.userId) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      createInitialTestData({redeploy: true});

    },
    // look on tokes
    'fix.maxCurrencySupply'() {
      IcoProjects.find({}).fetch().forEach((ico) => {
        let maxCurrencySupplyNew, wasError;
        if (typeof ico.maxCurrencySupply === 'number') {
          console.log('is number: ', ico.maxCurrencySupply, ' for Ico name:', ico.projectName);
          maxCurrencySupplyNew = ico.maxCurrencySupply.toString();
          if (typeof maxCurrencySupplyNew !== 'string') {
            wasError = true;
          }
        } else {
          console.log('is not number: ', ico.maxCurrencySupply, ' for Ico name:', ico.projectName);
        }

        wasError ? console.log('Was error for value: ', ico.maxCurrencySupply, ' for Ico name:', ico.projectName) : void(0);

        if (maxCurrencySupplyNew && !wasError) {
          IcoProjects.update({_id: ico._id}, {$set: {maxCurrencySupply: maxCurrencySupplyNew}})
        }
      });

    }
  });
}
