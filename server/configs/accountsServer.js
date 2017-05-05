import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor';

// Facebook integration setup
Meteor.startup(function() {

  // FACEBOOK
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

  // LinkedIn
  ServiceConfiguration.configurations.update({
      'service': 'linkedin'
    },
    {
      $set: {
       clientId: '865q1dtogjm6s8',
       secret: 'kty1Xk0gE9VQ2CqG',
       loginStyle: 'popup'
      }
    },
    {
      upsert: true
    }
  );



});


/**
 * @docs https://docs.meteor.com/api/accounts-multi.html#AccountsServer-onCreateUser
 * example: http://www.colbycheeze.com/blog/2015/06/publishing-user-data.html
 *
 * We divided profile user data on 3 parts: 1) public 2) private and 3) meta profile.
 * Public is public to all users, private to only registered user, meta is only available for our stats.
 *
 * NOTE: this method is called only once, so only one all of this sections are made only once - so only for 1 service
 */

Accounts.onCreateUser( (options, user) => {
  user.publicProfile = user.publicProfile || {};
  // private profile should be published only to signing client
  user.privateProfile = user.privateProfile || {};
  // metadata should not be published to client
  user.metaProfile = user.metaProfile || {};


  if (user.services.facebook) {
    user.privateProfile.facebook = {};
    user.metaProfile.facebook = {};

    user.publicProfile.name = user.services.facebook.name;
    user.publicProfile.firstName = user.services.facebook.first_name;
    user.publicProfile.lastName = user.services.facebook.last_name;

    user.privateProfile.facebook.email = user.services.facebook.email;

    user.metaProfile.facebook.gender = user.services.facebook.gender;
    user.metaProfile.facebook.ageRange = user.services.facebook.age_range;
  } else if (user.services.linkedin) {
    user.privateProfile.linkedIn = {};
    user.metaProfile.linkedIn = {};

    user.publicProfile.firstName = user.services.linkedin.firstName;
    user.publicProfile.lastName = user.services.linkedin.lastName;
    user.publicProfile.name = user.services.linkedin.firstName + ' ' + user.services.linkedin.lastName;
    user.publicProfile.avatarUrl = user.services.linkedin.pictureUrl;

    user.privateProfile.linkedIn.email = user.services.linkedin.emailAddress;

    user.metaProfile.linkedIn.headlineDesc = user.services.linkedin.headline;
    user.metaProfile.linkedIn.location = user.services.linkedin.location;
    user.metaProfile.linkedIn.connectionsNum = user.services.linkedin.numConnections;
    user.metaProfile.linkedIn.profileUrl = user.services.linkedin.publicProfileUrl;
  }

  return user;
});



/**
 * AccountsMeld package configuration.
 *
 * AccountsMeld melding social accounts with same email address into one account.
 * Ie. copy service field from former used account to account of current logged in user. (The former account will be DELETED.)
 *
 */

/**
 *
 * @desc meldDBCallback:
 * @param src_user_id
 * @param dst_user_id
 */
const meldDBCallback = function(src_user_id, dst_user_id) {
  console.log('meld has been done: src_user_id & dst_user_id: ', src_user_id, dst_user_id);
  // Here you can modify every collection you need for the document referencing
  // to src_user_id to be modified in order to point to dst_user_id

  //SomeCollection.update(
  //  {user_id: src_user_id},
  //  {$set: {user_id: dst_user_id}},
  //  {multi: true}
  //);
};

AccountsMeld.configure({
  meldDBCallback: meldDBCallback
});



