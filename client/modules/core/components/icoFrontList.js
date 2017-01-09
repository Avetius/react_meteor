import { ListGroup, Tabs, Tab, Form, FormGroup, ControlLabel, FormControl } from '@sketchpixy/rubix';
import IcoShortItem from './icoShortItem';
import IcoStatus from '/lib/icoStatus';
import AppUtils from '/lib/appUtils';

import _ from 'lodash';

export default class IcoFrontList extends React.Component  {

  constructor (props) {
    super(props);
    this.state = {
      activeTab: 'ongoing',
      showTestData: false
    };
  }

  getOngoingIcoEntities () {
    return _.filter(_.filter(this.props.icoEntities, IcoStatus.isOngoing), AppUtils.getProdPredicate(!this.state.showTestData));
  }

  getUpcomingIcoEntities () {
    return _.filter(_.filter(this.props.icoEntities, IcoStatus.isUpcoming), AppUtils.getProdPredicate(!this.state.showTestData));
  }

  getFinishedIcoEntities () {
    return _.filter(_.filter(this.props.icoEntities, IcoStatus.isFinished), AppUtils.getProdPredicate(!this.state.showTestData));
  }

  getIcoEntitiesWithoutDate () {
    return _.filter(_.filter(this.props.icoEntities, IcoStatus.isWithoutDate), AppUtils.getProdPredicate(!this.state.showTestData));
  }

  getScamOrSuspiciousIcos () {
    return _.filter(_.filter(this.props.icoEntities, IcoStatus.isScamOrSuspicious), AppUtils.getProdPredicate(!this.state.showTestData));
  }

  handleSelect(selectedKey) {
    this.setState({ activeTab: selectedKey });
  }

  showTestData () {
    this.setState({ showTestData: !this.state.showTestData });
  }

  render () {
    const ongoingTitle = `Ongoing (${this.props.categoryCounts[this.props.mode].ongoing})`;
    const upcomingTitle = `Upcoming (${this.props.categoryCounts[this.props.mode].upcoming})`;
    const finishedTitle = `Finished (${this.props.categoryCounts[this.props.mode].finished})`;
    const withoutDateTitle = `Without Date (${this.props.categoryCounts[this.props.mode]['without-date']})`;
    const scamOrSuspiciousTitle = `Scam or suspicious (${this.props.categoryCounts[this.props.mode]['scam-or-suspicious']})`;

    return (
      <div className="margin-top-md">

        <div className="row">
          <div className="col-xs-12 col-md-2">
            <div className="checkbox">
              <label>
                <input type="checkbox"
                     checked={this.state.showTestData} onChange={this.showTestData.bind(this)} disabled />
                Show Test only
              </label>
            </div>
          </div>
        </div>

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

          { this.props.mode === 'concepts' ?

            <Tab eventKey={'no-date'} title={withoutDateTitle}>

              <h3>Without dates ICO</h3>
              <ListGroup componentClass="ul">
                {
                  this.getIcoEntitiesWithoutDate().map((icoEntity) => {
                    return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
                  })}
              </ListGroup>

            </Tab>
          : ''
          }

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
