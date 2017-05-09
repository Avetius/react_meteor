import React from 'react';
import {Meteor} from 'meteor/meteor';

import { ListGroup } from '@sketchpixy/rubix';
import IcoShortItem from './../icoShortItem';

export default class OwnManagedIcos extends React.Component {

  render () {

    return <ListGroup componentClass="ul">

      {
        this.props.icoEntities.map((icoEntity) => {
          return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
        })
      }


    </ListGroup>;

  }
}
