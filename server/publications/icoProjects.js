import {IcoProjects, Counts} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Counter} from 'meteor/natestrauser:publish-performant-counts';

export default function () {
  Meteor.publish('ico.list', function (limit) {
    check(limit, Number);

    let options = {
      sort: { createdAt: -1 },
      limit: limit,
      fields: {
        mediumLengthDescription: 0,
        coFounders: 0,
      }
    };

    let selector = { 'meta.dataStatus':'production',
      $or: [{ 'entityState.state': 'published' }, { 'entityState.state': 'concept' }] };

    if (!this.userId) {
      options.fields = {...options.fields, entityState: 0};
    }

    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.single', function (icoId) {
    check(icoId, String);
    let options = {
      fields: {}
    };

    const selector = { _id: icoId, $or: [{ 'entityState.state': 'published' }, { 'entityState.state': 'concept' }]};

    if (!this.userId) {
      options.fields = {...options.fields, entityState: 0 };
    }

    return IcoProjects.find(selector, options);
  });


  /**
   * global counts part
   *
   *  we're using publish-performant-counts (https://github.com/nate-strauser/meteor-publish-performant-counts)
   implementation is not complicated: https://github.com/nate-strauser/meteor-publish-performant-counts/blob/master/lib/server.js
   */

  const counter = new Counter('concepts-prod', IcoProjects.find({
    'meta.dataStatus': 'production',
    'entityState.state': 'concept'
  }));

  const counter2 = new Counter('published-prod', IcoProjects.find({
    'meta.dataStatus': 'production',
    'entityState.state': 'published'
  }));

  const counter3 = new Counter('all-test', IcoProjects.find({
    'meta.dataStatus': 'test'
  }));

  Meteor.publish('ico.global-counts', function() {
    if (this.userId) {
      return [counter, counter2, counter3];
    } else {
      return [counter2];
    }
  });

  /**
   *   category counts part
   *
   *   for categories counts we using own separate collection; we compute those data in Methods
   */
  Meteor.publish('ico.category-counts', function() {
    return Counts.find({_id: 'categories'});
  });
}
