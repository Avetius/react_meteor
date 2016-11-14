// form library
import t from 'tcomb-form';
// react-datetime picker
import '/node_modules/react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';


class DateTimePicker extends t.form.Component { // extend the base class

  getTemplate() {
    return (locals) => {
      this.interceptedOnChange = locals.onChange;
      return (
        <div className="form-group">
          <Datetime value={locals.value} onChange={this.interceptorOnChange.bind(this)} inputProps={this.inputProps} />
          {this.props.inputProps}
        </div>
      );
    };
  };

  interceptorOnChange (val) {
    console.log('changed val:', val.toDate());
    this.interceptedOnChange(val.toDate());
  };

}

export class DateTimeStart extends DateTimePicker  {
  constructor(props) {
    super(props);
    this.inputProps = { placeholder: 'Start Date Time' };
  }
}

export class DateTimeEnd extends DateTimePicker  {
  constructor(props) {
    super(props);
    this.inputProps = { placeholder: 'End Date Time' };
  }
}





