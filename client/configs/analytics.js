import { analytics } from 'meteor/okgrow:analytics';

export default () => {
  analytics.on("page", (event, properties, options) => {
    //console.log('page event:', event, properties, options);
  });

  analytics.on("identify", (event, properties, options) => {
    //console.log('identify event:', event, properties, options);
  });

  analytics.on("track", (event, properties, options) => {
    //console.log('track event:', event, properties, options);
  });
}




