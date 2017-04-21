// React
import React from 'react';
import DataValidator from '/lib/dataValidator';

/**
 * cloned from https://github.com/jacted/lead-form
 */
// Capture component
export default class Capture extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: ''
      },
      validationMessage: ''
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (DataValidator.isValidEmailAddress(this.state.form.email)) {
      this.props.onFormSubmit(this.state.form);
    } else {
      this.setState({ validationMessage: 'Please insert proper e-mail address.' });
    }

  }

  handleChange(event) {
    let form = this.state.form;
    form.email = event.target.value;
    this.setState({
      form: form
    });
  }

  render () {
    return (
      <div>

        <div className="leadform-note-title" dangerouslySetInnerHTML={{__html: this.props.info.title}}></div>

        <p dangerouslySetInnerHTML={{__html: this.props.info.content}}></p>

        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="leadform-note-form-group">
            <input type="text" placeholder="Your e-mail" onChange={this.handleChange.bind(this)} />
            {/* fake input field for bots */}
            <input type="text" placeholder="Your e-mail" value="" hidden />
          </div>
          <div className="leadform-note-form-group validation-message">
            { this.state.validationMessage }
          </div>
          <div className="leadform-note-form-group">
            <input type="submit" value={this.props.form.buttonText} />
          </div>
        </form>

      </div>
    )

  }

}
