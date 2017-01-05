import {Counter} from 'meteor/natestrauser:publish-performant-counts';
import { Tracker } from 'meteor/tracker'

export default ({ LocalState }) => {

  Tracker.autorun(() => {

    if (Meteor.subscribe('ico.global-counts').ready()) {
      const globalCounts = {
        concepts: Counter.get('concepts-prod'),
        published: Counter.get('published-prod')
      };

      LocalState.set({globalCounts: globalCounts});
    }

  });
}
