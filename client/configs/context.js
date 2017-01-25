import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
import globalSubscriptions from './globalSubscriptions';
import accountsConfig from './accountsConfig';
import connectStatusConfig from './connectStatusConfig';

export default function () {

  const context = {
    Meteor,
    FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker
  };

  globalSubscriptions(context);
  accountsConfig(context);
  connectStatusConfig(context);

  return context;
}
