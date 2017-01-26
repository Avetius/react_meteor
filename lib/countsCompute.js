import {IcoProjects, Counts} from '/lib/collections';
import IcoStatus from '/lib/icoStatus';
import _ from 'lodash';

export default class CountsCompute {
  static loadDataToCompute (mode) {
    return IcoProjects.find({'meta.dataStatus': mode}).fetch();
  }

  static compute() {
    const icoProjects = CountsCompute.loadDataToCompute('production');

    const checkForState = (obj, state) => {
      if (!obj.entityState) {
        console.error('icoProject object: entityState field does\'n exist!');
        return false;
      }
      return obj.entityState.state === state;
    };

    const icoStatusConcepts = (obj) => {
      return checkForState(obj, 'concept') ? IcoStatus.compute(obj) : 'not-a-concept';
    };

    const icoStatusPublished = (obj) => {
      return checkForState(obj, 'published') ? IcoStatus.compute(obj) : 'not-a-published';
    };

    const postProcessCounts = (countsObj) => {
      let obj = {...countsObj};
      obj.ongoing = obj.ongoing || 0;
      obj.upcoming = obj.upcoming || 0;
      obj.finished = obj.finished || 0;
      obj.scam = obj.scam || 0;
      obj.suspicious = obj.suspicious || 0;

      return obj;
    };

    const publishedCounts = _.countBy(icoProjects, icoStatusPublished);
    const conceptCounts = _.countBy(icoProjects, icoStatusConcepts);

    const output = { published: postProcessCounts(publishedCounts), concept: postProcessCounts(conceptCounts) };
    console.log(output);

    CountsCompute.saveOutput(output);
  }

  static saveOutput (output) {
    Counts.update({_id: 'categories'}, { $set: output}, { upsert: true },
      (err, affectedDocsNumber) => {
        if (err) {
          console.error('Error during update Counts collection, document with _id \'categories\': ', err);
        }
      }
    );
  }
}
