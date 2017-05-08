import {IcoProjects} from '/lib/collections';

export default () => {
  const icoProjectIndexes = {
    index1: { 'meta.dataStatus': 1, 'entityState.state': 1 },
    index2: { 'icoStartDatetime': 1 },
    index3: { 'icoEndDatetime': 1 },
    index4: { 'ratingScore': 1 },
    index5: { 'projectName': 1 },
    index6: { 'slugUrlToken': 1 }
  };

  IcoProjects._ensureIndex(icoProjectIndexes.index1);
  IcoProjects._ensureIndex(icoProjectIndexes.index2);
  IcoProjects._ensureIndex(icoProjectIndexes.index3);
  IcoProjects._ensureIndex(icoProjectIndexes.index4);
  IcoProjects._ensureIndex(icoProjectIndexes.index5);
  IcoProjects._ensureIndex(icoProjectIndexes.index6);

  const usersIndexes = {
    index1: { 'privateProfile.linkedIn.email': 1 },
    index2: { 'privateProfile.facebook.email': 1 }
  };

  Meteor.users._ensureIndex(usersIndexes.index1);
  Meteor.users._ensureIndex(usersIndexes.index2);

}
