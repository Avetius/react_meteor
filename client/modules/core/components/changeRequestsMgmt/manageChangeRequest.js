import React from 'react';
import t from 'tcomb-form';
var _ = require('lodash');
import {FlowRouter} from 'meteor/kadira:flow-router';

import ManageChangeRequestForm from './manageChangeRequestForm';

export default class ManageChangeRequest extends React.Component {
  constructor (props) {
    super(props);
  }

  extractIcoFormValue (changeRequest) {
    const fields = _.keys(changeRequest.fields);
    let f = {};
    _.forEach(fields, (field) => {
      f[field] = changeRequest.fields[field].newValue;
      f[field + "_old"] = changeRequest.fields[field].oldValue;
    });
    f.slugUrlToken = changeRequest.icoSlug;
    return f;
  }

  render() {
    const icoFormValue = this.extractIcoFormValue(this.props.changeRequest);

    return (
      <div className="row">
        <div className="col-md-12">

          { this.props.userId ?
            <div>
              { this.props.error ? (
                  <div className="alert alert-danger">
                    <h3>{this.props.errorMessage}</h3>
                  </div>
                ) : (
                  <ManageChangeRequestForm icoEntityValue={icoFormValue} changeRequest={this.props.changeRequest}
                           approveChangeRequest={this.props.approveChangeRequest}
                           rejectChangeRequest={this.props.rejectChangeRequest}
                           rejectApproved={this.props.rejectApproved}
                           approveRejected={this.props.approveRejected}
                  />
                )
              }
            </div>
            : <span>Please <a href={FlowRouter.path('ico.management')}>login</a> first.</span>
          }

        </div>
      </div>
    );
  }

};
