import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor';

// Facebook integration setup
Meteor.startup(function() {

  if (process.env.NODE_ENV === 'development') {

    ServiceConfiguration.configurations.update({
        'service': 'facebook'
      },
      {
        $set: {
          'appId': '264767840607984',
          'secret': '27d576616dd1134ce76fb0e16a79afac'
        }
      },
      {
        upsert: true
      }
    );

    // todo consider better environment checking
  } else {

    ServiceConfiguration.configurations.update({
        'service': 'facebook'
      },
      {
        $set: {
          'appId': '897986073678471',
          'secret': '99058f8a113bf0d520b876b5e5f28b0c'
        }
      },
      {
        upsert: true
      }
    );
  }



});


/**
 * @docs https://docs.meteor.com/api/accounts-multi.html#AccountsServer-onCreateUser
 * example: http://www.colbycheeze.com/blog/2015/06/publishing-user-data.html
 */
Accounts.onCreateUser( (options, user) => {
  user.profile = user.profile || {};
  // metadata should not be published to clients
  user.metaData = user.metaData || {};


  if (user.services.facebook) {
    user.profile.email = user.services.facebook.email;
    user.profile.name = user.services.facebook.name;
    user.profile.firstName = user.services.facebook.first_name;
    user.profile.lastName = user.services.facebook.last_name;

    user.metaData.email = user.services.facebook.email;
    user.metaData.gender = user.services.facebook.gender;
    user.metaData.ageRange = user.services.facebook.age_range;
  } else if (user.services.google) {
    // todo implement saving google data to profile and meta fields
  } else {
    // registration by email only
    user.profile.email = user.emails[0].address;

    user.metaData.email = user.emails[0].address;
    user.metaData.verified = user.emails[0].verified;
  }

  return user;
});

// todo make some validation like reject users with certain usernames
//AccountsServer.validateNewUser(function (user) {
//if (user.username && user.username.length >= 3) {
//  return true;
//}
//
//return user.username !== "root";
//
//throw new Meteor.Error(403, "Username must have at least 3 characters");
//});
