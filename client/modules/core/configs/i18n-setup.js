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
              finished: 'Finished'
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
              exchange: 'Exchange'
            },
            rendering: {
              fieldNA: 'N/A'
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

