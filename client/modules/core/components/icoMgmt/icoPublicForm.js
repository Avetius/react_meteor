import React from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;

import _ from 'lodash';
// Rubix theme
import { Modal, ButtonToolbar, Button } from '@sketchpixy/rubix';

import { IcoType } from '/lib/icoProjectDefShared';
import CsvImportUploader from './../form/csvImportUploader';
import IcoFieldsRenderOptions from './icoFieldsRenderOptions';

const formLayout = (locals) => {
    return (
        <div>
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

            {locals.inputs.mediumLengthDescription}

            {locals.inputs.icoStartDatetime}

            {locals.inputs.icoStartDatetimeFormat}

            {locals.inputs.icoEndDatetime}

            {locals.inputs.icoEndDatetimeFormat}

            {locals.inputs.icoEvents}

            {locals.inputs.fundKeeper}
            {locals.inputs.fundKeeperDetails}

            {locals.inputs.coFounders}

            {locals.inputs.countryOfOrigin}

            {locals.inputs.underlyingCryptoPlatform}


            <h4>Marketing section</h4>

            {locals.inputs.githubLink}

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

            {locals.inputs.pricePerCoinUSD}
            {locals.inputs.pricePerCoinBTC}
            {locals.inputs.pricePerCoinETH}

            {locals.inputs.maxCurrencySupply}

            {locals.inputs.tradingOnExchangeDatetime}
            {locals.inputs.tradingOnExchangeDatetimeFormat}
            {locals.inputs.tradingOnExchanges}

            <h4>Technical details section</h4>

            {locals.inputs.icoSharedBitcoinAddress}

            {locals.inputs.icoSharedEthereumAddress}
        </div>
    );
};

const renderOptions = {
    template: formLayout,
    auto: 'placeholders',
    fields: IcoFieldsRenderOptions
};

export default class IcoPublicForm extends React.Component {

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
            this.props.edit(this.props.icoId, value);
        } else {
            const validationResult = this.refs.icoForm.validate();
            this.showErrorMessages(validationResult);
            console.warn('upps, something happened. Validation failed?');
        }
    }

    close () {
        this.setState({showDeleteModal: false});
    }

    submitForApproval () {
        const value = this.refs.icoForm.getValue();
        if (value) {
            this.hideErrorMessages();
            //right now same as preview
            this.props.sendChangeRequest(this.props.icoId, value, true);
            this.edit();
        } else {
            console.warn('upps, something happened. Validation failed?');
            const validationResult = this.refs.icoForm.validate();
            this.showErrorMessages(validationResult);
        }
    }

    sendChangeRequest () {
      const value = this.refs.icoForm.getValue();
      if (value) {
        this.props.sendChangeRequest(this.props.icoId, value);
      } else {
        console.warn('upps, something happened. Validation failed?');
        const validationResult = this.refs.icoForm.validate();
        this.showErrorMessages(validationResult);
      }
    }

    preview () {
      this.edit();
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
            icoForm = <Form ref="icoForm" type={IcoType} options={renderOptions} value={this.props.icoEntityValue}
                            context={{editMode: true}} onChange={this.onChange.bind(this)}/>;
            saveButtons =
                <div className="row">
                    <div className="col-md-8 margin-top-md margin-left-md">
                      { this.props.published ?
                        <button onClick={this.sendChangeRequest.bind(this)} className="btn btn-primary margin-right-xs">
                            Send change request</button> :
                        <div>
                            <button onClick={this.submitForApproval.bind(this)}
                                className="btn btn-primary margin-horizontal-md">Submit ICO for approval</button>
                            <button onClick={this.preview.bind(this)} className="btn btn-primary margin-horizontal-md">Save as a concept</button>
                        </div>
                      }
                    </div>
                </div>;
        return (
            <div>

                <div className="row">
                    <div className="col-md-10">
                        <h3>Edit ICO</h3>
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

            </div>
        );
    }

};
