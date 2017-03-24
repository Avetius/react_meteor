import React from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import IcoShortItemMainRows from './icoShortItemMainRows';
import Countdown from './dateTimeCountdown';
import ContentWithPopover from './contentWithPopover';
import AccountsMgmt from '/lib/accountsMgmt';

const CoFounders = (props) => {

  const makeCoFounderLink = ({ linkName, link, icon }) => {
    if (link) {
      return (
        <a className="" target="_blank" href={link} rel="noopener noreferrer">
          <span className="h4 margin-horizontal-xs"><i className={icon} aria-hidden="true" /></span>
          {linkName}
        </a>
      )
    } else {
      return '';
    }
  };

  const coFoundersColumns = props.coFounders.map((coFounder) => {
    return (
      <div key={Math.random().toString()} className="col-xs-12 margin-top-md">
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-3">
            <img className="img-responsive img-circle" src={coFounder.photoUrl || '/profile-photo-placeholder.jpg'} />
          </div>
          <div className="col-xs-12 col-sm-8 col-md-9">
            <p className="margin-bottom-none">
              <h4 className="team-member-name display-inline-block margin-right-md text-uppercase"> {coFounder.name} </h4>
              { makeCoFounderLink({ icon: 'fa fa-linkedin-square', linkName: '', link: coFounder.linkedInProfileUrl }) }
              { makeCoFounderLink({ icon: 'fa fa-twitter', linkName: '', link: coFounder.twitterProfileUrl }) }
              { makeCoFounderLink({ icon: 'fa fa-facebook-official', linkName: '', link: coFounder.facebookProfileUrl }) }
              { makeCoFounderLink({ icon: 'fa fa-github', linkName: '', link: coFounder.githubProfileUrl }) }
            </p>

            <h5 className="margin-top-none">
              <strong>{coFounder.roleDescription}</strong>
            </h5>

            <div>
              <ReactMarkdown source={coFounder.personalBackground || ''} />
            </div>
          </div>

        </div>
      </div>
    );

  });
  return ( <div>{coFoundersColumns}</div> );
};


export default class IcoProfile extends React.Component {

  constructor (props) {
    super(props);
  }

  makeLink ({linkName, link, icon, placeholder, required}) {
    if (!link && required) {
      return (
        <div className="row row-vertical-center">
          <div className="col-md-2 padding-right-xs">
            <div className="disabled-link-circle-border flex-vertical-center flex-horizontal-center">
              <span className="h4 vertical-align-middle disabled-link-icon">
                <i className={icon} aria-hidden="true" />
              </span>
            </div>
          </div>
          <div className="col-md-8 padding-right-xs padding-left-md">
            <span className="disabled-link-caption">{placeholder}</span>
          </div>
        </div>
      );
    } else if (!link && !required) {
       return '';
    }

    return (
      <div className="row row-vertical-center">
        <div className="col-md-2 padding-right-xs">
          <div className="active-link-circle-border flex-vertical-center">
            <a className="active-link-icon full-width text-center" target="_blank" href={link} rel="noopener noreferrer">
              <span className="h4 margin-horizontal-xs">
                <i className={icon} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
        <div className="col-md-8 padding-right-xs margin-left-md padding-left-none">
          <a className="active-link-caption" target="_blank" href={link} rel="noopener noreferrer">
            <span className="">{linkName}</span>
          </a>
        </div>
      </div>
    );
  }

  render () {
    const ico = this.props.icoEntity;
    ico.coFounders = ico.coFounders || [];

    let note;
    if (ico.ratingScore === 'scam') {
      note =
        <div className="row">
          <div className="col-md-12">
            <h4>Why is this project scam?</h4>
              <ReactMarkdown source={ico.ratingExplanation || ''} />
          </div>
        </div>
    }
    if (ico.ratingScore === 'suspicious') {
      note =
        <div className="row">
          <div className="col-md-12">
            <h4>Why is this project suspicious?</h4>
              <ReactMarkdown source={ico.ratingExplanation || ''} />
          </div>
        </div>
    }

    return (
      <div className="panel panel-default ico-profile-box">
        <div className="panel-body padding-vertical-sm">

          <IcoShortItemMainRows ico={this.props.icoEntity} isProfile={true} />

          <hr className="hr-limiter margin-vertical-xs" />

          <h4>Important links</h4>

          <div className="row row-vertical-center ico-links-section">
            <div className="col-xs-12 col-md-12">

              <div className="row">

                <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-home', linkName: 'Main website',
                    link: ico.officialWebsiteLink, placeholder: 'No Main website', required: true })
                  }
                </div>
                <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-money', linkName: 'Ico website',
                    link: ico.icoWebsiteLink, placeholder: 'No Ico website', required: true })
                  }
                </div>

                <div className="clearfix visible-xs-block"></div>

                <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-file-text-o', linkName: 'Whitepaper',
                    link: ico.whitePaperLink, placeholder: 'No Whitepaper', required: true })
                  }
                </div>
                <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-money', linkName: 'Business Plan',
                    link: ico.businessPlanLink, placeholder: 'No Business Plan', required: true })
                  }
                </div>

              </div>

              <div className="row">

                <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-github', linkName: 'Github',
                    link: ico.githubLink, placeholder: 'No Github', required: true })
                  }
                </div>
                <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-twitter', linkName: 'Twitter',
                    link: ico.twitterLink, placeholder: 'No Twitter', required: true })
                  }
                </div>

                <div className="clearfix visible-xs-block"></div>

                <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-facebook-official', linkName: 'Facebook',
                    link: ico.facebookLink, placeholder: 'No Facebook  ', required: true })
                  }
                </div>
                <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-newspaper-o', linkName: 'Blog',
                    link: ico.blogLink, placeholder: 'No Blog', required: true })
                  }
                </div>

              </div>

              <div className="row">

                { ico.bitcointalkLink ?
                  <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({
                      icon: 'fa fa-btc', linkName: 'Bitcoin Talk',
                      link: ico.bitcointalkLink
                    })
                    }
                  </div>
                  : ''
                }

                { ico.slackLink ?
                  <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-slack', linkName: 'Slack',
                      link: ico.slackLink })
                    }
                  </div>
                  : ''
                }

                { ico.youtubeLink ?
                  <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-youtube', linkName: 'Youtube',
                      link: ico.youtubeLink })
                    }
                  </div>
                  : ''
                }

                { ico.linkedinLink ?
                  <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-linkedin-square', linkName: 'LinkedIn',
                      link: ico.linkedinLink })
                    }
                  </div>
                  : ''
                }

                { ico.redditLink ?
                  <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-reddit', linkName: 'Reddit',
                      link: ico.redditLink })
                    }
                  </div>
                  : ''
                }

                { ico.steemitLink ?
                  <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-newspaper-o', linkName: 'Steemit',
                      link: ico.steemitLink })
                    }
                  </div>
                  : ''
                }

                { ico.telegramLink ?
                  <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-telegram', linkName: 'Telegram',
                      link: ico.telegramLink })
                    }
                  </div>
                  : ''
                }

                { ico.weiboLink ?
                  <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-weibo', linkName: 'Weibo',
                      link: ico.weiboLink })
                    }
                  </div>
                  : ''
                }

                { ico.weChatLink ?
                  <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-weixin', linkName: 'WeChat',
                      link: ico.weChatLink })
                    }
                  </div>
                  : ''
                }

                { ico.qqLink ?
                  <div className="col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-qq', linkName: 'QQ',
                      link: ico.qqLink })
                    }
                  </div>
                  : ''
                }

              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <hr className="hr-limiter" />

              { note }

              <h4>Project description</h4>
              <div>
                <ReactMarkdown source={ico.mediumLengthDescription || ''} />
              </div>
              <hr className="hr-limiter" />

              <h4>Project Team</h4>
              <div className="row">
                {<CoFounders coFounders={ico.coFounders} />}
              </div>
              <hr className="hr-limiter" />
              { /* <h4>Marketing & community</h4>*/}

            </div>
          </div>

          { AccountsMgmt.isCurrentUserAdmin() ? (
            <div className="row">
              <div className="col-md-12">

                <h4>Admin section</h4>

                <button className="btn btn-theme-orange margin-horizontal-xs" type="button"
                        disabled={ico.entityState.state === 'published' ? true : ''} onClick={this.props.publishConcept.bind(this, ico._id)}>
                  Publish
                </button>
                <button className="btn btn-secondary margin-horizontal-xs" type="button"
                        disabled={ico.entityState.state === 'concept' ? true : ''} onClick={this.props.unPublish.bind(this, ico._id)}>
                  UnPublish
                </button>


                <div className="display-inline-block margin-all-md">
                  <a href={`/admin/edit-ico/${this.props.icoEntity._id}`}>
                    <span className="h4">
                      <i className="fa fa-pencil margin-right-sm" />
                      Edit ICO
                    </span>
                  </a>
                </div>

              </div>
            </div> ) : ''
          }

        </div>
      </div>
    )
  };
}

IcoProfile.defaultProps = {
  icoEntity: {
    icoEvents: [],
    coFounders: []
  }
};

