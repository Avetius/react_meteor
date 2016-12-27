import {IcoProjects} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

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
    let selector;
    if (this.userId) {
      selector = { $or: [ {'meta.dataStatus':'production'}, {'meta.dataStatus':'test'} ] };
    } else {
      selector = { 'meta.dataStatus': 'production'};
      options.fields = {...options.fields, entityState: 0 };
    }

    return IcoProjects.find(selector, options);
  });

  Meteor.publish('ico.single', function (icoId) {
    check(icoId, String);
    let options = {
      fields: {}
    };

    if (!this.userId) {
      options.fields = {...options.fields, entityState: 0 };
    }

    const selector = {_id: icoId};
    return IcoProjects.find(selector, options);
  });
}
