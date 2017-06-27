// form library
import t from 'tcomb-form';
// react-datetime picker
import '/node_modules/react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import Constants from '/client/configs/constants';

class DateTimePicker extends t.form.Component { // extend the base class

  getTemplate() {

    return (locals) => {
      this.interceptedOnChange = locals.onChange.bind(locals);
      let valueToDisplay = locals.value;

      if (new Date(valueToDisplay).getTime() === Constants.pseudoDateTimeInFuture) {
        valueToDisplay = null;
      }
      let customProps = this.customProps || {};
      if (this.props.options && this.props.options.disabled) {
        customProps.disabled = true;
      }
      return (
        <div className={'form-group' + (locals.hasError ? ' has-error': '')}>
          <label className="control-label">{locals.label}</label>
          <Datetime value={valueToDisplay}
                    onChange={this.interceptorOnChange.bind(this)}
                    inputProps={customProps}
          />
          { (this.state && this.state.UTCRenderedDateTime) ?
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





