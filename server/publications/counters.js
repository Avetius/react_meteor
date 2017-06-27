import _ from 'lodash';
import {IcoProjects, Counts, ChangeRequests} from '/lib/collections';
import {Counter} from 'meteor/natestrauser:publish-performant-counts';
import UsersMgmtShared from '/lib/usersMgmtShared';

export default function () {

  /**
   * global counts part
   *
   *  we're using publish-performant-counts (https://github.com/nate-strauser/meteor-publish-performant-counts)
   implementation is not complicated: https://github.com/nate-strauser/meteor-publish-performant-counts/blob/master/lib/server.js
   */
  const conceptsIcosCounter = new Counter('concepts-prod', IcoProjects.find({
    'meta.dataStatus': 'production',
    'entityState.state': 'concept'
  }));

  const publishedIcosCounter = new Counter('published-prod', IcoProjects.find({
    'meta.dataStatus': 'production',
    'entityState.state': 'published'
  }));

  const allTestIcosCounter = new Counter('all-test', IcoProjects.find({
    'meta.dataStatus': 'test'
  }));

  const newChangeRequestsCounter = new Counter('new-changeRequests', ChangeRequests.find({
    published: {$ne: true},
    approved: false,
    rejected: false
  }));

  Meteor.publish('ico.global-counts', function () {
    let globalCounters = [publishedIcosCounter];
    if (this.userId) {
      if (UsersMgmtShared.isUserSuperAdmin(this.userId)) {
        globalCounters = _.concat(globalCounters, [conceptsIcosCounter, allTestIcosCounter, newChangeRequestsCounter]);
      } else if (UsersMgmtShared.isUserContentAdmin(this.userId)) {
        globalCounters = _.concat(globalCounters, [conceptsIcosCounter, allTestIcosCounter]);
      }
    }
    return globalCounters;
  });


  /**
   *   category counts part
   *
   *   for categories counts we're using own separate collection; we compute those data in Methods
   */
  Meteor.publish('ico.category-counts', function () {
    return Counts.find({_id: 'categories'});
  });
}