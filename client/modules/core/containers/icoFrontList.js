import { ListGroup } from '@sketchpixy/rubix';



class icoFrontItem extends React.Component {
  render() {
    return (
      <li
        className="list-group-item"
        onClick={() => {}}>
        {this.props.children}
      </li>
    );
  }
}


export const icoFrontList = (props) => {
  return (
    <ListGroup componentClass="div">

    </ListGroup>
  );
};

