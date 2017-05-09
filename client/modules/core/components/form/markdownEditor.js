import React from 'react';

import RichTextEditor from 'react-rte';
import t from 'tcomb-form';

/**
 * TODO: not used now -- test this more at http://react-rte.org/demo but it seems this is not working for some things, like:
 * citation '>'
 */
export default class MarkDownEditor extends t.form.Component {

  //constructor() {
  //  super();
  //  this.state = {
  //    value: RichTextEditor.createEmptyValue()
  //  };
  //}
  //
  //onChange = (value) => {
  //  this.setState({value});
  //  if (this.props.onChange) {
  //    // Send the changes up to the parent component as an HTML string.
  //    // This is here to demonstrate using `.toString()` but in a real app it
  //    // would be better to avoid generating a string on each change.
  //    this.props.onChange(
  //      value.toString('html')
  //    );
  //  }
  //};
  //
  //getTemplate() {
  //  return (locals) => {
  //    console.log(locals.value);
  //    return (
  //      <RichTextEditor value={this.state.value}
  //                      onChange={this.onChange} />
  //    );
  //  }
  //}
}
