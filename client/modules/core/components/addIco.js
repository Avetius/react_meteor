import React from 'react';
import t from 'tcomb-form';

// Rubix theme
import { ButtonToolbar, Button } from '@sketchpixy/rubix';
import {DateTimeStart, DateTimeEnd} from './form/dateTimePicker';

import IcoForm from './form/icoForm';

export default class AddIco extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <IcoForm />
        </div>
      </div>
    );
  }

};
