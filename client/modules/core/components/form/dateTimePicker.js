// form library
import t from 'tcomb-form';
// react-datetime picker
import '/node_modules/react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';


class DateTimePicker extends t.form.Component { // extend the base class

  constructor (props) {
    super(props);
    this.state = {
      UTCRenderedDateTime: null
    }
  }

  getTemplate() {
    //const utcFormattedDatetime =
    return (locals) => {
      this.interceptedOnChange = locals.onChange;
      return (
        <div className="form-group">
          <Datetime value={locals.value} onChange={this.interceptorOnChange.bind(this)} inputProps={this.inputProps} />
          { (this.state.UTCRenderedDateTime) ?
            (<div>
              <i>{`UTC datetime: ${this.state.UTCRenderedDateTime.format("dddd, MMMM Do YYYY, h:mm:ss a")}`}</i>
            </div>)
            : ''
          }
          <div className="help-block margin-vertical-xs"><i>Insert datetime in your local time format.</i></div>
        </div>
      );
    };
  };

  interceptorOnChange (val) {
    //console.log('changed val:', val.format("dddd, MMMM Do YYYY, h:mm:ss a"));
    this.setState({ UTCRenderedDateTime: val.clone().utc() });
    //console.log('changed UTC val:', val.format("dddd, MMMM Do YYYY, h:mm:ss a"));
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





