import React from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;
import S3FileUploader from './s3fileUploader';
import { IcoType } from '/lib/icoProject';

import CsvImportUploader from './csvImportUploader';

// Rubix theme
import { ButtonToolbar, Button, OverlayTrigger, Popover } from '@sketchpixy/rubix';

import {DateTimeStart, DateTimeEnd} from './dateTimePicker';
import {IcoProjectLogoUploader, CoFounderPhotoUploader} from './s3fileUploader';
import {OneSentenceTextInput, MediumLengthDescriptionInput} from './limitedTextInput';

const formLayout = (locals) => {
  return (
    <div>
      <h3>New ICO</h3>
      <p>Please click on help icon to know more info about details of the field.</p>

      <CsvImportUploader />

      {locals.inputs.projectName}

      {locals.inputs.abbreviation}

      {locals.inputs.icoProjectLogo}

      {locals.inputs.officialWebsiteLink}

      {locals.inputs.icoWebsiteLink}

      {locals.inputs.whitePaperLink}

      {locals.inputs.businessPlanLink}

      {locals.inputs.projectStatus}

      {locals.inputs.oneSentenceExplanation}

      {locals.inputs.mediumLengthDescription}

      {locals.inputs.icoStartDatetime}

      {locals.inputs.icoEndDatetime}

      {locals.inputs.icoEvents}

      {locals.inputs.maxSupply}

      {locals.inputs.fundKeeper}

      {locals.inputs.coFounders}

      {locals.inputs.countryOfOrigin}

      {locals.inputs.underlyingCryptoPlatform}

      {locals.inputs.bounty}

      {locals.inputs.affiliate}

      {locals.inputs.affiliateAmount}

      {locals.inputs.githubLink}

      {locals.inputs.slackLink}

      {locals.inputs.twitterLink}

      {locals.inputs.facebookLink}

      {locals.inputs.redditLink}

      {locals.inputs.blogLink}

      {locals.inputs.telegramLink}

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
  maxSupply: null,
  fundKeeper: null,
  coFounders: <i className="fa fa-user-circle" aria-hidden="true"></i>,
  countryOfOrigin: null,
  underlyingCryptoPlatform: null,
  bounty: null,
  affiliate: null,
  affiliateAmount: null,
  githubLink: <i className="fa fa-github" aria-hidden="true"></i>,
  slackLink: <i className="fa fa-slack" aria-hidden="true"></i>,
  twitterLink: <i className="fa fa-twitter" aria-hidden="true"></i>,
  facebookLink: <i className="fa fa-facebook-official" aria-hidden="true"></i>,
  redditLink: <i className="fa fa-reddit" aria-hidden="true"></i>,
  blogLink: <i className="fa fa-newspaper-o" aria-hidden="true"></i>,
  telegramLink: <i className="fa fa-telegram" aria-hidden="true"></i>
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
      legend: 'Abbreviation',
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
      type: 'textarea',
      legend: 'Medium length description',
      config: {
        customAttrs: {
          rows:5
        },
        addonBefore: addonIcons.mediumLengthDescription
      },
      factory: MediumLengthDescriptionInput
    },
    icoStartDatetime: {
      legend: 'ICO Start Datetime',
      factory: DateTimeStart
    },
    icoEndDatetime: {
      legend: 'ICO End Datetime',
      factory: DateTimeEnd
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
    maxSupply: {
      legend: 'Max currency supply (if any)',
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
            type: 'textarea',
            attrs: {
              rows:3
            }
          },
          photoUrl: {
            factory: CoFounderPhotoUploader
          }
        }
      }
    },
    countryOfOrigin: {
      legend: 'Country of origin',
    },
    underlyingCryptoPlatform: {
      legend: 'Underlying crypto-platform',
    },
    bounty: {
      legend: 'Existence of bounty',
    },
    affiliate: {
      legend: 'Affiliate',
    },
    affiliateAmount: {
      legend: 'Affiliate amount',
    },

    githubLink: {
      legend: 'Main github repository link',
      config: {
        addonBefore: addonIcons.githubLink
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
    telegramLink: {
      legend: 'Telegram link',
      config: {
        addonBefore: addonIcons.telegramLink
      }
    }
  }
};

export default class IcoForm extends React.Component{

  save() {
    // if validation fails, value will be null
    const value = this.refs.icoForm.getValue();

    console.log('saved value:', value);
    if (value) {
      this.props.save(value);
    } else {
      console.warn('upps, something happened. Validation failed?');
    }
  }

  edit() {
    const value = this.refs.icoForm.getValue();

    console.log('saved edited value:', value);
    if (value) {
      this.props.edit(this.props.editMode.icoId, value);
    } else {
      console.warn('upps, something happened. Validation failed?');
    }
  }

  saveConcept () {
    const value = this.refs.icoForm.getValue();
    console.log('saving concept..', value);
    if (value) {
      this.props.saveConcept(value);
    } else {
      console.warn('upps, something happened. Validation failed?');
    }
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
        <div>
          <Button onClick={this.edit.bind(this)} bsStyle="primary">Edit and publish</Button>
        </div>;
    } else {
      icoForm= <Form ref="icoForm" type={IcoType} options={renderOptions}
                     context={{editMode: false}} onChange={this.onChange.bind(this)} />;
      saveButtons =
        <div>
          <Button onClick={this.save.bind(this)} bsStyle="primary">Save and publish</Button>
          <Button onClick={this.saveConcept.bind(this)} bsStyle="default">Save a concept</Button>
        </div>;
    }

    return (
      <div>

        <div className="row">
          <div className="col-md-10">
            {icoForm}
          </div>
        </div>

        <div className="row margin-vertical-md">
          <div className="col-md-10">
            <ButtonToolbar>
              {saveButtons}
            </ButtonToolbar>
          </div>
        </div>

      </div>
    );
  }

};


