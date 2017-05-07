import React from 'react';
import moment from 'moment';
import {FlowRouter} from 'meteor/kadira:flow-router';

import UsersMgmtShared from '/lib/usersMgmtShared';
import IcoShortItemMainRows from './icoShortItemMainRows';
import IcoStatus from '/lib/icoStatus';

export default class IcoFrontItem extends React.Component {

  render() {
    const ico = this.props.icoEntity;

    return (
      <li className="list-group-item padding-top-sm padding-bottom-none margin-bottom-md ico-box">
        <IcoShortItemMainRows ico={this.props.icoEntity} isProfile={false} />
      </li>
    );
  }
}

IcoFrontItem.defaultProps = {
  icoEntity: {
    icoEvents: [],
    coFounders: []
  }
};
