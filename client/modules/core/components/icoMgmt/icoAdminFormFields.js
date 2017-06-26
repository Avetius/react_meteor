const IcoAdminFormFields = [
  {
    sectionName : 'Basic information section',
    fields: [
      'projectName',
      'abbreviation',
      'slugUrlToken',
      'icoProjectLogo',
      'officialWebsiteLink',
      'icoWebsiteLink',
      'whitePaperLink',
      'businessPlanLink',
      'projectStatus',
      'oneSentenceExplanation',
      'mediumLengthDescription',
      'icoStartDatetime',
      'icoStartDatetimeFormat',
      'icoEndDatetime',
      'icoEndDatetimeFormat',
      'icoEvents',
      'fundKeeper',
      'fundKeeperDetails',
      'coFounders',
      'countryOfOrigin',
      'underlyingCryptoPlatform'
    ]
  },
  {
    sectionName : 'Marketing section',
    fields: [
      'githubLink',
      'slackLink',
      'twitterLink',
      'facebookLink',
      'redditLink',
      'blogLink',
      'youtubeLink',
      'linkedinLink',
      'telegramLink',
      'steemitLink',
      'weiboLink',
      'weChatLink',
      'qqLink',
      'otherLinks',
      'bountyForPromoters',
      'bitcointalkLink'
    ]
  },
  {
    sectionName : 'Finance statistics section',
    fields: [
      'icoMinimumThreshold',
      'icoMaximumThreshold',
      'icoThresholdCurrency',
      'bitcoinInvestments',
      'pricePerCoinUSD',
      'pricePerCoinBTC',
      'pricePerCoinETH',
      'maxCurrencySupply',
      'tradingOnExchangeDatetime',
      'tradingOnExchangeDatetimeFormat',
      'tradingOnExchanges',
    ]
  },
  {
    sectionName : 'Technical details section',
    fields: [
      'icoSharedBitcoinAddress',
      'icoSharedEthereumAddress'
    ]
  },
  {
    sectionName : 'Assessment section',
    fields: [
      'ratingExplanation',
      'ratingScore'
    ]
  }
];

export default IcoAdminFormFields;
