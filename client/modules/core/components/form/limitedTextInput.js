import t from 'tcomb-form';
import { OneSentenceStr, MediumLengthDescription, PersonalBackground } from '/lib/icoProjectDefShared';
import ReactMarkdown from 'react-markdown';

/*  Implementation of factory of textBox and html textarea for tComb lib
 *
 *  todo: support for automatic name and placeholder attribute's values generation missing
 *  (if needed can be provided manually for placeholder (form options) or automatically for name attribute from locals.path )
 *
 */

class LimitedTextInput extends t.form.Component {

  getTemplate() {
    const randomId = (Math.random()*1000).toString();

    return (locals) => {
      // save callback for middleware purpose
      this.interceptedOnChange = locals.onChange;
      locals.value = locals.value || '';

      const hrStyle = {
        border: 'black solid 1px'
      };

      return (
        <div className={'form-group' + (locals.hasError ? ' has-error': '')}>
          <label htmlFor={randomId} className="control-label">{locals.label}</label>

          <div className={ locals.config.addonBefore || locals.config.addonAfter ? 'input-group' : null}>
            { locals.config.addonBefore ?
              (<span className="input-group-addon">
              { locals.config.addonBefore }
              </span>) : ''
            }

            { this.customProps.type === 'text' ?
              ( <input type={locals.type} value={locals.value}
                       id={randomId} className="form-control" onChange={this.interceptorOnChange.bind(this)}/> )
              : ''
            }

            {  this.customProps.type === 'textarea' ?
              (
                <textarea { ...locals.config.customAttrs } value={locals.value}
                  id={randomId} className="form-control" onChange={this.interceptorOnChange.bind(this)} />
              ) : ''
            }

            { locals.config.addonAfter ?
              (<span className="input-group-addon">
                { locals.config.addonAfter }
              </span>) : ''
            }
          </div>

          <div className="help-block margin-vertical-xs">
            <i>
              { locals.help } { ` Total limit is ${this.customProps.limit}. Remaining characters:  ${this.countRemainingCharsCount(locals.value)}` }
            </i>
          </div>

          { this.customProps.markdownPreview ?
            ( <div>
                MARKDOWN PREVIEW:
                <hr className="margin-top-xs" style={hrStyle} />
                <ReactMarkdown source={locals.value} />
                <hr style={hrStyle} />
              </div>
            )
            : ''
          }
        </div>
      );
    };
  };

  countRemainingCharsCount (strVal) {
    if (strVal) {
      return this.customProps.limit - strVal.length;
    } else {
      return this.customProps.limit;
    }

  }

  interceptorOnChange (event) {
    this.interceptedOnChange(event.target.value);
  };
}

export class OneSentenceTextInput extends LimitedTextInput {
  constructor(props) {
    super(props);
    this.customProps = { limit: OneSentenceStr.limit, type: 'text' };
  }
}

export class MediumLengthDescriptionInput extends LimitedTextInput {
  constructor (props) {
    super(props);
    this.customProps = { limit: MediumLengthDescription.limit, type: 'textarea', markdownPreview: true };
  }
}

export class PersonalBackgroundInput extends LimitedTextInput {
  constructor (props) {
    super(props);
    this.customProps = { limit: PersonalBackground.limit, type: 'textarea', markdownPreview: true };
  }
}

export class RatingExplanationInput extends LimitedTextInput {
  constructor (props) {
    super(props);
    this.customProps = { limit: MediumLengthDescription.limit, type: 'textarea', markdownPreview: true };
  }
}
