import {IcoProjects} from '/lib/collections';
import {Meteor} from 'meteor/meteor';

export default () => {
  // Deny all client-side updates to user documents
  Meteor.users.deny({
    update() { return true; }
  });

  // Deny all client-side updates on the IcoProjects collection
  IcoProjects.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
  });

  /**
   * Lets rewrite url of meteor assets (JS, CSS) to using CDN.
   * See http://joshowens.me/using-a-cdn-with-your-production-meteor-app/
   * or https://dweldon.silvrback.com/browser-policy
   * or different implementation in https://github.com/Nitrolabs/meteor-cdn
   *
   */
  Meteor.startup(function() {

    if (Meteor.settings.cdnPrefix) {
      WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix);
      BrowserPolicy.content.allowOriginForAll(Meteor.settings.cdnPrefix);
    }
    // more info: https://atmospherejs.com/meteor/browser-policy
    BrowserPolicy.content.allowOriginForAll(Meteor.absoluteUrl());
    BrowserPolicy.content.allowImageOrigin('*');
    console.log('rootUrl: ', Meteor.absoluteUrl());

    const fontRegExp = /\.(eot|ttf|otf|woff|woff2)$/;
    // todo test this more:
    WebApp.rawConnectHandlers.use('/', function(req, res, next) {
      if (fontRegExp.test(req._parsedUrl.pathname)) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Vary', 'Origin');
        res.setHeader('Pragma', 'public');
        res.setHeader('Cache-Control', '"public"');
      }
      return next();
    });

  });
}
