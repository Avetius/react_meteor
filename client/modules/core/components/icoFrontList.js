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

  handleSelect(selectedKey) {
    this.setState({ activeTab: selectedKey });
  }

  showTestData () {
    this.setState({ showTestData: !this.state.showTestData });
  }

  render () {
    return (
      <div className="margin-top-md">

        <div className="row">
          <div className="col-xs-12 col-md-2">
            <div className="checkbox">
              <label>
                <input type="checkbox"
                     checked={this.state.showTestData} onChange={this.showTestData.bind(this)} />
                Show Test only
              </label>
            </div>
          </div>
        </div>

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
