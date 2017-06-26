/**
 * Created by jindrich on 21.4.17.
 */

import _ from 'lodash';

export default class DataValidator {

  static isValidEmailAddress ( emailAddress ) {
    // http://stackoverflow.com/a/46181/11236
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( emailAddress );
  }

  /*
  * Removes falsy values from object
  * @param {Object} obj
  * return {Object}
  */
  static removeFalsyValues(obj) {
    return _.pick(obj, _.identity);
  }

}
