import React from 'react';
import moment from 'moment';
import IcoShortItemMainRows from './icoShortItemMainRows';
import Countdown from './dateTimeCountdown';
import ContentWithPopover from './contentWithPopover';

export default class IcoProfile extends React.Component {

  constructor (props) {
    super(props);
  }

  makeLink ({linkName, link, icon, placeholder, required}) {
    if (!link && !placeholder) {
      console.error('could not build link');
    }
    if (required && !link) {
      console.error(`Required Link (${linkName}) is not provided.`);
    }

    if (!link) {
      return (
        <div>
          <span className="h4 margin-horizontal-sm"><i className={icon} aria-hidden="true"></i></span>
          <span>{placeholder}</span>
        </div>
      )
    }

    return (
    <div>
      <span className="h4 margin-horizontal-sm"><i className={icon} aria-hidden="true"></i></span>
      <a className="" target="_blank" href={link} rel="noopener noreferrer">{linkName}</a>
    </div>)
  }

  render () {

    const ico = this.props.icoEntity;

    const prefixHttpIfMissing = (link) => {
      return link.substr(0, 4) === 'http' ? link : 'http://' + link;
    };

    // todo: render-validation -- should be removed in long term and fix in db instead
    const officialWebsiteLink = prefixHttpIfMissing(this.props.icoEntity.officialWebsiteLink);
    const whitePaperLink = prefixHttpIfMissing(this.props.icoEntity.whitePaperLink);
    const icoWebsiteLink = prefixHttpIfMissing(this.props.icoEntity.icoWebsiteLink);


    return (
      <div className="panel panel-default">
        <div className="panel-body padding-all-sm">

          <div className="row row-vertical-center">

            <div className="col-xs-12 col-md-2 padding-right-xs">
              <img className="img-responsive margin-top-sm" src="/Decent_foundation_logo.png" />
            </div>

            <div className="col-xs-12 col-md-10 padding-left-sm">

              <IcoShortItemMainRows ico={this.props.icoEntity} isProfile={true} />

              <hr className="margin-vertical-xs" />

              <div className="row">

                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-money', linkName: 'Ico website',
                    link: ico.icoWebsiteLink, placeholder: 'Ico website not provided', required: true })
                  }
                </div>

                <div className="col-xs-4 col-md-3 padding-horizontal-xs">

                  { this.makeLink({ icon: 'fa fa-home', linkName: 'Main website',
                    link: ico.officialWebsiteLink, placeholder: 'Main website not provided', required: true })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-horizontal-xs">

                  { this.makeLink({ icon: 'fa fa-file-text-o', linkName: 'Whitepaper',
                    link: ico.whitePaperLink, placeholder: 'Whitepaper link not provided' })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-horizontal-xs">

                  { this.makeLink({ icon: 'fa fa-newspaper-o', linkName: 'Blog',
                    link: ico.blogLink, placeholder: 'Blog link not provided' })
                  }
                </div>

              </div>

              <div className="row">
                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-github', linkName: 'Github',
                    link: ico.githubLink, placeholder: 'Github link not provided' })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-horizontal-xs">

                  { this.makeLink({ icon: 'fa fa-twitter', linkName: 'Twitter',
                    link: ico.twitterLink, placeholder: 'Twitter link not provided' })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-horizontal-xs">

                  { this.makeLink({ icon: 'fa fa-facebook-official', linkName: 'Facebook',
                    link: ico.facebookLink, placeholder: 'Facebook link not provided' })
                  }
                </div>

                <div className="col-xs-4 col-md-3 padding-horizontal-xs">

                  { this.makeLink({ icon: 'fa fa-reddit', linkName: 'Reddit',
                    link: ico.redditLink, placeholder: 'Reddit link not provided' })
                  }
                </div>
              </div>

              <div className="row">
                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-slack', linkName: 'Slack',
                    link: ico.slackLink, placeholder: 'Slack link not provided' })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-horizontal-xs">

                  { this.makeLink({ icon: 'fa fa-telegram', linkName: 'Telegram',
                    link: ico.telegramLink, placeholder: 'Telegram link not provided' })
                  }
                </div>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <hr />
              <h4>ICO overview</h4>
              <p>
                {ico.mediumLengthDescription}
              </p>
              <hr />
              <h4>Team</h4>
              <hr />
              <h4>Marketing & community</h4>

            </div>
          </div>

        </div>
      </div>
    )
  };
}

