// React
import React from 'react';

/**
 * cloned from https://github.com/jacted/lead-form
 */
// Error component
export default class ErrorCmp extends React.Component {

  render () {

    return (
      <div>

        <div className="leadform-note-title" dangerouslySetInnerHTML={{__html: this.props.error.title}}></div>

        <div dangerouslySetInnerHTML={{__html: this.props.error.content}}></div>

      </div>
    )

  }

}
