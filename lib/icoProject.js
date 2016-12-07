import t from 'tcomb-form';

/*
 *  Basic form data model definition
 */

// todo implement proper loading from i18n
const ProjectStatus = t.enums({
  concept: 'Concept',
  workingPrototype: 'Working prototype',
  privateDemo: 'Private demo',
  publicDemo: 'Public demo',
  Live: 'Live'
});

// todo implement proper loading from i18n
const FundKeeper = t.enums({
  escrow: 'Escrow',
  devs: 'Dev(s)',
  exchange: 'Exchange'
});

const CoFounder = t.struct({
  name: t.String,
  roleDescription: t.String,
  personalBackground: t.maybe(t.String),
  photoUrl: t.maybe(t.String),
  linkedInProfileUrl: t.maybe(t.String),
  twitterProfileUrl: t.maybe(t.String)
});

const IcoEvent = t.struct({
  eventName: t.Str,
  eventStartDatetime: t.Date,
  eventEndDatetime: t.Date,
  isBonusEvent: t.Boolean,
});

const IcoType = t.struct({
  projectName: t.String,
  abbreviation: t.String,
  icoProjectLogo: t.String,
  officialWebsiteLink: t.String,
  icoWebsiteLink: t.String,
  whitePaperLink: t.String,
  projectStatus: ProjectStatus,
  oneSentenceExplanation: t.String,
  mediumLengthDescription: t.maybe(t.String),
  icoStartDatetime: t.Date,
  icoEndDatetime: t.Date,
  icoEvents: t.maybe(t.list(IcoEvent)),
  maxSupply: t.maybe(t.String),
  fundKeeper: FundKeeper,
  coFounders: t.maybe(t.list(CoFounder)),
  countryOfOrigin: t.String,
  underlyingCryptoPlatform: t.String,
  bounty: t.Boolean,
  affiliate: t.Boolean,
  affiliateAmount: t.maybe(t.String),
  githubLink: t.maybe(t.String),
  slackLink: t.maybe(t.String),
  twitterLink: t.maybe(t.String),
  facebookLink: t.maybe(t.String),
  redditLink: t.maybe(t.String),
  blogLink: t.maybe(t.String),
  telegramLink: t.maybe(t.String)
});

export {IcoType, IcoEvent, FundKeeper, ProjectStatus};

