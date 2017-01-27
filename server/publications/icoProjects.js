import {IcoProjects, Counts} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {Counter} from 'meteor/natestrauser:publish-performant-counts';
import AccountsMgmt from '/lib/accountsMgmt';

/**
 * Publications performances::
 * if you want to unblock some heavy publications in future, try  https://github.com/meteorhacks/unblock
 * but be careful according to this issue: https://github.com/meteorhacks/unblock/issues/11#issuecomment-266263478
 *
 * To be more effective, try adjusting sequence of subscribing.
 */

export default function () {
  Meteor.publish('ico.list', function (userId, limit) {
    // userId is mock for signaling that user proceeded auth on client
    check(userId, Match.Any);
    check(limit, Number);

    let options = {
      sort: { createdAt: -1 },
      limit: limit,
      fields: {
        mediumLengthDescription: 0,
        coFounders: 0,
      }
    };

    let selector;
    let user;
    if (this.userId) {
      user = Meteor.users.findOne({_id: this.userId});
    }
    if (this.userId && user && AccountsMgmt.isAdmin(this.userId, user)) {
      selector = { 'meta.dataStatus':'production',
        $or: [{ 'entityState.state': 'published' }, { 'entityState.state': 'concept' }] };
    } else {
      // todo make some omits for admin data for non-admins?
      //options.fields = {...options.fields};
      selector = { 'meta.dataStatus':'production', 'entityState.state': 'published' };
    }

    return IcoProjects.find(selector, options);
  });

  const inIcoListUsableFields = {
    _id: 1,
    projectName: 1,
    abbreviation: 1,
    oneSentenceExplanation: 1,

    icoStartDatetime: 1,
    icoEndDatetime: 1,

    icoEndDatetimeFormat: 1,
    icoStartDatetimeFormat: 1,

    icoEvents: 1,
    fundKeeper: 1,
    projectStatus: 1,
    icoWebsiteLink: 1
  };

  const previewOptions = {
    // set in specific publication!
    sort: {},
    // 2 * visible items = 6 (for now)
    limit: 6,
    fields: inIcoListUsableFields
  };

  // Ongoing ICOs shown on homepage
  Meteor.publish('ico.list-preview-ongoing', function () {
    const currentDate = new Date();

    const options = { sort: { icoEndDatetime: 1 }, ...previewOptions };
    // ongoing
    const selector = { 'meta.dataStatus':'production', 'entityState.state': 'published',
      'icoStartDatetime' : { '$lt' : currentDate }, icoEndDatetime: { '$gte' : currentDate } };

    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.list-preview-upcoming', function () {
    const currentDate = new Date();

    const options = { sort: { icoStartDatetime: 1 }, ...previewOptions };
    // upcoming
    const selector = { 'meta.dataStatus':'production', 'entityState.state': 'published',
      'icoStartDatetime' : { '$gt' : currentDate } };

    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.list-preview-finished', function () {
    const currentDate = new Date();

    const options = { sort: { icoEndDatetime: -1 }, ...previewOptions };
    // finished
    const selector = { 'meta.dataStatus':'production', 'entityState.state': 'published',
      'icoStartDatetime' : { '$lt' : currentDate }, icoEndDatetime: { '$lt' : currentDate } };

    return IcoProjects.find(selector, options);
  });


  Meteor.publish('ico.single', function (icoId) {
    check(icoId, String);
    let options = {
      fields: {}
    };

    const selector = { _id: icoId, $or: [{ 'entityState.state': 'published' }, { 'entityState.state': 'concept' }]};

    if (!this.userId) {
      // todo make some omits for admin data for non-admins?
      options.fields = {...options.fields };
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
