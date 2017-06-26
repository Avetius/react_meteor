import React from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;

import _ from 'lodash';
// Rubix theme
import { Modal, ButtonToolbar, Button } from '@sketchpixy/rubix';

import { IcoType } from '/lib/icoProjectDefShared';
import IcoFieldsRenderOptions from './icoFieldsRenderOptions';
import IcoAdminFormFields from './icoAdminFormFields'
import UsersMgmtShared from '/lib/usersMgmtShared';

const formLayout = (locals) => {
  return (
    <div>
      {/*not needed now: <CsvImportUploader />*/}
      {IcoAdminFormFields.map((fieldsSection, i) => {
        return (
          <div key={i}>
            <h4>{fieldsSection.sectionName}</h4>
            {fieldsSection.fields.map((field) => {
            return locals.inputs[field];
          })}
          </div>);
      })}
    </div>
  );
};

const renderOptions = {
  template: formLayout,
  auto: 'placeholders',
  fields: IcoFieldsRenderOptions
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

  sendChangeRequest () {
    const value = this.refs.icoForm.getValue();
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
      this.props.sendChangeRequest(this.props.editMode.icoId, value);
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
            {/*need check user role too*/}
            { this.props.published && UsersMgmtShared.isCurrentUserContentAdmin() ?
              <button onClick={this.sendChangeRequest.bind(this)} className="btn btn-primary margin-right-xs">Send change request</button>
            : <button onClick={this.edit.bind(this)} className="btn btn-primary margin-right-xs">Save edited ICO</button> }
            <span> Save changes in either case - if it is concept or published ICO.</span>
          </div>
            { UsersMgmtShared.isCurrentUserSuperAdmin() ?
              <div className="col-md-3 margin-top-md margin-left-md">
                <button onClick={this.showModalToDeleteIco.bind(this)} className="btn btn-danger">Delete ICO</button>
              </div> : ''
            }
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


