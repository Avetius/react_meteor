import React from 'react';
// Rubix theme
import { Tab, Row, Col, Nav, NavItem } from '@sketchpixy/rubix';
import {Meteor} from 'meteor/meteor';
import AccountsMgmt from '/lib/accountsMgmt';
import {FlowRouter} from 'meteor/kadira:flow-router';

class Navigation extends React.Component {

  render () {
    let publishedCountStr, conceptsCountStr;
    if (!this.props.globalCounts) {
      publishedCountStr = conceptsCountStr = '';
    } else {
      const publishedCount = this.props.globalCounts.published;
      publishedCountStr = (!publishedCount && publishedCount !== 0) ? '': ` (${publishedCount})`;
      const conceptsCount = this.props.globalCounts.concept;
      conceptsCountStr = (!publishedCount && publishedCount !== 0) ? '' :` (${conceptsCount})`;
    }

    let navigation;
    if (AccountsMgmt.isCurrentUserAdmin()) {
      navigation =
        <Nav bsStyle="pills"
             id="main-nav"
             className='nav-theme-orange padding-vertical-sm padding-horizontal-sm'
             activeKey={this.props.view}>
          <NavItem className="h4" eventKey={'ico.index'} href={FlowRouter.path('ico.index', { subView: 'ongoing' })}>
            <i className="fa fa-list margin-right-sm" aria-hidden="true" />
            ICO index {publishedCountStr}
          </NavItem>
          <NavItem className="h4" eventKey={'ico.favourites'} href="#">
            <i className="fa fa-heart-o margin-right-sm" aria-hidden="true" />
            Favourites
          </NavItem>
          <NavItem className="h4" eventKey={'ico.concepts'} href={FlowRouter.path('ico.concepts', { subView: 'ongoing' })}>
            Concepts {conceptsCountStr}
          </NavItem>
          <NavItem className="h4" eventKey={'404'} href={FlowRouter.path('404')}>
            404
          </NavItem>
          <NavItem className="h4" eventKey={'ico.add'} href={FlowRouter.path('ico.add')}>
            Add
          </NavItem>
        </Nav>
    } else {
      navigation =
        <Nav bsStyle="pills" className='nav-theme-orange padding-vertical-sm padding-horizontal-sm'
           id="main-nav"
           activeKey={this.props.view}>
          <NavItem className="h4" eventKey={'ico.index'} href={FlowRouter.path('ico.index', { subView: 'ongoing' })}>
            <i className="fa fa-bars margin-right-sm" aria-hidden="true" />
            ICO index {publishedCountStr}
          </NavItem>
          <NavItem className="h4" eventKey={'ico.favourites'} href="#">
            <i className="fa fa-heart-o margin-right-sm" aria-hidden="true" />
            Favourites
          </NavItem>
        </Nav>;
    }

    let subNavigation;
    if (this.props.subNav) {
      const ongoingTitle = `Ongoing (${this.props.subNav.categoryCounts.ongoing})`;
      const upcomingTitle = `Upcoming (${this.props.subNav.categoryCounts.upcoming})`;
      const finishedTitle = `Finished (${this.props.subNav.categoryCounts.finished})`;
      const scamTitle = `Scam (${this.props.subNav.categoryCounts.scam})`;
      const suspiciousTitle = `Suspicious (${this.props.subNav.categoryCounts.suspicious})`;

      subNavigation =
        <div className="row fg-tab-active-theme-darkblue">
          <div className="col-md-10 col-md-push-1">
            <Nav bsStyle="tabs"
                 className="padding-horizontal-sm tab-brightblue margin-bottom-negative-1"
                 activeKey={this.props.subNav.subView}>
              <NavItem className="" eventKey={'ongoing'} href={FlowRouter.path(this.props.subNav.view, { subView: 'ongoing' })}>
                <i className="fa fa-clock-o margin-right-sm" aria-hidden="true" />
                <strong>{ongoingTitle}</strong>
              </NavItem>
              <NavItem eventKey={'upcoming'} href={FlowRouter.path(this.props.subNav.view, { subView: 'upcoming' })}>
                <i className="fa fa-arrow-up margin-right-sm" aria-hidden="true" />
                <strong>{upcomingTitle}</strong>
              </NavItem>
              <NavItem eventKey={'finished'} href={FlowRouter.path(this.props.subNav.view, { subView: 'finished' })}>
                <i className="fa fa-check-square-o margin-right-sm" aria-hidden="true" />
                <strong>{finishedTitle}</strong>
              </NavItem>
              <NavItem className="pull-right" eventKey={'scam'} href={FlowRouter.path(this.props.subNav.view, { subView: 'scam' })}>
                <i className="fa fa-exclamation-triangle margin-right-sm" aria-hidden="true" />
                <em>{scamTitle}</em>
              </NavItem>
              <NavItem className="pull-right" eventKey={'suspicious'} href={FlowRouter.path(this.props.subNav.view, { subView: 'suspicious' })}>
                <i className="fa fa-question-circle margin-right-sm" aria-hidden="true" />
                <em>{suspiciousTitle}</em>
              </NavItem>
            </Nav>
          </div>
        </div>
    }



    return (
      <div>
        <div>{navigation}</div>
        <div>{subNavigation}</div>
      </div>
    );
  }
}

export default Navigation;
