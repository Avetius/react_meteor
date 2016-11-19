import React from 'react';
import t from 'tcomb-form';

// Rubix theme
import { ButtonToolbar, Button } from '@sketchpixy/rubix';
import {DateTimeStart, DateTimeEnd} from './form/dateTimePicker';

import IcoForm from './form/icoForm';

export default class AddOrEditIco extends React.Component {
  constructor (props) {
    super(props);
    console.log('addOrEditIco cmp: ', props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <IcoForm icoEntityValue={this.props.icoEntity} save={this.props.saveNewIco} saveConcept={this.props.saveAsConcept} />
        </div>
      </div>
    );
  }

};
