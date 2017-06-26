import React from 'react';
import _ from 'lodash'
import {FlowRouter} from 'meteor/kadira:flow-router';

import IcoPublicForm from './icoMgmt/icoPublicForm';

export default class EditPublicIco extends React.Component {
  constructor(props) {
    super(props);
  }

  // todo extract this method to separate object and as a static method
  extractIcoPublicFormValue(icoEntity) {
    // todo whitelist instead of blacklist
    return _.omit(icoEntity, 'entityState', 'meta', '_id', 'createdAt', 'updatedAt');
  }

  render() {
    // tCombForm doesn't need this but we're defensive
    const icoPublicFormValue = this.extractIcoPublicFormValue(this.props.icoEntity);

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
                  <IcoPublicForm icoEntityValue={icoPublicFormValue}
                                 edit={this.props.saveEditedIco}
                                 icoId={this.props.icoId}
                                 sendChangeRequest={this.props.sendChangeRequest}
                                 published={this.props.published}
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
