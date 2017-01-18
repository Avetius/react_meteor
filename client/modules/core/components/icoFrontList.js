import { ListGroup } from '@sketchpixy/rubix';
import IcoShortItem from './icoShortItem';

export default class IcoFrontList extends React.Component  {

  render () {
    let note;
    if (this.props.subView === 'scam') {
      note =
        <div className="row">
          <div className="col-md-12">
            <h4>Why are these projects scam?</h4>
            <p>
              <em>
                Why are these projects scam. Why are these projects scam. Why are these projects scam.
                Why are these projects scam. Why are these projects scam. Why are these projects scam.
                Why are these projects scam.
              </em>
            </p>
          </div>
        </div>
    }
    if (this.props.subView === 'suspicious') {
      note =
        <div className="row">
          <div className="col-md-12">
            <h4>Why are these projects suspicious?</h4>
            <p>
              <em>
                Why are these projects suspicious. Why are these projects suspicious. Why are these projects suspicious.
                Why are these projects suspicious. Why are these projects suspicious. Why are these projects suspicious.
                Why are these projects suspicious.
              </em>
            </p>
          </div>
        </div>
    }

    return (
      <div className="margin-top-md">
        { note }
        <ListGroup componentClass="ul">
          {
            this.props.icoEntities.map((icoEntity) => {
              return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
            })
          }
        </ListGroup>

      </div>
    );
  }

}
