import React from 'react';
import moment from 'moment';
import IcoShortItemMainRows from './icoShortItemMainRows';
import Countdown from './dateTimeCountdown';
import ContentWithPopover from './contentWithPopover';

export default class IcoProfile extends React.Component {

  constructor (props) {
    super(props);
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
                <div className="col-xs-4 col-md-3">
                  <span className="h4 margin-horizontal-sm"><i className="fa fa-money" aria-hidden="true"></i></span>
                  <a className="" target="_blank" href={icoWebsiteLink} rel="noopener noreferrer">Ico website</a>
                </div>
                <div className="col-xs-4 col-md-3">
                  <span className="h4 margin-horizontal-sm"><i className="fa fa-home" aria-hidden="true"></i></span>
                  <a className="" target="_blank" href={officialWebsiteLink} rel="noopener noreferrer">Main website</a>
                </div>
                <div className="col-xs-4 col-md-3">
                  <span className="h4 margin-horizontal-sm"><i className="fa fa-file-text-o" aria-hidden="true"></i></span>
                  <a className="" target="_blank" href={whitePaperLink} rel="noopener noreferrer">Whitepaper</a>
                </div>
                <div className="col-xs-4 col-md-3">
                  <span className="h4 margin-horizontal-sm"><i className="fa fa-newspaper-o" aria-hidden="true"></i></span>
                  <a className="" target="_blank" href={ico.blogLink || '#'} rel="noopener noreferrer">Blog</a>
                </div>

              </div>

              <div className="row">
                <div className="col-xs-4 col-md-3">
                  <span className="h4 margin-horizontal-sm"><i className="fa fa-github" aria-hidden="true"></i></span>
                  <a className="" target="_blank" href={ico.githubLink || '#'} rel="noopener noreferrer">Github</a>
                </div>
                <div className="col-xs-4 col-md-3">
                  <span className="h4 margin-horizontal-sm"><i className="fa fa-twitter" aria-hidden="true"></i></span>
                  <a className="" target="_blank" href={ico.twitterLink || '#'} rel="noopener noreferrer">Twitter</a>
                </div>
                <div className="col-xs-4 col-md-3">
                  <span className="h4 margin-horizontal-sm"><i className="fa fa-facebook-official" aria-hidden="true"></i></span>
                  <a className="" target="_blank" href={ico.facebookLink || '#'} rel="noopener noreferrer">Facebook</a>
                </div>

                <div className="col-xs-4 col-md-3">
                  <span className="h4 margin-horizontal-sm"><i className="fa fa-reddit" aria-hidden="true"></i></span>
                  <a className="" target="_blank" href={ico.redditLink || '#'} rel="noopener noreferrer">Reddit</a>
                </div>
                <div className="col-xs-4 col-md-3">
                  <span className="h4 margin-horizontal-sm"><i className="fa fa-slack" aria-hidden="true"></i></span>
                  <a className="" target="_blank" href={ico.slackLink || '#'} rel="noopener noreferrer">Slack</a>
                </div>
                <div className="col-xs-4 col-md-3">
                  <span className="h4 margin-horizontal-sm"><i className="fa fa-telegram" aria-hidden="true"></i></span>
                  <a className="" target="_blank" href={ico.telegramLink || '#'} rel="noopener noreferrer">Telegram</a>
                </div>

              </div>

            </div>
          </div>


          <div className="row">
            <div className="col-md-12">
              <hr />
              <h4>ICO overview</h4>
              <h5>Project goal</h5>
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

