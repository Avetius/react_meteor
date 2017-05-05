import {IcoProjects, Counts} from '/lib/collections';
import { getSelector, getSort, inIcoListUsableFields, isRestrictPropertyRequested } from '../icoProject/queries'
import {IcoTypeDef, IcoType} from '/lib/icoProject';
import CountsCompute from '/lib/countsCompute';
import PostProcess from './serverPostProcess';
import createInitialTestData from '/server/configs/initial_adds';
import AccountsMgmt from '/lib/accountsMgmt';
import DataValidator from '/lib/dataValidator';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'lodash';

import t from 'tcomb-validation';
import Mailchimp from 'mailchimp-api-v3';

/**
 * Note: for fetching data use this.unblock() (see https://meteorhacks.com/understanding-meteor-wait-time-and-this-unblock/)
 *
 * For each CountsCompute.compute() code block, try Meteor.defer(() => {}) for later optimization.
 */

export default function () {
  Meteor.methods({

    'ico.getByQuery' (query, skip, timestampToBound) {
      check(query, Object);
      check(skip, Number);
      check(timestampToBound, Date);

      if (!AccountsMgmt.isCurrentUserAdmin() && isRestrictPropertyRequested(query)) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      const selector = getSelector({ icoStatus: query.icoStatus, entityState: query.entityState, timestampToBound });
      const options = { sort: getSort({icoStatus: query.icoStatus}), skip: skip, limit: 10, fields: inIcoListUsableFields };

      return IcoProjects.find(selector, options).fetch();
    },

    'ico.addAsConcept' (_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      if (!AccountsMgmt.isCurrentUserAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      const validationResult = t.validate(icoProject, IcoType);
      if (!validationResult.isValid()) {
        throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      }

      icoProject = PostProcess.normalizeIcoProject(icoProject);

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

      IcoProjects.insert(icoEntity, (err, _id) => {
        if (err) {
          console.error('Error during insert into IcoProjects collection in method ico.addAsConcept: ', err);
        }
      });

      // update appropriate category counts
      CountsCompute.compute();

      const savedIcoProject = IcoProjects.findOne(_id);
      if (savedIcoProject) {
        return savedIcoProject.slugUrlToken;
      } else {
        console.error('Error during insert into IcoProjects collection in method ico.addAsConcept: ', 'Could not find the inserted icoProject.');
      }
    },

    'ico.edit' (_id, icoProject) {
      check(_id, String);
      check(icoProject, Object);

      if (!AccountsMgmt.isCurrentUserAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      // validation
      const validationResult = t.validate(icoProject, IcoType);
      if (!validationResult.isValid()) {
        throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      }

      icoProject = PostProcess.normalizeIcoProject(icoProject);

      // pick only those fields which are present in IcoTypeDef and set values from icoEntity
      const objectToSet = _.mapValues(IcoTypeDef, (value, key, obj) => {
        return icoProject[key];
      });

      objectToSet.updatedAt = new Date();

      IcoProjects.update({ _id: _id },{ $set: objectToSet },
        (err, affectedDocsNumber) => {
          if (err) {
            console.error('Error during update IcoProjects collection in method ico.edit: ', err);
          }
        }
      );

      // update appropriate category counts
      CountsCompute.compute();

      // todo: remove this after migration is done. We don't need to send slugUrlToken again after it.
      const savedIcoProject = IcoProjects.findOne(_id);
      if (savedIcoProject) {
        return savedIcoProject.slugUrlToken;
      } else {
        console.error('Error during insert into IcoProjects collection in method ico.addAsConcept: ', 'Could not find the inserted icoProject.');
      }
    },

    'ico.publish' (_id) {
      check(_id, String);

      // todo: find some minimum validation
      //const validationResult = t.validate(icoProject, IcoType);
      //if (!validationResult.isValid()) {
      //  throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      //}

      if (!AccountsMgmt.isCurrentUserAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      IcoProjects.update({ _id: _id}, { $set: {'entityState.state': 'published', updatedAt: new Date() } },
        (err, affectedDocsNumber) => {
          if (err) {
            console.error('Error during update IcoProjects collection in method ico.publish: ', err);
          }
        }
      );

      // update appropriate category counts
      CountsCompute.compute();
    },

    'ico.unPublish' (_id) {
      check(_id, String);

      if (!AccountsMgmt.isCurrentUserAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      IcoProjects.update({ _id: _id}, { $set: {'entityState.state': 'concept', updatedAt: new Date() } },
        (err, affectedDocsNumber) => {
          if (err) {
            console.error('Error during update IcoProjects collection in method ico.unPublish: ', err);
          }
        }
      );

      // update appropriate category counts
      CountsCompute.compute();
    },

    'ico.delete'(_id) {
      check(_id, String);

      if (!AccountsMgmt.isCurrentUserAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      IcoProjects.update({ _id: _id}, { $set: {'entityState.state': 'deleted', updatedAt: new Date() } },
        (err, affectedDocsNumber) => {
          if (err) {
            console.error('Error during update IcoProjects collection in method ico.delete: ', err);
          }
        }
      );

      // update appropriate category counts
      CountsCompute.compute();
    },

    // !! Warning: - if client which call this method will disconnect during call, this method will be re-called again once
    // client will be online -- so it can happen that documents will be inserted twice. (put there _id into each doc to prevent this)
    'ico.importConcepts' (icoProjects) {
      check(icoProjects, Array);

      // now disabled:
      return;

      if (!AccountsMgmt.isCurrentUserAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      console.log('icoProject 1: ', icoProjects[0]);
      const icoEntities = icoProjects.map((icoProject) => {

        icoProject = PostProcess.normalizeIcoProject(icoProject);

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
        IcoProjects.insert(icoEntity, (err, _id) => {
          if (err) {
            console.error('Error during insert into IcoProjects collection in method ico.importConcepts: ', err);
          }
        });
      });

      // update appropriate category counts
      CountsCompute.compute();
    },

    'ico.newsletter-signup' (emailAddr) {
      check(emailAddr, String);
      if (!DataValidator.isValidEmailAddress(emailAddr)) {
        throw new Meteor.Error('Newsletter signup error', 'Email is invalid.');
      }

      if (!Meteor.settings.private) {
        console.error('ico.newsletter-signup method failed for email: ' + emailAddr);
      }

      let mailchimp;
      if (Meteor.settings.private.MailChimp && Meteor.settings.private.MailChimp.apiKey) {
        mailchimp = new Mailchimp(Meteor.settings.private.MailChimp.apiKey);
      } else {
        console.error('ico.newsletter-signup method failed for email: ' + emailAddr);
      }

      let list_id;
      if (Meteor.settings.private.MailChimp && Meteor.settings.private.MailChimp.listId) {
        list_id = Meteor.settings.private.MailChimp.listId;
      } else {
        console.error('ico.newsletter-signup method failed for email: ' + emailAddr);
      }

      mailchimp.post(`lists/${list_id}`, { members: [{ // send a post request to create new subscription to the list
        email_address: emailAddr,
        status: "subscribed"
      }]
      }).then((response) => {
        //console.log('mailchimp res: ', response);
      }).catch((error) => {
        console.log('Mailchimp API error for email: ' + emailAddr, error.status. error.detail)
      });

    },

    'ico.redeployTestData'() {
      // todo remove this
      Meteor.users.remove({});

      // now disabled:
      return;

      if (!AccountsMgmt.isCurrentUserAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      createInitialTestData({redeploy: true});

    }
  });
}
