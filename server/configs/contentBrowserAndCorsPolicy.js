import {Meteor} from 'meteor/meteor';

export default () => {

  /**
   * More info about Browser-policy: https://atmospherejs.com/meteor/browser-policy
   */

  // Analytics section, needed here: https://github.com/okgrow/analytics
  BrowserPolicy.content.allowOriginForAll("www.google-analytics.com");
  BrowserPolicy.content.allowOriginForAll("cdn.mxpnl.com");

  /**
   * Lets rewrite url of meteor assets (JS, CSS) to using CDN.
   * See http://joshowens.me/using-a-cdn-with-your-production-meteor-app/
   * or https://dweldon.silvrback.com/browser-policy
   * or different implementation in https://github.com/Nitrolabs/meteor-cdn
   *
   */
  if (Meteor.settings.cdnPrefix) {
    WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix);
    BrowserPolicy.content.allowOriginForAll(Meteor.settings.cdnPrefix);
  }

  BrowserPolicy.content.allowOriginForAll(Meteor.absoluteUrl());
  // todo: change this to our domains only - so that our images can be accessed only from ours domains
  BrowserPolicy.content.allowImageOrigin('*');

  // allow fonts to be served from anywhere
  // consider later changing this to only our domains icoindex.com and cdn.icoindex.com;
  const fontRegExp = /\.(eot|ttf|otf|woff|woff2)$/;
  WebApp.rawConnectHandlers.use('/', function(req, res, next) {
    if (fontRegExp.test(req._parsedUrl.pathname)) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Vary', 'Origin');
      res.setHeader('Pragma', 'public');
      res.setHeader('Cache-Control', '"public"');
    }
    return next();
  });
}
