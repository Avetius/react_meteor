import t from 'tcomb-form';

/*
 *  Basic form data model definition
 */


export const OneSentenceStr = t.refinement(t.String, (str) => {
  return 0 <= str.length && str.length <= OneSentenceStr.limit;
});
OneSentenceStr.limit = 200;

export const MediumLengthDescription = t.refinement(t.String, (str) => {
  return 0 <= str.length && str.length <= MediumLengthDescription.limit;
});
MediumLengthDescription.limit = 4050;

// todo implement proper loading from i18n
const ProjectStatus = t.enums({
  concept: 'Concept',
  workingPrototype: 'Working prototype',
  privateDemo: 'Private demo',
  publicDemo: 'Public demo',
  live: 'Live'
});

// todo implement proper loading from i18n
const FundKeeper = t.enums({
  escrow: 'Escrow',
  devs: 'Developing team',
  exchange: 'Exchange'
});

const DateFormat = t.enums({
  dateOnly: 'Date only',
  dateTime: 'Date and time'
});

const Score = t.enums({
  verified: 'Verified',
  unverified: 'Unverified',
  suspicious: 'Suspicious',
  scam: 'Scam'
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
  eventName: t.String,
  eventStartDatetime: t.Date,
  eventEndDatetime: t.Date,
  isBonusEvent: t.Boolean,
});

const NamedLink = t.struct({
  linkName: t.String,
  linkUrl: t.String
});

const IcoTypeDef = {

  // Basic information section
  projectName: t.String,
  abbreviation: t.maybe(t.String),
  icoProjectLogo: t.maybe(t.String),
  officialWebsiteLink: t.maybe(t.String),
  icoWebsiteLink: t.maybe(t.String),
  whitePaperLink: t.maybe(t.String),
  businessPlanLink: t.maybe(t.String),
  projectStatus: t.maybe(ProjectStatus),
  oneSentenceExplanation: t.maybe(OneSentenceStr),
  mediumLengthDescription: t.maybe(MediumLengthDescription),
  icoStartDatetime: t.maybe(t.Date),
  icoStartDatetimeFormat: t.maybe(DateFormat),
  icoEndDatetime: t.maybe(t.Date),
  icoEndDatetimeFormat: t.maybe(DateFormat),
  icoEvents: t.maybe(t.list(IcoEvent)),
  fundKeeper: t.maybe(FundKeeper),
  coFounders: t.maybe(t.list(CoFounder)),
  countryOfOrigin: t.maybe(t.String),
  underlyingCryptoPlatform: t.maybe(t.String),

  // marketing section
  githubLink: t.maybe(t.String),
  bitcointalkLink: t.maybe(t.String),
  slackLink: t.maybe(t.String),
  twitterLink: t.maybe(t.String),
  facebookLink: t.maybe(t.String),
  redditLink: t.maybe(t.String),
  blogLink: t.maybe(t.String),
  youtubeLink: t.maybe(t.String),
  linkedinLink: t.maybe(t.String),
  telegramLink: t.maybe(t.String),
  steemitLink: t.maybe(t.String),
  weiboLink: t.maybe(t.String),
  weChatLink: t.maybe(t.String),
  qqLink: t.maybe(t.String),
  otherLinks: t.maybe(t.list(NamedLink)),
  bountyForPromoters: t.maybe(t.String),

  // finance statistics section
  icoMinimumThreshold: t.maybe(t.Number),
  icoMaximumThreshold: t.maybe(t.Number),
  icoThresholdCurrency: t.maybe(t.String),
  bitcoinInvestments: t.maybe(t.Number),
  ethInvestments: t.maybe(t.Number),
  usdTotalInvestment: t.maybe(t.Number),
  participantsInIco: t.maybe(t.Number),
  pricePerCoin: t.maybe(t.String),
  maxCurrencySupply: t.maybe(t.String),
  totalEvaluation: t.maybe(t.String),

  affiliate: t.maybe(t.String),
  affiliateAmount: t.maybe(t.String),

  // technical details section
  icoSharedBitcoinAddress: t.maybe(t.String),
  icoSharedEthereumAddress: t.maybe(t.String),

  // assessment section
  ratingScore: t.maybe(Score)
};

const IcoType = t.struct(IcoTypeDef);

export {IcoType, IcoTypeDef, IcoEvent, FundKeeper, ProjectStatus};

