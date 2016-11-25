import {IcoProjects} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('ico.list', function () {
    const selector = {};
    const options = {
      fields: { entityState: 0},
      sort: {createdAt: -1},
      limit: 25
    };
    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.single', function (icoId) {
    check(icoId, String);
    const selector = {_id: icoId};
    return IcoProjects.find(selector);
  });
}
