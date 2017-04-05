import {IcoProjects} from '/lib/collections';

export default () => {
  const mongoIndexes = {
    index1: { 'meta.dataStatus': 1, 'entityState.state': 1 },
    index2: { 'icoStartDatetime': 1 },
    index3: { 'icoEndDatetime': 1 },
    index4: { 'ratingScore': 1 },
    index5: { 'projectName': 1 },
    index6: { 'slugUrlToken': 1 }
  };

  IcoProjects._ensureIndex(mongoIndexes.index1);
  IcoProjects._ensureIndex(mongoIndexes.index2);
  IcoProjects._ensureIndex(mongoIndexes.index3);
  IcoProjects._ensureIndex(mongoIndexes.index4);
  IcoProjects._ensureIndex(mongoIndexes.index5);
  IcoProjects._ensureIndex(mongoIndexes.index6);
}
