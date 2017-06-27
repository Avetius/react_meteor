import moment from 'moment';
import Constants from '../configs/constants';

export function renderDatetime (datetime, datetimeFormat) {
  if (!datetime || new Date(datetime).getTime() === Constants.pseudoDateTimeInFuture) {
    return false;
  }

  if (!datetimeFormat || datetimeFormat === 'dateTime') {
    return moment(datetime).format('MMMM Do YYYY, h:mm a');
  } else if (datetimeFormat === 'dateOnly') {
    return moment(datetime).format('MMMM Do YYYY');
  }
}

export function renderDatetimeInUTC (datetime) {
  if (!datetime || new Date(datetime).getTime() === Constants.pseudoDateTimeInFuture) {
    return false;
  }
  return moment.utc(datetime).format('MMMM Do YYYY, h:mm a');
}