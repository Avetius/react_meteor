import S3FileUploader from './../form/s3fileUploader';
import {IcoProjectLogoUploader, CoFounderPhotoUploader} from './../form/s3fileUploader';
import {DateTimeStart, DateTimeEnd} from './../form/dateTimePicker';
import {
    OneSentenceTextInput,
    MediumLengthDescriptionInput,
    PersonalBackgroundInput,
    RatingExplanationInput
} from './../form/limitedTextInput';

const addonIcons = {
    projectName: <i className="fa fa-font" aria-hidden="true"></i>,
    abbreviation: null,
    officialWebsiteLink: <i className="fa fa-home" aria-hidden="true"></i>,
    icoWebsiteLink: <i className="fa fa-money" aria-hidden="true"></i>,
    whitePaperLink: <i className="fa fa-file-text-o" aria-hidden="true"></i>,
    businessPlanLink: <i className="fa fa-money" aria-hidden="true"></i>,
    projectStatus: null,
    oneSentenceExplanation: <span>
    <i className="fa fa-twitter" aria-hidden="true"></i> &nbsp;
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                          </span>,
    mediumLengthDescription: <i className="fa fa-pencil-square-o" aria-hidden="true"></i>,
    icoStartDatetime: null,
    icoEndDatetime: null,
    icoEvents: null,
    fundKeeper: null,
    coFounders: <i className="fa fa-user-circle" aria-hidden="true"></i>,
    countryOfOrigin: null,
    underlyingCryptoPlatform: null,
    githubLink: <i className="fa fa-github" aria-hidden="true"></i>,
    bitcointalkLink: <i className="fa fa-btc" aria-hidden="true"></i>,
    slackLink: <i className="fa fa-slack" aria-hidden="true"></i>,
    twitterLink: <i className="fa fa-twitter" aria-hidden="true"></i>,
    facebookLink: <i className="fa fa-facebook-official" aria-hidden="true"></i>,
    redditLink: <i className="fa fa-reddit" aria-hidden="true"></i>,
    blogLink: <i className="fa fa-newspaper-o" aria-hidden="true"></i>,
    youtubeLink: <i className="fa fa-youtube" aria-hidden="true"></i>,
    linkedinLink: <i className="fa fa-linkedin-square" aria-hidden="true"></i>,
    telegramLink: <i className="fa fa-telegram" aria-hidden="true"></i>,
    steemitLink: <i className="fa fa-newspaper-o" aria-hidden="true"></i>,
    weiboLink: <i className="fa fa-weibo" aria-hidden="true"></i>,
    weChatLink: <i className="fa fa-weixin" aria-hidden="true"></i>,
    qqLink: <i className="fa fa-qq" aria-hidden="true"></i>
};

const IcoFieldsRenderOptions = {
    projectName: {
        legend: 'Project name',
        config: {
            addonBefore: addonIcons.projectName
        }
    },
    abbreviation: {
        legend: 'Abbreviation',
        help: <i>Unique Token Ticker</i>
    },
    slugUrlToken: {
        legend: 'Slug URL token',
        disabled: true,
        attrs: {
            placeholder: 'No slug URL token yet. Contact Admin.'
        }
    },
    icoProjectLogo: {
        legend: 'ICO Project Logo',
        factory: IcoProjectLogoUploader
    },
    officialWebsiteLink: {
        legend: 'Official website link',
        config: {
            addonBefore: addonIcons.officialWebsiteLink
        }
    },
    icoWebsiteLink: {
        legend: 'ICO website link',
        config: {
            addonBefore: addonIcons.icoWebsiteLink
        }
    },
    whitePaperLink: {
        legend: 'White paper link',
        config: {
            addonBefore: addonIcons.whitePaperLink
        }
    },
    businessPlanLink: {
        legend: 'Business plan link',
        config: {
            addonBefore: addonIcons.businessPlanLink
        }
    },
    projectStatus: {
        legend: 'Project status',
    },
    oneSentenceExplanation: {
        type: 'textarea',
        legend: 'One sentence explanation',
        help: <i>It should be short descriptive explanation. Should be short enough to use in 1 tweet.</i>,
        config: {
            addonBefore: addonIcons.oneSentenceExplanation
        },
        factory: OneSentenceTextInput
    },
    mediumLengthDescription: {
        legend: 'Medium length description',
        config: {
            customAttrs: {
                rows: 20
            },
            addonBefore: addonIcons.mediumLengthDescription
        },
        factory: MediumLengthDescriptionInput
        //todo: factory: MarkDownEditor (find some)
    },
    icoStartDatetime: {
        legend: 'ICO Start Datetime',
        factory: DateTimeStart
    },
    icoStartDatetimeFormat: {},
    icoEndDatetime: {
        legend: 'ICO End Datetime',
        factory: DateTimeEnd
    },
    icoEndDatetimeFormat: {},
    icoEvents: {
        disableOrder: true,
        legend: <h4>ICO and project specific events (ie. bonus events, ...)</h4>,
        item: {
            fields: {
                eventStartDatetime: {
                    factory: DateTimeStart
                },
                eventEndDatetime: {
                    factory: DateTimeEnd
                }
            }
        }
    },
    fundKeeper: {
        legend: 'Fund keeper',
    },
    fundKeeperDetails: {
        legend: 'Fund keeper details',
        help: <i>names of Escrow key holders / Name of exchange / Smart contract link</i>
    },
    coFounders: {
        disableOrder: true,
        legend: <h4>Co-founders</h4>,
        item: {
            fields: {
                roleDescription: {
                    type: 'textarea',
                    attrs: {
                        rows: 1
                    }
                },
                personalBackground: {
                    config: {
                        customAttrs: {
                            rows: 7
                        },
                    },
                    factory: PersonalBackgroundInput
                    //todo: factory: MarkDownEditor (find some)
                },
                photoUrl: {
                    factory: CoFounderPhotoUploader
                },
                linkedInProfileUrl: {},
                twitterProfileUrl: {},
                facebookProfileUrl: {},
                githubProfileUrl: {}
            }
        }
    },
    countryOfOrigin: {
        legend: 'Country of incorporation',
    },
    underlyingCryptoPlatform: {
        legend: 'Underlying crypto-platform',
    },

    githubLink: {
        legend: 'Main github repository link',
        config: {
            addonBefore: addonIcons.githubLink
        }
    },
    bitcointalkLink: {
        legend: 'Bitcoin Talk announcement link',
        config: {
            addonBefore: addonIcons.bitcointalkLink
        }
    },
    slackLink: {
        legend: 'Slack link',
        config: {
            addonBefore: addonIcons.slackLink
        }
    },
    twitterLink: {
        legend: 'Twitter link',
        config: {
            addonBefore: addonIcons.twitterLink
        }
    },
    facebookLink: {
        legend: 'Facebook link',
        config: {
            addonBefore: addonIcons.facebookLink
        }
    },
    redditLink: {
        legend: 'Reddit link',
        config: {
            addonBefore: addonIcons.redditLink
        }
    },
    blogLink: {
        legend: 'Blog link',
        config: {
            addonBefore: addonIcons.blogLink
        }
    },
    youtubeLink: {
        legend: 'Youtube link',
        config: {
            addonBefore: addonIcons.youtubeLink
        }
    },
    linkedinLink: {
        legend: 'LinkedIn link',
        config: {
            addonBefore: addonIcons.linkedinLink
        }
    },
    telegramLink: {
        legend: 'Telegram link',
        config: {
            addonBefore: addonIcons.telegramLink
        }
    },
    steemitLink: {
        legend: 'Steemit link',
        config: {
            addonBefore: addonIcons.steemitLink
        }
    },
    weiboLink: {
        legend: 'Weibo link',
        config: {
            addonBefore: addonIcons.weiboLink
        }
    },
    weChatLink: {
        legend: 'WeChat link',
        config: {
            addonBefore: addonIcons.weChatLink
        }
    },
    qqLink: {
        legend: 'QQ link',
        config: {
            addonBefore: addonIcons.qqLink
        }
    },
    otherLinks: {
        disableOrder: true,
        legend: <h4>Other Links</h4>,
        item: {
            fields: {
                linkName: {},
                linkUrl: {}
            }
        }
    },
    bountyForPromoters: {
        legend: 'Bounty'
    },

// finance statistics section
    icoMinimumThreshold: {
        legend: 'ICO minimum threshold',
        help: <i>If the ICO does not raise this amount, the funds will be refunded (insert numbers only)</i>
    },
    icoMaximumThreshold: {
        legend: 'ICO maximum threshold',
        help: <i>If the ICO raises this amount, the ICO will stop. (insert numbers only)</i>
    },
    icoThresholdCurrency: {
        legend: 'ICO threshold currency',
        help: <i>In which currency is the threshold denominated, USD, ETH, BTC?</i>
    },
    bitcoinInvestments: {
        legend: 'Bitcoin total investment'
    },
    ethInvestments: {
        legend: 'ETH total investment'
    },
    usdTotalInvestment: {
        legend: 'USD total investment'
    },
    participantsInIco: {
        legend: 'Participants in ICO'
    },
    pricePerCoinUSD: {
        legend: 'Best price per coin during ICO in USD',
        help: <i>including highest bonus (will be used for calculating ROI)</i>,
    },
    pricePerCoinBTC: {
        legend: 'Best price per coin during ICO in BTC',
        help: <i>including highest bonus (will be used for calculating ROI)</i>,
    },
    pricePerCoinETH: {
        legend: 'Best price per coin during ICO in ETH',
        help: <i>including highest bonus (will be used for calculating ROI)</i>,
    },
    maxCurrencySupply: {
        legend: 'Max currency supply (if any)'
    },
    totalEvaluation: {
        legend: 'Total evaluation of ICO'
    },

    tradingOnExchangeDatetime: {
        legend: 'Trading starts',
        factory: DateTimeStart
    },
    tradingOnExchangeDatetimeFormat: {
        legend: 'Trading start date format'
    },
    tradingOnExchanges: {
        legend: 'Names of exchanges',
        help: <i>names of exchanges divided by space</i>
    },

    affiliate: {
        legend: 'Is there affiliate?'
    },
    affiliateAmount: {
        legend: 'Affiliate in percent'
    },

// technical details section
    icoSharedBitcoinAddress: {
        legend: 'Master BTC ICO address',
        help: <i>BTC address that contains all funds raised (will be used for showing real- time ICO progress).</i>
    },
    icoSharedEthereumAddress: {
        legend: 'Master ETH ICO address',
        help: <i>ETH address that contains all funds raised (will be used for showing real-time ICO progress).</i>
    },

// assessment section
    ratingScore: {
        legend: 'Rating Score'
    },
    ratingExplanation: {
        legend: 'Rating Explanation',
        config: {
            customAttrs: {
                rows: 7
            },
        },
        factory: RatingExplanationInput
    },

};

export default IcoFieldsRenderOptions;