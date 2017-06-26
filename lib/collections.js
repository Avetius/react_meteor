import {Mongo} from 'meteor/mongo';

export const IcoProjects = new Mongo.Collection('icoProjects');
export const Counts = new Mongo.Collection('counts');
export const ChangeRequests = new Mongo.Collection('changeRequests');
