import React from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;

// Rubix theme
import { ButtonToolbar, Button, OverlayTrigger, Popover } from '@sketchpixy/rubix';

import {DateTimeStart, DateTimeEnd} from './dateTimePicker';
import LabelWithHelp from './labelWithHelp';

// form data model definitions
const IcoStatus = t.enums({
  ongoing: 'Ongoing',
  upcoming: 'Upcoming',
  finished: 'Finished'
});

const ProjectStatus = t.enums({
  concept: 'Concept',
  workingPrototype: 'Working prototype',
  privateDemo: 'Private demo',
  publicDemo: 'publicDemo',
  Live: 'Live'
});

const FundKeeper = t.enums({
  escrow: 'Escrow',
  devs: 'Dev(s)',
  exchange: 'Exchange'
});

const RunningSocialCampaign = t.enums({
  yes: 'yes',
  no: 'no'
});

const IcoEvent = t.struct({
  eventName: t.Str,
  eventStartDatetime: t.Date,
  eventEndDatetime: t.maybe(t.Date)
});

const IcoType = t.struct({
  projectName: t.String,
  abbreviation: t.String,
  officialWebsiteLink: t.String,
  icoWebsiteLink: t.String,
  whitePaperLink: t.String,
  icoStatus: IcoStatus,
  projectStatus: ProjectStatus,
  oneSentenceExplanation: t.String,
  mediumLengthDescription: t.maybe(t.String),
  icoStartDatetime: t.Date,
  icoEndDatetime: t.Date,
  icoEvents: t.maybe(t.list(IcoEvent)),
  maxSupply: t.maybe(t.String),
  fundKeeper: FundKeeper,
  runningSocialCampaign: RunningSocialCampaign,
  coFounders: t.String,
  countryOfOrigin: t.String,
  underlyingCryptoPlatform: t.String,
  bonus: t.Boolean,
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

const formLayout = (locals) => {
  return (
    <div>
      <h3>New ICO</h3>
      <p>Please click on help icon to know more info about details of the field.</p>

      <LabelWithHelp fieldLabel="Project name"
                     helpText=""
      />
      {locals.inputs.projectName}

      <LabelWithHelp fieldLabel="Abbreviation"
                     helpText=""
      />
      {locals.inputs.abbreviation}

      <LabelWithHelp fieldLabel="Official website link"
                     helpText=""
      />
      {locals.inputs.officialWebsiteLink}

      <LabelWithHelp fieldLabel="ICO website link"
                     helpText=""
      />
      {locals.inputs.icoWebsiteLink}

      <LabelWithHelp fieldLabel="White paper link"
                     helpText=""
      />
      {locals.inputs.whitePaperLink}

      <LabelWithHelp fieldLabel="ICO status"
                     helpText=""
      />
      {locals.inputs.icoStatus}

      <LabelWithHelp fieldLabel="Project status"
                     helpText=""
      />
      {locals.inputs.projectStatus}

      <LabelWithHelp fieldLabel="One Sentence Explanation"
                     helpText="It should be short descriptive explanation. Should be short enough to use in 1 tweet."
      />
      {locals.inputs.oneSentenceExplanation}

      <LabelWithHelp fieldLabel="Medium length description"
                     helpText="It should be short description"
      />
      {locals.inputs.mediumLengthDescription}

      <LabelWithHelp fieldLabel="ICO Start Datetime"
                     helpText=""
      />
      {locals.inputs.icoStartDatetime}

      <LabelWithHelp fieldLabel="ICO End Datetime"
                     helpText=""
      />
      {locals.inputs.icoEndDatetime}

      <LabelWithHelp fieldLabel="ICO and project specific events"
                     helpText=""
      />
      {locals.inputs.icoEvents}

      <LabelWithHelp fieldLabel="Max currency supply (if any)"
                     helpText=""
      />
      {locals.inputs.maxSupply}

      <LabelWithHelp fieldLabel="Fund keeper"
                     helpText=""
      />
      {locals.inputs.fundKeeper}

      <LabelWithHelp fieldLabel="Running Social Campaign"
                     helpText=""
      />
      {locals.inputs.runningSocialCampaign}

      <LabelWithHelp fieldLabel="Co-Founders"
                     helpText=""
      />
      {locals.inputs.coFounders}

      <LabelWithHelp fieldLabel="Country of origin"
                     helpText=""
      />
      {locals.inputs.countryOfOrigin}

      <LabelWithHelp fieldLabel="Underlying crypto platform"
                     helpText=""
      />
      {locals.inputs.underlyingCryptoPlatform}

      <LabelWithHelp fieldLabel="Existence of bonus"
                     helpText=""
      />
      {locals.inputs.bonus}

      <LabelWithHelp fieldLabel="Existence of bounty"
                     helpText=""
      />
      {locals.inputs.bounty}

      <LabelWithHelp fieldLabel="Affiliate"
                     helpText=""
      />
      {locals.inputs.affiliate}

      <LabelWithHelp fieldLabel="Affiliate amount"
                     helpText=""
      />
      {locals.inputs.affiliateAmount}

      <LabelWithHelp fieldLabel="Main github repository link"
                     helpText=""
      />
      {locals.inputs.githubLink}

      <LabelWithHelp fieldLabel="Slack link"
                     helpText=""
      />
      {locals.inputs.slackLink}

      <LabelWithHelp fieldLabel="Twitter link"
                     helpText=""
      />
      {locals.inputs.twitterLink}

      <LabelWithHelp fieldLabel="Facebook link"
                     helpText=""
      />
      {locals.inputs.facebookLink}

      <LabelWithHelp fieldLabel="Reddit link"
                     helpText=""
      />
      {locals.inputs.redditLink}

      <LabelWithHelp fieldLabel="Blog link"
                     helpText=""
      />
      {locals.inputs.blogLink}

      <LabelWithHelp fieldLabel="Telegram link"
                     helpText=""
      />
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
  icoStatus: null,
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
  runningSocialCampaign: null,
  coFounders: <i className="fa fa-user-circle" aria-hidden="true"></i>,
  countryOfOrigin: null,
  underlyingCryptoPlatform: null,
  bonus: null,
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
      config: {
        addonBefore: addonIcons.projectName
      }
    },
    abbreviation: {},
    officialWebsiteLink: {
      config: {
        addonBefore: addonIcons.officialWebsiteLink
      }
    },
    icoWebsiteLink: {
      config: {
        addonBefore: addonIcons.icoWebsiteLink
      }
    },
    whitePaperLink: {
      config: {
        addonBefore: addonIcons.whitePaperLink
      }
    },
    icoStatus: {},
    projectStatus: {},
    oneSentenceExplanation: {
      type: 'textarea',
      help: <i>It should be short descriptive explanation. Should be short enough to use in 1 tweet.</i>,
      config: {
        addonBefore: addonIcons.oneSentenceExplanation
      }
    },
    mediumLengthDescription: {
      type: 'textarea',
      attrs: {
        rows:5
      },
      config: {
        addonBefore: addonIcons.mediumLengthDescription
      }
    },
    icoStartDatetime: {
      factory: DateTimeStart
    },
    icoEndDatetime: {
      factory: DateTimeEnd
    },
    icoEvents: {
      disableOrder: true,
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
    maxSupply: {},
    fundKeeper: {},
    runningSocialCampaign: {},
    coFounders: {
      config: {
        addonBefore: addonIcons.coFounders
      }
    },
    countryOfOrigin: {},
    underlyingCryptoPlatform: {},
    bonus: {},
    bounty: {},
    affiliate: {},
    affiliateAmount: {},

    githubLink: {
      config: {
        addonBefore: addonIcons.githubLink
      }
    },
    slackLink: {
      config: {
        addonBefore: addonIcons.slackLink
      }
    },
    twitterLink: {
      config: {
        addonBefore: addonIcons.twitterLink
      }
    },
    facebookLink: {
      config: {
        addonBefore: addonIcons.facebookLink
      }
    },
    redditLink: {
      config: {
        addonBefore: addonIcons.redditLink
      }
    },
    blogLink: {
      config: {
        addonBefore: addonIcons.blogLink
      }
    },
    telegramLink: {
      config: {
        addonBefore: addonIcons.telegramLink
      }
    }
  }
};

export default class IcoForm extends React.Component{
  constructor (props) {
    super(props);
    const icoEntityValue = this.props.icoEntityValue || {};
  }

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
    // validate a field on every change
    const formComponent = this.refs.icoForm.getComponent(path);
    if (formComponent) {
      formComponent.validate();
    }
  }


  render() {
    let icoForm;
    if (this.props.editMode) {
      icoForm = <Form ref="icoForm" type={IcoType} options={renderOptions} value={this.props.icoEntityValue}
                      onChange={this.onChange.bind(this)} />
    } else {
      icoForm= <Form ref="icoForm" type={IcoType} options={renderOptions} onChange={this.onChange.bind(this)} />
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
              <Button onClick={this.save.bind(this)} bsStyle="primary">Save and publish</Button>
              <Button onClick={this.saveConcept.bind(this)} bsStyle="default">Save a concept</Button>
            </ButtonToolbar>
          </div>
        </div>

      </div>
    );
  }

};


