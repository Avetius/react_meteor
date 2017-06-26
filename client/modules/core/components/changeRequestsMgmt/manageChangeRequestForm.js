import React from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;

import _ from 'lodash';
// Rubix theme
import { Modal, ButtonToolbar, Button } from '@sketchpixy/rubix';

import { IcoType } from '/lib/icoProjectDefShared';
import IcoFieldsRenderOptions from '../icoMgmt/icoFieldsRenderOptions';
import UsersMgmtShared from '/lib/usersMgmtShared';

export default class ManageChangeRequestForm extends React.Component {

  constructor () {
    super();
    this.state = {
      showDeleteModal: false,
      formErrors: null
    }
  }

  approveChangeRequest () {
    this.props.approveChangeRequest(this.props.changeRequest._id);
  }

  rejectApproved  () {
    this.props.rejectApproved(this.props.changeRequest._id);
  }

  rejectChangeRequest () {
    this.props.rejectChangeRequest(this.props.changeRequest._id);
  }

  approveRejected () {
    this.props.approveRejected(this.props.changeRequest._id);
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
    const fields = _.keys(this.props.changeRequest.fields);
    const formLayout = (locals) => {
      return (
        <div>
          {locals.inputs.slugUrlToken}
          {fields.map((field) => {
            return locals.inputs[field];
          })}
        </div>
      );
    };

    const renderOptions = {
      template: formLayout,
      auto: 'placeholders',
      fields: IcoFieldsRenderOptions
    };
    let icoForm, saveButtons;
    if (this.props.changeRequest) {
      icoForm= <Form ref="icoForm" type={IcoType} options={renderOptions}
                     context={{editMode: false}} onChange={this.onChange.bind(this)} value={this.props.icoEntityValue} />;
      saveButtons =
        <div className="row">
          <div className="col-xs-6">
            {!this.props.changeRequest.approved && !this.props.changeRequest.rejected ?
              <div><button onClick={this.approveChangeRequest.bind(this)} className="btn btn-primary margin-horizontal-md">Approve</button>
              <button onClick={this.rejectChangeRequest.bind(this)} className="btn btn-danger margin-horizontal-md">Reject</button></div> :
              this.props.changeRequest.approved ?
              <button onClick={this.rejectApproved.bind(this)} className="btn btn-danger margin-horizontal-md">
                Restore previous version</button> :
              <button onClick={this.approveRejected.bind(this)} className="btn btn-danger margin-horizontal-md">Reapprove</button>
            }
          </div>
        </div>;
    }

    return (
      <div>

        <div className="row">
          <div className="col-md-10">
            { UsersMgmtShared.isCurrentUserSuperAdmin() ? <h3>View change request</h3> : <h3>Manage change request</h3>}
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
            {UsersMgmtShared.isCurrentUserSuperAdmin() ?
              <ButtonToolbar>
                {saveButtons}
              </ButtonToolbar> : ""
            }
          </div>
        </div>

      </div>
    );
  }

};
