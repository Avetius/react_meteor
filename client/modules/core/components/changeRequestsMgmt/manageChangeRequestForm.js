import React from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;

import _ from 'lodash';
// Rubix theme
import {Modal, ButtonToolbar, Button} from '@sketchpixy/rubix';

import {ChangeRequestType} from '/lib/icoProjectDefShared';
import IcoFieldsRenderOptions from '../icoMgmt/icoFieldsRenderOptions';
import UsersMgmtShared from '/lib/usersMgmtShared';

export default class ManageChangeRequestForm extends React.Component {

  constructor() {
    super();
    this.state = {
      showDeleteModal: false,
      formErrors: null,
      renderOptions: null,
      showOldValues: false
    }
  }

  componentDidMount() {
    this.createChangeRequestFieldsRenderOptions();
  }

  approveChangeRequest() {
    this.props.approveChangeRequest(this.props.changeRequest._id);
  }

  rejectApproved() {
    this.props.rejectApproved(this.props.changeRequest._id);
  }

  rejectChangeRequest() {
    this.props.rejectChangeRequest(this.props.changeRequest._id);
  }

  approveRejected() {
    this.props.approveRejected(this.props.changeRequest._id);
  }

  onChange(icoEntityValue, path) {
    // validate a field on every change -- consider implement this in onBlur field event handler
    const formComponent = this.refs.icoForm.getComponent(path);
    if (formComponent) {
      formComponent.validate();
    }
  }

  hideOldValues() {
    this.setState({showOldValues: false});
  }

  showOldValues() {
    this.setState({showOldValues: true});
  }

  createChangeRequestFieldsRenderOptions() {
    const fields = _.keys(this.props.changeRequest.fields);
    const changeRequestFieldsRenderOptions = _.cloneDeep(IcoFieldsRenderOptions);
    _.each(fields, (field) => {
      const oldFieldName = field + '_old';
      let oldFieldOptions = _.assign({}, changeRequestFieldsRenderOptions[field]);
      oldFieldOptions.legend = oldFieldOptions.legend + " (old value)";
      changeRequestFieldsRenderOptions[oldFieldName] = oldFieldOptions;
    });
    _.each(changeRequestFieldsRenderOptions, (option, i) => {
      changeRequestFieldsRenderOptions[i].disabled = true;
    });
    this.setState({renderOptions: changeRequestFieldsRenderOptions});
  }

  render() {
    if (!this.state.renderOptions) {
      return <div></div>;
    }
    const fields = _.keys(this.props.changeRequest.fields);
    const formLayout = (locals) => {
      return (
        <div>
          {locals.inputs.slugUrlToken}
          {fields.map((field, i) => {
            return <div key={i}>
              {locals.inputs[field]}
              {this.state.showOldValues ? <div>
                  {locals.inputs[field + '_old']}
                </div> : ''
              }
            </div>;
          })}
        </div>
      );
    };

    const renderOptions = {
      template: formLayout,
      auto: 'placeholders',
      fields: this.state.renderOptions
    };
    let icoForm, saveButtons;
    if (this.props.changeRequest) {
      icoForm = <Form ref="icoForm" type={ChangeRequestType} options={renderOptions} context={{editMode: false}}
                      onChange={this.onChange.bind(this)} value={this.props.icoEntityValue}/>;
      saveButtons =
        <div className="row">
          <div className="col-xs-6">
            {!this.props.changeRequest.approved && !this.props.changeRequest.rejected ?
              <div>
                <button onClick={this.approveChangeRequest.bind(this)} className="btn btn-primary margin-horizontal-md">
                  Approve
                </button>
                <button onClick={this.rejectChangeRequest.bind(this)} className="btn btn-danger margin-horizontal-md">
                  Reject
                </button>
              </div> :
              this.props.changeRequest.approved ?
                <button onClick={this.rejectApproved.bind(this)} className="btn btn-danger margin-horizontal-md">
                  Restore previous version</button> :
                <button onClick={this.approveRejected.bind(this)} className="btn btn-danger margin-horizontal-md">
                  Reapprove</button>
            }
          </div>
        </div>;
    }

    return (
      <div>

        <div className="row">
          <div className="col-md-10">
            { UsersMgmtShared.isCurrentUserSuperAdmin() ? <h3>View change request</h3> : <h3>Manage change request</h3>}
            <div className="row">
              {this.state.showOldValues ?
                <button onClick={this.hideOldValues.bind(this)} className="btn btn-primary margin-horizontal-md">Hide old values</button> :
                <button onClick={this.showOldValues.bind(this)} className="btn btn-primary margin-horizontal-md">Show old values</button>}
            </div>
            {icoForm}
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
