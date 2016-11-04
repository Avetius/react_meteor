import React from 'react';
import t from 'tcomb-form';

// Rubix theme
import { ButtonToolbar, Button } from '@sketchpixy/rubix';

// form data model definitions
const icoStatus = t.enums({
  ongoing: 'Ongoing',
  upcoming: 'Upcoming',
  finished: 'Finished'
});

const projectStatus = t.enums({
  concept: 'Concept',
  workingPrototype: 'Working prototype',
  privateDemo: 'Private demo',
  publicDemo: 'publicDemo',
  Live: 'Live'
});

const Ico = t.struct({
  projectName: t.Str, // two string properties
  abbreviation: t.Str,
  officialWebsiteLink: t.Str,
  icoWebsiteLink: t.Str,
  icoStatus: icoStatus,
  projectStatus: projectStatus,
  oneSentenceExplanation: t.maybe(t.Str),
  icoStartDate: t.Str,
  icoEndDate: t.Date
});

const Form = t.form.Form;

// a `date` input wants a yyyy-MM-dd format
function formatDate(v) {
  if (!v || t.String.is(v)) {
    return v;
  }
  let MM = (v.getMonth() + 1) + '';
  if (MM.length < 2) {
    MM = '0' + MM;
  }
  let dd = v.getDate() + '';
  if (dd.length < 2) {
    dd = '0' + dd;
  }
  return `${v.getFullYear()}-${MM}-${dd}`;
}

const renderOptions = {
  auto: 'placeholders',
  fields: {
    icoStartDate: {
      factory: t.form.Textbox,  // <= displays a textbox instead of the default component
      transformer: {            // <= required in order to handle the `date` input format
        format: formatDate,
        parse: (s) => s ? new Date(s) : null
      },
      type: 'date' // <= HTML5 attribute
    }
  }
};


const AddIco = React.createClass({
  save() {
    // call getValue() to get the values of the form
    var value = this.refs.icoForm.getValue();
    // if validation fails, value will be null
    if (value) {
      // value here is an instance of Person
      console.log('value:', value);
    }
  },

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            <Form
              ref="icoForm"
              type={Ico}
              options={renderOptions}
            />
          </div>
        </div>
        <ButtonToolbar>
          <Button onClick={this.save} bsStyle="primary">Save and publish</Button>
          <Button bsStyle="default">Save a concept</Button>
        </ButtonToolbar>
      </div>
    );
  }

});

export default AddIco;
