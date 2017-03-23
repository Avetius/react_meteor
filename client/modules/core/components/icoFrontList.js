import { ListGroup } from '@sketchpixy/rubix';
import IcoShortItem from './icoShortItem';
import Waypoint from 'react-waypoint';

export default class IcoFrontList extends React.Component  {

  loadMore () {
    this.props.loadMore();
  }

  render () {
    let note, subViewTitle;

    if (this.props.subView === 'ongoing') {
      subViewTitle = <h3 className="margin-top-xs">Ongoing Initial Coin Offerings</h3>;
    } else if (this.props.subView === 'upcoming') {
      subViewTitle = <h3 className="margin-top-xs">Upcoming Initial Coin Offerings</h3>;
    } else if (this.props.subView === 'finished') {
      subViewTitle = <h3 className="margin-top-xs">Finished Initial Coin Offerings</h3>;
    } else if (this.props.subView === 'scam') {
      subViewTitle = <h3 className="margin-top-xs">Scam Initial Coin Offerings</h3>;

      note =
        <div className="row">
          <div className="col-md-12">
            <h4>Why are these projects scam?</h4>
            <p>
              <em>
                Projects in this category are missing critical information.
                In the details of each project you can find concrete reasons why we consider the project to be a scam.
                We discourage people from wasting money on these projects.
              </em>
            </p>
          </div>
        </div>;
    } else if (this.props.subView === 'suspicious') {
      subViewTitle = <h3 className="margin-top-xs">Suspicious Initial Coin Offerings</h3>;

      note =
        <div className="row">
          <div className="col-md-12">
            <h4>Why are these projects suspicious?</h4>
            <p>
              <em>
                Projects in this category did not provide enough information to be listed in the main category.
                In the details of each project you can find concrete reasons why we consider the project to be suspicious.
              </em>
            </p>
          </div>
        </div>;
    }

    return (
      <div>
        { subViewTitle }
        { note }
        <ListGroup componentClass="ul">

          {
            this.props.icoEntities.map((icoEntity) => {
              return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
            })
          }

          <Waypoint scrollableAncestor={window}
                     onEnter={this.loadMore.bind(this)}
                     bottomOffset='-500px'>
            <div></div>
          </Waypoint>

        </ListGroup>
      </div>
    );
  }

}
