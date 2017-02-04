import { ListGroup } from '@sketchpixy/rubix';
import IcoShortItem from './icoShortItem';
import Infinite from 'react-infinite';

export default class IcoFrontList extends React.Component  {

  loadMore () {
    console.log('loading more icos..');
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
    // note: try compute this value dynamically
    const icoShortItemHeight = 194;
    return (
      <div>
        { subViewTitle }
        { note }
        <ListGroup componentClass="ul">
          <Infinite elementHeight={icoShortItemHeight}
                    onInfiniteLoad={this.loadMore.bind(this)}
                    infiniteLoadBeginEdgeOffset={icoShortItemHeight * 3}
                    useWindowAsScrollContainer>
            {
              this.props.icoEntities.map((icoEntity) => {
                return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
              })
            }
          </Infinite>
        </ListGroup>
      </div>
    );
  }

}
