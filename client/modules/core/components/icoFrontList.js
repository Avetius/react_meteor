import { ListGroup } from '@sketchpixy/rubix';
import IcoShortItem from './icoShortItem';

export default class IcoFrontList extends React.Component  {

  render () {

    return (
      <div className="margin-top-md">

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
