import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import _ from 'lodash';
import {Meteor} from 'meteor/meteor';

import actions from '../actions';
import OwnManagedIcos from '../components/icoMgmt/ownManagedIcos';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  Meteor.call('ico.getMyManagedProjects', (err, icoProjectsSlice) => {
      if (err) {
        console.error(err);
      } else {

        if (icoProjectsSlice.length === 0) {
          actions.icoProject.stopInfiniteScrolling(context());
        }

        onData(null, {
          icoEntities: icoProjectsSlice
        });
      }
    }
  );

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(OwnManagedIcos);
