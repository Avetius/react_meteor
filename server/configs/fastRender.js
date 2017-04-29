import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {

  FastRender.route('/', function() {
    this.subscribe('ico.list-preview-ongoing');
  });

  FastRender.route('/index/ongoing', function() {
    this.subscribe('ico.list-preview-ongoing');
  });

  FastRender.route('/index/upcoming', function() {
    this.subscribe('ico.list-preview-upcoming');
  });

  FastRender.route('/index/finished', function() {
    this.subscribe('ico.list-preview-finished');
  });

  FastRender.route('/profile/:icoSlug', function(params) {
    this.subscribe('ico.single', {icoSlug: params.icoSlug});
  });

});
