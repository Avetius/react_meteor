import React from 'react';
import Waypoint from 'react-waypoint';
import {FlowRouter} from 'meteor/kadira:flow-router';
import _ from 'lodash';

import {RouteSettings} from '../routes';
import actions from '../actions';

export default class GlobalScrollingWaypoint extends React.Component {

  constructor () {
    super();
    this.state = {
      enabled: false
    };
  }

  shouldComponentUpdate () {
    // we don't need to re-render waypoint
    return false;
  }

  reachingPageBottom () {
    // we prevent from process reachingPageBottom method, as react-waypoint call the method after component is mounted (or rendered)
    // more info: https://github.com/brigade/react-waypoint#usage
    if (!this.state.enabled) {
      this.setState({enabled: true});
      return;
    }

    // if scrollable route name is active, lets load more items
    if (_.includes(RouteSettings.infiniteScrollableRoutes, FlowRouter.current().route.name)) {
      actions.icoProject.loadMore(this.props.context);
    }
  }

  render () {
    return <Waypoint scrollableAncestor={window}
              onEnter={this.reachingPageBottom.bind(this)}
              bottomOffset='-500px'>
      <div></div>
    </Waypoint>;
  }
}
