// form library
import t from 'tcomb-form';
// react-datetime picker
import '/node_modules/react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';


class DateTimePicker extends t.form.Component { // extend the base class

  constructor (props, customProps) {
    super(props);
    this.state = {
      UTCRenderedDateTime: null
    }
  }

  getTemplate() {

    return (locals) => {
      this.interceptedOnChange = locals.onChange.bind(locals);
      let valueToDisplay = locals.value;

      // todo make it constant and move to separate file
      if (new Date(valueToDisplay).getTime() === 2222222222222) {
        valueToDisplay = null;
      }

      console.log(valueToDisplay);
      return (
        <div className={'form-group' + (locals.hasError ? ' has-error': '')}>
          <label className="control-label">{locals.label}</label>
          <Datetime value={valueToDisplay}
                    onChange={this.interceptorOnChange.bind(this)}
                    inputProps={this.customProps}
          />
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
    this.setState({ UTCRenderedDateTime: val.clone().utc() });
    this.interceptedOnChange(val.toDate());
  };

}

export class DateTimeStart extends DateTimePicker  {
  constructor(props) {
    super(props, { placeholder: 'Start Date Time' });
  }
}

export class DateTimeEnd extends DateTimePicker  {
  constructor(props) {
    super(props, { placeholder: 'End Date Time' });
  }
}





