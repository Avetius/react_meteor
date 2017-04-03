import * as Collections from '/lib/collections';
import * as CacheCollections from './cacheCollections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
import globalSubscriptions from './globalSubscriptions';
import accountsConfig from './accountsConfig';
import connectStatusConfig from './connectStatusConfig';
import analyticsSetup from './analytics';

export default function () {

  const context = {
    Meteor,
    FlowRouter,
    Collections,
    CacheCollections,
    LocalState: new ReactiveDict(),
    NonReactiveLocalState: {},
    Tracker
  };

  globalSubscriptions(context);
  accountsConfig(context);
  connectStatusConfig(context);
  analyticsSetup();

  return context;
}
