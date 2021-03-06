import React from 'react';
import t from 'tcomb-form';
var _ = require('lodash');
import {FlowRouter} from 'meteor/kadira:flow-router';

// Rubix theme
import { ButtonToolbar, Button } from '@sketchpixy/rubix';
import {DateTimeStart, DateTimeEnd} from './form/dateTimePicker';

import IcoExtendedForm from './icoMgmt/icoExtendedForm';

export default class EditExtendedIco extends React.Component {
  constructor (props) {
    super(props);
    //console.log('@cmp: this.props ', this.props);
  }

  // todo extract this method to separate object and as a static method
  extractIcoFormValue (icoEntity) {
    // todo whitelist instead of blacklist
    return _.omit(icoEntity, 'entityState', 'meta', '_id', 'createdAt', 'updatedAt');
  }

  render() {
      // tCombForm doesn't need this but we're defensive
    const icoFormValue = this.extractIcoFormValue(this.props.icoEntity);

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
                <IcoExtendedForm icoEntityValue={icoFormValue}
                         edit={this.props.saveEditedIco}
                         addAsConcept={this.props.addAsConcept}
                         editMode={this.props.editMode}
                         icoId={this.props.icoEntity ? this.props.icoEntity._id : ''}
                         deleteIco={this.props.deleteIco}
                         published={this.props.published}
                         sendChangeRequest={this.props.sendChangeRequest}
                         changeRequest={this.props.changeRequest}
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
