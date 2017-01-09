import { ListGroup, Tabs, Tab, Form, FormGroup, ControlLabel, FormControl } from '@sketchpixy/rubix';
import IcoShortItem from './icoShortItem';
import IcoStatus from '/lib/icoStatus';
import AppUtils from '/lib/appUtils';

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

  getScamOrSuspiciousIcos () {
    return _.filter(this.props.icoEntities, IcoStatus.isScamOrSuspicious);
  }

  handleSelect(selectedKey) {
    this.setState({ activeTab: selectedKey });
  }

  render () {
    const ongoingTitle = `Ongoing (${this.props.categoryCounts[this.props.mode].ongoing})`;
    const upcomingTitle = `Upcoming (${this.props.categoryCounts[this.props.mode].upcoming})`;
    const finishedTitle = `Finished (${this.props.categoryCounts[this.props.mode].finished})`;
    const scamOrSuspiciousTitle = `Scam or suspicious (${this.props.categoryCounts[this.props.mode]['scam-or-suspicious']})`;

    return (
      <div className="margin-top-md">

        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect.bind(this)} id="controlled-tab">

          <Tab eventKey={'ongoing'} title={ongoingTitle}>

            <h3>Ongoing ICO</h3>
            <ListGroup componentClass="ul">
              {
                this.getOngoingIcoEntities().map((icoEntity) => {
                  return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
                })}
            </ListGroup>

          </Tab>

          <Tab eventKey={'upcoming'} title={upcomingTitle}>

            <h3>Upcoming ICO</h3>
            <ListGroup componentClass="ul">
              {
                this.getUpcomingIcoEntities().map((icoEntity) => {
                  return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
                })}
            </ListGroup>

          </Tab>

          <Tab eventKey={'finished'} title={finishedTitle}>

            <h3>Finished ICO</h3>
            <ListGroup componentClass="ul">
              {
                this.getFinishedIcoEntities().map((icoEntity) => {
                  return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
                })}
            </ListGroup>

          </Tab>

          <Tab eventKey={'scam-suspicious'} title={scamOrSuspiciousTitle}>

            <h3>Scam or suspicious</h3>
            <ListGroup componentClass="ul">
              {
                this.getScamOrSuspiciousIcos().map((icoEntity) => {
                  return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
                })
              }
            </ListGroup>

          </Tab>

        </Tabs>

      </div>
    );
  }

}
