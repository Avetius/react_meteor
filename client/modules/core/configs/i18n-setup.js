import i18next from 'i18next';

export default () => {
  i18next.init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          test: 'test',
          ico: {
            icoStatus: {
              upcoming: 'Upcoming',
              ongoing: 'Ongoing',
              finished: 'Finished',
              suspicious: 'Suspicious',
              scam: 'Scam'
            },
            projectStatus: {
              unknown: 'Concept',
              concept: 'Concept',
              workingPrototype: 'Working prototype',
              privateDemo: 'Private demo',
              publicDemo: 'Public demo',
              live: 'Live'
            },
            fundKeeper: {
              escrow: 'Escrow',
              devs: 'Developing team',
              exchange: 'Exchange',
              unknown: 'Unknown'
            },
            ratingScore: {
              verified: 'Verified',
              unverified: 'Unverified',
              suspicious: 'Suspicious',
              verificationInProcess: 'Verification in process',
              scam: 'Scam'
            },
            ratingScoreStatus: {
              verified: 'Verified status',
              unverified: 'Unverified status',
              suspicious: 'Suspicious status',
              verificationInProcess: 'Verification in process',
              scam: 'Scam status'
            },
            rendering: {
              fieldNA: 'N/A'
            },
            dates: {
              noDate: 'To be announced'
            }
          }
        }
      }
    },
    // see http://i18next.com/docs/options/
    returnEmptyString: false,
    returnNull: false
  }, () => {
      // test
      //console.log('init:', i18next.t('test'));
  });
}

