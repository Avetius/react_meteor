import React from 'react';
import t from 'tcomb-form';
var _ = require('lodash');

// Rubix theme
import { ButtonToolbar, Button } from '@sketchpixy/rubix';
import {DateTimeStart, DateTimeEnd} from './form/dateTimePicker';

import IcoForm from './form/icoForm';

export default class AddOrEditIco extends React.Component {
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

          { this.props.error ? (
            <div className="alert alert-danger">
              <h3>{this.props.errorMessage}</h3>
            </div>
          ) : (
            <IcoForm icoEntityValue={icoFormValue}
                     edit={this.props.saveEditedIco}
                     addAsConcept={this.props.addAsConcept}
                     editMode={this.props.editMode}
                     deleteIco={this.props.deleteIco}
            />
          )
          }

        </div>
      </div>
    );
  }

};
