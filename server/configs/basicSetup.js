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
   * or different implementation in https://github.com/Nitrolabs/meteor-cdn
   *
   */
  Meteor.startup(function() {

    if (Meteor.settings.cdnPrefix) {
      WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix);
      BrowserPolicy.content.allowOriginForAll(Meteor.settings.cdnPrefix);
    }
    // todo replace by rootUrl:
    BrowserPolicy.content.allowOriginForAll('http://premvp.icoindex.com');
    BrowserPolicy.content.allowImageOrigin('*');

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
