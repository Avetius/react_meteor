import { ListGroup } from '@sketchpixy/rubix';
import IcoShortItem from './icoShortItem';

const IcoFrontList = (props) => {

  return (
    <ListGroup componentClass="ul">
      {
        props.icoEntities.map((icoEntity) => {
        return <IcoShortItem key={icoEntity._id} icoEntity={icoEntity} />
      })}
    </ListGroup>
  );
};

export default IcoFrontList;
