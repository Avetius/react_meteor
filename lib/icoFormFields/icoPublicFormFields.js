const IcoPublicFormFields = {
  basic: {
    sectionName: 'Basic information section',
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
  marketing: {
    sectionName: 'Marketing section',
    fields: [
      'githubLink',
      'bitcointalkLink',
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
    ]
  },
  finance: {
    sectionName: 'Finance statistics section',
    fields: [
      'icoMinimumThreshold',
      'icoMaximumThreshold',
      'icoThresholdCurrency',
      'pricePerCoinUSD',
      'pricePerCoinBTC',
      'pricePerCoinETH',
      'maxCurrencySupply',
      'circulatingSupply',
      'tradingOnExchangeDatetime',
      'tradingOnExchangeDatetimeFormat',
      'tradingOnExchanges',
    ]
  },
  technical: {
    sectionName: 'Technical details section',
    fields: [
      'icoSharedBitcoinAddress',
      'icoSharedEthereumAddress'
    ]
  },
  assessment: {
    sectionName : 'Assessment section',
    fields: null
  },
  other: {
    sectionName: "Other",
    fields: [
      'notes'
    ]
  }
};

export default IcoPublicFormFields;
