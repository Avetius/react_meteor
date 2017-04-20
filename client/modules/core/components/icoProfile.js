import React from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import IcoShortItemMainRows from './icoShortItemMainRows';
import Icon from './general/icon';
import Link from './general/link';
import Countdown from './dateTimeCountdown';
import ContentWithPopover from './contentWithPopover';
import AccountsMgmt from '/lib/accountsMgmt';
import Constants from '/client/configs/constants';

const CoFounders = (props) => {

  const makeCoFounderLink = ({ link, icon }) => {

    if (link) {
      return (
        <Link className="team-member-link display-inline-block" linkHref={link} linkProps={{target: '_blank'}}>
          <Icon iconClasses={icon} parentClasses='h4 margin-horizontal-xs vertical-align-middle' />
        </Link>
      );
    } else {
      return '';
    }
  };

  const coFoundersColumns = props.coFounders.map((coFounder) => {
    return (
      <div key={Math.random().toString()} className="col-xs-12 margin-top-md">
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-3 margin-bottom-sm">
            <img className="img-responsive" src={coFounder.photoUrl || Constants.assetsUrls.teamMemberPhotoPlaceholder} />
          </div>
          <div className="col-xs-12 col-sm-8 col-md-9">
            <div className="margin-bottom-none">
              <h4 className="team-member-name display-inline-block margin-top-none margin-right-md text-uppercase"> {coFounder.name} </h4>
              { makeCoFounderLink({ icon: 'fa fa-linkedin-square', link: coFounder.linkedInProfileUrl }) }
              { makeCoFounderLink({ icon: 'fa fa-twitter', link: coFounder.twitterProfileUrl }) }
              { makeCoFounderLink({ icon: 'fa fa-facebook-official', link: coFounder.facebookProfileUrl }) }
              { makeCoFounderLink({ icon: 'fa fa-github', link: coFounder.githubProfileUrl }) }
            </div>

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
              <Icon iconClasses={icon} parentClasses='h4 vertical-align-middle disabled-link-icon' />
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
            <Link className="active-link-icon full-width text-center" linkHref={link} linkProps={{target: '_blank'}} >
              <Icon iconClasses={icon} parentClasses='h4 vertical-align-middle' />
            </Link>
          </div>
        </div>
        <div className="col-md-8 padding-right-xs margin-left-md padding-left-none">
          <Link className="active-link-caption" linkHref={link} linkProps={{target: '_blank'}} >
            <span>{linkName}</span>
          </Link>
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

                <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-home', linkName: 'Main website',
                    link: ico.officialWebsiteLink, placeholder: 'No Main website', required: true })
                  }
                </div>
                <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-money', linkName: 'Ico website',
                    link: ico.icoWebsiteLink, placeholder: 'No Ico website', required: true })
                  }
                </div>

                <div className="clearfix visible-xs-block"></div>

                <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-file-text-o', linkName: 'Whitepaper',
                    link: ico.whitePaperLink, placeholder: 'No Whitepaper', required: true })
                  }
                </div>
                <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-money', linkName: 'Business Plan',
                    link: ico.businessPlanLink, placeholder: 'No Business Plan', required: true })
                  }
                </div>

              </div>

              <div className="row">

                <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-github', linkName: 'Github',
                    link: ico.githubLink, placeholder: 'No Github', required: true })
                  }
                </div>
                <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-twitter', linkName: 'Twitter',
                    link: ico.twitterLink, placeholder: 'No Twitter', required: true })
                  }
                </div>

                <div className="clearfix visible-xs-block"></div>

                <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-facebook-official', linkName: 'Facebook',
                    link: ico.facebookLink, placeholder: 'No Facebook  ', required: true })
                  }
                </div>
                <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-newspaper-o', linkName: 'Blog',
                    link: ico.blogLink, placeholder: 'No Blog', required: true })
                  }
                </div>

              </div>

              <div className="row">

                { ico.bitcointalkLink ?
                  <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({
                      icon: 'fa fa-btc', linkName: 'Bitcoin Talk',
                      link: ico.bitcointalkLink
                    })
                    }
                  </div>
                  : ''
                }

                { ico.slackLink ?
                  <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-slack', linkName: 'Slack',
                      link: ico.slackLink })
                    }
                  </div>
                  : ''
                }

                { ico.youtubeLink ?
                  <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-youtube', linkName: 'Youtube',
                      link: ico.youtubeLink })
                    }
                  </div>
                  : ''
                }

                { ico.linkedinLink ?
                  <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-linkedin-square', linkName: 'LinkedIn',
                      link: ico.linkedinLink })
                    }
                  </div>
                  : ''
                }

                { ico.redditLink ?
                  <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-reddit', linkName: 'Reddit',
                      link: ico.redditLink })
                    }
                  </div>
                  : ''
                }

                { ico.steemitLink ?
                  <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-newspaper-o', linkName: 'Steemit',
                      link: ico.steemitLink })
                    }
                  </div>
                  : ''
                }

                { ico.telegramLink ?
                  <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-telegram', linkName: 'Telegram',
                      link: ico.telegramLink })
                    }
                  </div>
                  : ''
                }

                { ico.weiboLink ?
                  <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-weibo', linkName: 'Weibo',
                      link: ico.weiboLink })
                    }
                  </div>
                  : ''
                }

                { ico.weChatLink ?
                  <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-weixin', linkName: 'WeChat',
                      link: ico.weChatLink })
                    }
                  </div>
                  : ''
                }

                { ico.qqLink ?
                  <div className="link-box col-xs-6 col-md-3 margin-vertical-sm padding-right-xs">

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
                  <Link linkHref={`/admin/edit-ico/${this.props.icoEntity._id}`}>
                    <Icon iconClasses="fa fa-pencil margin-right-sm" parentClasses="h4 vertical-align-middle">
                      Edit ICO
                    </Icon>
                  </Link>
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

