import React from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;

import _ from 'lodash';
// Rubix theme
import {ButtonToolbar} from '@sketchpixy/rubix';

import {AddIcoAdmin} from '/lib/addIcoAdmin';

const formLayout = (locals) => {
  return (
    <div>
      {locals.inputs.adminEmail}
      {locals.inputs.slugUrlToken}

    </div>
  );
};

const renderOptions = {
  template: formLayout,
  auto: 'placeholders',
  fields: {
    slugUrlToken: {
      legend: 'Slug URL token',
    },
    adminEmail: {
      legend: 'Email of ICO manager'
    },
  }
};

export default class AddDeleteIcoManager extends React.Component {

  constructor() {
    super();
    this.state = {
      showDeleteModal: false,
      formErrors: null,
      successMessage: null
    }
  }

  resetForm() {
    this.setState({value: null});
  }

  add() {
    this.hideSuccessMessage();
    const value = this.refs.AddDeleteIcoManagerForm.getValue();
    if (value) {
      this.hideErrorMessages();
      this.props.addIcoManager(value.adminEmail, value.slugUrlToken);
      this.resetForm();
      this.setState({successMessage: 'Successfully added'});
    } else {
      const validationResult = this.refs.AddDeleteIcoManagerForm.validate();
      this.showErrorMessages(validationResult);
      console.warn('upps, something happened. Validation failed?');
    }

  }

  delete() {
    this.hideSuccessMessage();
    const value = this.refs.AddDeleteIcoManagerForm.getValue();
    if (value) {
      this.hideErrorMessages();
      this.props.deleteIcoManager(value.adminEmail, value.slugUrlToken);
      this.resetForm();
      this.setState({successMessage: 'Successfully delated'});
    } else {
      const validationResult = this.refs.AddDeleteIcoManagerForm.validate();
      this.showErrorMessages(validationResult);
      console.warn('upps, something happened. Validation failed?');
    }
  }

  onChange() {
    if (this.state.successMessage) {
      this.hideSuccessMessage();
    }
  }

  showErrorMessages(validationResult) {
    const messages = _.map(validationResult.errors, (errorObj) => {
      let messageObj = _.pick(errorObj, ['message']);
      messageObj.key = errorObj.path[0];
      return messageObj;
    });
    this.setState({formErrors: messages});
  }

  hideErrorMessages() {
    this.setState({formErrors: null});
  }

  hideSuccessMessage() {
    this.setState({successMessage: null});
  }

  render() {
    let icoForm;
    icoForm = <Form ref="AddDeleteIcoManagerForm" options={renderOptions} type={AddIcoAdmin}
                    context={{editMode: true}} onChange={this.onChange.bind(this)}/>;

    return (
      <div>

        <div className="row">
          <div className="col-md-10">
            <h3>Add or delete ICO Admin</h3>
            {icoForm}
          </div>
        </div>

        <div className="row">
          <div className="col-md-10">
            { this.state.formErrors ?
              this.state.formErrors.map((errMessage) => {
                return (
                  <h5 key={errMessage.key} className="text-danger">
                    <strong>{errMessage.message}</strong></h5>
                );
              })
              : ''
            }
            { this.state.successMessage ?
              <h5 className="text-success">
                <strong>{this.state.successMessage}</strong></h5>
              : ''
            }
          </div>
        </div>

        <div className="row margin-vertical-md">
          <div className="col-md-10">
            <ButtonToolbar>
              <div className="row">
                <div className="col-xs-6">
                  <button onClick={this.add.bind(this)}
                          className="btn btn-primary margin-horizontal-md">Add ICO admin
                  </button>
                  <button onClick={this.delete.bind(this)}
                          className="btn btn-primary margin-horizontal-md">Remove ICO admin
                  </button>
                </div>
              </div>

            </ButtonToolbar>
          </div>
        </div>

      </div>
    );
  }
}


