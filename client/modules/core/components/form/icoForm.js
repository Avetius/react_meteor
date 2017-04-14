import React from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;

import _ from 'lodash';
// Rubix theme
import { Modal, ButtonToolbar, Button } from '@sketchpixy/rubix';

import S3FileUploader from './s3fileUploader';
import { IcoType } from '/lib/icoProject';
import CsvImportUploader from './csvImportUploader';

import { DateTimeStart, DateTimeEnd } from './dateTimePicker';
import {IcoProjectLogoUploader, CoFounderPhotoUploader} from './s3fileUploader';
import { OneSentenceTextInput, MediumLengthDescriptionInput, PersonalBackgroundInput, RatingExplanationInput } from './limitedTextInput';

const formLayout = (locals) => {
  return (
    <div>

      {/*not needed now: <CsvImportUploader />*/}

      <h4>Basic information section</h4>

      {locals.inputs.projectName}

      {locals.inputs.abbreviation}

      {locals.inputs.slugUrlToken}

      {locals.inputs.icoProjectLogo}

      {locals.inputs.officialWebsiteLink}

      {locals.inputs.icoWebsiteLink}

      {locals.inputs.whitePaperLink}

      {locals.inputs.businessPlanLink}

      {locals.inputs.projectStatus}

      {locals.inputs.oneSentenceExplanation}

      {locals.inputs.ratingExplanation}

      {locals.inputs.mediumLengthDescription}

      {locals.inputs.icoStartDatetime}

      {locals.inputs.icoStartDatetimeFormat}

      {locals.inputs.icoEndDatetime}

      {locals.inputs.icoEndDatetimeFormat}

      {locals.inputs.icoEvents}

      {locals.inputs.fundKeeper}

      {locals.inputs.coFounders}

      {locals.inputs.countryOfOrigin}

      {locals.inputs.underlyingCryptoPlatform}


      <h4>Marketing section</h4>

      {locals.inputs.githubLink}

      {locals.inputs.bitcointalkLink}

      {locals.inputs.slackLink}

      {locals.inputs.twitterLink}

      {locals.inputs.facebookLink}

      {locals.inputs.redditLink}

      {locals.inputs.blogLink}

      {locals.inputs.youtubeLink}

      {locals.inputs.linkedinLink}

      {locals.inputs.telegramLink}

      {locals.inputs.steemitLink}

      {locals.inputs.weiboLink}

      {locals.inputs.weChatLink}

      {locals.inputs.qqLink}

      {locals.inputs.otherLinks}

      {locals.inputs.bountyForPromoters}


      <h4>Finance statistics section</h4>

      {locals.inputs.icoMinimumThreshold}

      {locals.inputs.icoMaximumThreshold}

      {locals.inputs.icoThresholdCurrency}

      {locals.inputs.bitcoinInvestments}

      {locals.inputs.ethInvestments}

      {locals.inputs.usdTotalInvestment}

      {locals.inputs.participantsInIco}

      {locals.inputs.pricePerCoin}

      {locals.inputs.maxCurrencySupply}

      {locals.inputs.totalEvaluation}

      {locals.inputs.affiliate}

      {locals.inputs.affiliateAmount}


      <h4>Technical details section</h4>

      {locals.inputs.icoSharedBitcoinAddress}

      {locals.inputs.icoSharedEthereumAddress}


      <h4>Assessment section</h4>

      {locals.inputs.ratingScore}

    </div>
  );
};

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


const renderOptions = {
  template: formLayout,
  auto: 'placeholders',
  fields: {
    projectName: {
      legend: 'Project name',
      config: {
        addonBefore: addonIcons.projectName
      }
    },
    abbreviation: {
      legend: 'Abbreviation'
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
          rows:20
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
    icoStartDatetimeFormat: {

    },
    icoEndDatetime: {
      legend: 'ICO End Datetime',
      factory: DateTimeEnd
    },
    icoEndDatetimeFormat: {

    },
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
    coFounders: {
      disableOrder: true,
      legend: <h4>Co-founders</h4>,
      item: {
        fields: {
          roleDescription: {
            type: 'textarea',
            attrs: {
              rows:1
            }
          },
          personalBackground: {
            config: {
              customAttrs: {
                rows:7
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
      legend: 'Country of origin',
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
      legend: 'ICO minimum threshold'
    },
    icoMaximumThreshold: {
      legend: 'ICO maximum threshold'
    },
    icoThresholdCurrency: {
      legend: 'ICO threshold currency'
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
    pricePerCoin: {
      legend: 'Best price per coin during ICO (??)'
    },
    maxCurrencySupply: {
      legend: 'Max currency supply (if any)'
    },
    totalEvaluation: {
      legend: 'Total evaluation of ICO'
    },

    affiliate: {
      legend: 'Is there affiliate?'
    },
    affiliateAmount: {
      legend: 'Affiliate in percent'
    },

    // technical details section
    icoSharedBitcoinAddress: {
      legend: 'Master BTC ICO address'
    },
    icoSharedEthereumAddress: {
      legend: 'Master ETH ICO address'
    },

    // assessment section
    ratingScore: {
      legend: 'Rating Score'
    },
    ratingExplanation: {
      legend: 'Rating Explanation',
      config: {
        customAttrs: {
          rows:7
        },
      },
      factory: RatingExplanationInput
    }
  }
};

export default class IcoForm extends React.Component {

  constructor () {
    super();
    this.state = {
      showDeleteModal: false,
      formErrors: null
    }
  }

  edit() {
    const value = this.refs.icoForm.getValue();
    console.log('saved edited value:', value);
    if (value) {
      this.hideErrorMessages();
      // hack: try to fix the issue better way (there is problem with loading Date value into DatetimePicker cmp)
      if (value.icoStartDatetime === undefined || value.icoEndDatetime === undefined) {
        const message = `
        Message to admin (prevented save the ICO):

        One of ICO date is undefined (illegal value), and origin value could be lost. Please change any form field and save again to workaround this problem.
        `;
        console.warn(message);
        alert(message);
        return;
      }
      this.props.edit(this.props.editMode.icoId, value);
    } else {
      const validationResult = this.refs.icoForm.validate();
      this.showErrorMessages(validationResult);
      console.warn('upps, something happened. Validation failed?');
    }
  }

  deleteIco() {
    this.props.deleteIco(this.props.editMode.icoId);
  }

  showModalToDeleteIco() {
    this.setState({showDeleteModal: true});
  }

  close () {
    this.setState({showDeleteModal: false});
  }

  addAsConcept () {
    const value = this.refs.icoForm.getValue();
    console.log('saving concept..', value);
    if (value) {
      this.hideErrorMessages();
      this.props.addAsConcept(value);
    } else {
      console.warn('upps, something happened. Validation failed?');
      const validationResult = this.refs.icoForm.validate();
      this.showErrorMessages(validationResult);
    }
  }

  showErrorMessages (validationResult) {
    const messages = _.map(validationResult.errors, (errorObj) => {
      let messageObj = _.pick(errorObj, ['message']);
      messageObj.key = errorObj.path[0];
      return messageObj;
    });
    this.setState({ formErrors: messages });
  }

  hideErrorMessages () {
    this.setState({ formErrors: null });
  }

  onChange(icoEntityValue, path) {
    // validate a field on every change -- consider implement this in onBlur field event handler
    const formComponent = this.refs.icoForm.getComponent(path);
    if (formComponent) {
      formComponent.validate();
    }
  }

  render() {
    let icoForm, saveButtons;
    if (this.props.editMode.active) {
      icoForm = <Form ref="icoForm" type={IcoType} options={renderOptions} value={this.props.icoEntityValue}
                      context={{editMode: true}} onChange={this.onChange.bind(this)} />;
      saveButtons =
        <div className="row">
          <div className="col-md-8 margin-top-md margin-left-md">
            <button onClick={this.edit.bind(this)} className="btn btn-primary margin-right-xs">Save edited ICO</button>
            <span> Save changes in either case - if it is concept or published ICO.</span>
          </div>
          <div className="col-md-3 margin-top-md margin-left-md">
            <button onClick={this.showModalToDeleteIco.bind(this)} className="btn btn-danger">Delete ICO</button>
          </div>
        </div>;
    } else {
      icoForm= <Form ref="icoForm" type={IcoType} options={renderOptions}
                     context={{editMode: false}} onChange={this.onChange.bind(this)} />;
      saveButtons =
        <div className="row">
          <div className="col-xs-6">
            <button onClick={this.addAsConcept.bind(this)} className="btn btn-primary margin-horizontal-md">Add as concept</button>
          </div>
        </div>;
    }

    return (
      <div>

        <div className="row">
          <div className="col-md-10">
            { this.props.editMode.active ? <h3>Edit ICO</h3> : <h3>New Ico</h3>}
            {icoForm}
          </div>
        </div>

        <div className="row">
          <div className="col-md-10">
            { this.state.formErrors ?
              this.state.formErrors.map((errMessage) => {
                return (
                  <h5 key={errMessage.key} className="text-danger"><strong>{errMessage.message}</strong></h5>
                );
              })
              : ''
            }
          </div>
        </div>

        <div className="row margin-vertical-md">
          <div className="col-md-10">
            <ButtonToolbar>
              {saveButtons}
            </ButtonToolbar>
          </div>
        </div>

        <Modal show={this.state.showDeleteModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete ICO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Do you want to really delete ICO?</h3>
            <em>ICO can be restored only by manually manipulating DB by admin.</em>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={this.deleteIco.bind(this)}>Delete</button>
            <button className="btn btn-default" onClick={this.close.bind(this)}>Close</button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }

};


