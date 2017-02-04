import {Counter} from 'meteor/natestrauser:publish-performant-counts';
import { Tracker } from 'meteor/tracker'

export default ({ LocalState }) => {

  // for checking state of all subscriptions, run 'Meteor.connection._subscriptions'

  Tracker.autorun(() => {

    if (Meteor.subscribe('ico.global-counts').ready()) {
      const globalCounts = {
        concept: Counter.get('concepts-prod'),
        published: Counter.get('published-prod')
      };

      LocalState.set({globalCounts: globalCounts});
    }

  });
}
