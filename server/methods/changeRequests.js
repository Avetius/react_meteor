import {ChangeRequests, IcoProjects} from '/lib/collections';
import DataValidator from '/lib/dataValidator';
import UsersMgmtShared from '/lib/usersMgmtShared';
import {IcoTypeDef, IcoType} from '/lib/icoProjectDefShared';
import _ from 'lodash';
import t from 'tcomb-validation';
import PostProcess from './serverPostProcess';
import { Match } from 'meteor/check'

export default function () {
  Meteor.methods({
    'changeRequest.send' (icoID, icoProject, submitForApproval) {
      check(icoID, String);
      check(icoProject, Object);
      check(submitForApproval, Match.Maybe(Boolean));
      const oldIcoEntity = IcoProjects.findOne(icoID);
      const userEmail = UsersMgmtShared.extractEmail(Meteor.user());
      const longLivedUserId = UsersMgmtShared.extractLongLivedUserId(Meteor.user());
      if (!oldIcoEntity) {
        throw new Meteor.Error('Error during changeRequest sent', 'IcoProject not found');
      }
      let changeRequest = ChangeRequests.findOne({icoId: icoID, approved: false, rejected: false, 'author.email': userEmail, published: { $ne: true }});
      // either user is global admin or is ico-admin (and icoProject is not published yet)
      if ((!UsersMgmtShared.isUserContentAdmin(this.userId) && !UsersMgmtShared.isUserIcoAdmin(this.userId, oldIcoEntity.slugUrlToken))) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }

      // validation
      const validationResult = t.validate(icoProject, IcoType, { strict: true });
      if (!validationResult.isValid()) {
        throw new Meteor.Error('rejected-by-validation', validationResult.firstError().message);
      }
      if (!changeRequest) {
        changeRequest = {
          author: {email: userEmail, longLivedUserId: longLivedUserId},
          fields: {},
          createdAt: new Date(),
          approved: false,
          rejected: false,
          icoSlug: oldIcoEntity.slugUrlToken,
          projectName: oldIcoEntity.projectName,
          abbreviation: oldIcoEntity.abbreviation,
          icoId: icoID
        };
      } else {
        changeRequest.updatedAt = new Date();
      }
      if (submitForApproval) {
        changeRequest['publishRequest'] = true;
      } else {
        icoProject = PostProcess.normalizeIcoProject(icoProject);

        // pick only those fields which are present in IcoTypeDef and set values from icoEntity
        const objectToSet = _.mapValues(IcoTypeDef, (value, key, obj) => {
          return icoProject[key];
        });
        let changedFields = _.omitBy(objectToSet, function (field, k) {
          let oldField = oldIcoEntity[k];
          if (!oldField && !field) {
            return true;
          }
          if (_.isArray(field) && _.isArray(oldField)) {
            field = _.map(field, (val) => {
              return _.isObject(val) ? DataValidator.removeFalsyValues(val): val;
            });
            oldField = _.map(oldField, (val) => {
              return _.isObject(val) ? DataValidator.removeFalsyValues(oldField): oldField;
            });
          }
          return _.isEqual(oldField, field);
        });
        if (_.isEmpty(changedFields)) {
          throw new Meteor.Error('Error during changeRequest send', 'there are no changed fields');
        }
        changedFields = _.mapValues(changedFields, (value, key, obj) => {
          return {oldValue: oldIcoEntity[key], newValue: value};
        });
        changeRequest.fields = _.assign(changeRequest.fields, changedFields);
      }

      ChangeRequests.upsert({_id: changeRequest._id}, {$set: changeRequest}, (err) => {
        if (err) {
          console.error('Error during changeRequest upsert', err);
        }
      });
    },

    'changeRequest.approve' (_id) {
      check(_id, String);
      if (!UsersMgmtShared.isCurrentUserSuperAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }
      const changeRequest = ChangeRequests.findOne(_id);
      if (!changeRequest) {
        throw new Meteor.Error('Error during changeRequest approve', 'changeRequest not found');
      } else {
        const changedFields = _.mapValues(changeRequest.fields, (field, key, obj) => {
          return field.newValue;
        });
        // IcoProjects.update
        IcoProjects.update({_id: changeRequest.icoId}, {$set: changedFields}, (err) => {
          if (err) {
            console.error('Error during changeRequest approve', err);
          } else {
            const longLivedUserId = UsersMgmtShared.extractLongLivedUserId(Meteor.user());
            const updatedAt = new Date();
            ChangeRequests.update({_id: _id}, {$set: {approved: true, approvedBy: longLivedUserId, updatedAt }}, (err) => {
              if (err) {
                console.error('Error during changeRequest approve', err);
              } else {
                console.log('ChangeRequest approved');
              }
            });
          }
        });
      }
    },

    'changeRequest.rejectApproved' (_id) {
      check(_id, String);
      if (!UsersMgmtShared.isCurrentUserSuperAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }
      const changeRequest = ChangeRequests.findOne(_id);
      if (!changeRequest) {
        throw new Meteor.Error('Error during changeRequest approve', 'changeRequest not found');
      } else {
        const changedFields = _.mapValues(changeRequest.fields, (field, key, obj) => {
          return field.oldValue;
        });
        // IcoProjects.update
        IcoProjects.update({_id: changeRequest.icoId}, {$set: changedFields}, (err) => {
          if (err) {
            console.error('Error during changeRequest rejecting approved', err);
          } else {
            const longLivedUserId = UsersMgmtShared.extractLongLivedUserId(Meteor.user());
            const updatedAt = new Date();
            ChangeRequests.update({_id: _id}, {$set: {approved: false, rejected: true, rejectedBy: longLivedUserId, updatedAt}}, (err) => {
              if (err) {
                console.error('Error during changeRequest rejecting approved', err);
              } else {
                console.log('ChangeRequest rejecting approved done');
              }
            });
          }
        });
      }
    },

    'changeRequest.reject' (_id) {
      check(_id, String);
      if (!UsersMgmtShared.isCurrentUserSuperAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }
      const changeRequest = ChangeRequests.findOne(_id);
      if (!changeRequest) {
        throw new Meteor.Error('Error during changeRequest reject', 'changeRequest not found');
      } else {
        const longLivedUserId = UsersMgmtShared.extractLongLivedUserId(Meteor.user());
        const updatedAt = new Date();
        ChangeRequests.update({_id: _id}, {$set: {rejected: true, rejectedBy: longLivedUserId, updatedAt}}, (err) => {
          if (err) {
            console.error('Error during changeRequest reject', err);
          }
        });
      }
    },

    'changeRequest.approveRejected' (_id) {
      check(_id, String);
      if (!UsersMgmtShared.isCurrentUserSuperAdmin()) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }
      const changeRequest = ChangeRequests.findOne(_id);
      if (!changeRequest) {
        throw new Meteor.Error('Error during approveRejected', 'changeRequest not found');
      } else {
        const changedFields = _.mapValues(changeRequest.fields, (field, key, obj) => {
          return field.newValue;
        });
        // IcoProjects.update
        IcoProjects.update({_id: changeRequest.icoId}, {$set: changedFields}, (err) => {
          if (err) {
            console.error('Error during changeRequest approveRejected', err);
          } else {
            const longLivedUserId = UsersMgmtShared.extractLongLivedUserId(Meteor.user());
            const updatedAt = new Date();
            ChangeRequests.update({_id: _id}, {$set: {approved: true, rejected: false, approvedBy: longLivedUserId, updatedAt}}, (err) => {
              if (err) {
                console.error('Error during changeRequest approveRejected', err);
              } else {
                console.log('ChangeRequest approveRejected done');
              }
            });
          }
        });
      }
    },
  });
}
