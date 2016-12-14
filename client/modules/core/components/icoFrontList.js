import { ListGroup, Tabs, Tab } from '@sketchpixy/rubix';
import IcoShortItem from './icoShortItem';
import IcoStatus from '/lib/icoStatus';

import _ from 'lodash';

export default class IcoFrontList extends React.Component  {

  constructor (props) {
    super(props);
    this.state = {
      activeTab: 'ongoing'
    };
  }

  getOngoingIcoEntities () {
    return _.filter(this.props.icoEntities, IcoStatus.isOngoing);
  }

  getUpcomingIcoEntities () {
    return _.filter(this.props.icoEntities, IcoStatus.isUpcoming);
  }

  getFinishedIcoEntities () {
    return _.filter(this.props.icoEntities, IcoStatus.isFinished);
  }

  handleSelect(selectedKey) {
    this.setState({ activeTab: selectedKey });
  }

  render () {
    return (
      <div className="margin-top-md">

        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect.bind(this)} id="controlled-tab-example">

          <Tab eventKey={'ongoing'} title="Ongoing">

            <h3>Ongoing</h3>
            <ListGroup componentClass="ul">
              {
                this.getOngoingIcoEntities().map((icoEntity) => {
                  return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
                })}
            </ListGroup>

          </Tab>

          <Tab eventKey={'upcoming'} title="Upcoming">

            <h3>Upcoming</h3>
            <ListGroup componentClass="ul">
              {
                this.getUpcomingIcoEntities().map((icoEntity) => {
                  return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
                })}
            </ListGroup>

          </Tab>

          <Tab eventKey={'finished'} title="Finished">

            <h3>Finished</h3>
            <ListGroup componentClass="ul">
              {
                this.getFinishedIcoEntities().map((icoEntity) => {
                  return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
                })}
            </ListGroup>

          </Tab>
        </Tabs>

      </div>
    );
  }

}
