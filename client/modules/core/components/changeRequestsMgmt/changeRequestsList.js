import React from 'react';
import { Tabs, Tab } from '@sketchpixy/rubix';
import ChangeRequestsTable from './changeRequestsTable'

export default class ChangeRequestsList extends React.Component {
  render() {
    const changeRequests = this.props.changeRequests;
    const newRequests = changeRequests.filter((changeRequest) => {
      return !changeRequest.approved && !changeRequest.rejected && !changeRequest.published;
    });
    const approved = changeRequests.filter((changeRequest) => {
      return changeRequest.approved;
    });
    const rejected = changeRequests.filter((changeRequest) => {
      return changeRequest.rejected;
    });
    const published = changeRequests.filter((changeRequest) => {
      return changeRequest.published && changeRequest.publishRequest;
    });

    return (
      <Tabs defaultActiveKey={1} id="change-requests-tab">
        <Tab eventKey={1} title={`New (${newRequests.length})`}>
          <ChangeRequestsTable changeRequests={newRequests} type="new"/>
        </Tab>
        <Tab eventKey={2} title={`Rejected (${rejected.length})`}>
          <ChangeRequestsTable changeRequests={rejected} type="rejected"/>
        </Tab>
        <Tab eventKey={3} title={`Approved (${approved.length})`}>
          <ChangeRequestsTable changeRequests={approved} type="approved"/>
        </Tab>
        <Tab eventKey={4} title={`Published (${published.length})`}>
          <ChangeRequestsTable changeRequests={published} type="published"/>
        </Tab>
      </Tabs>
    );
  }
}