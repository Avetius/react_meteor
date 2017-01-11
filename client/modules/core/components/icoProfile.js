import React from 'react';
import moment from 'moment';

import IcoShortItemMainRows from './icoShortItemMainRows';
import Countdown from './dateTimeCountdown';
import ContentWithPopover from './contentWithPopover';
import AccountsMgmt from '/client/configs/accountsMgmt';

export default class IcoProfile extends React.Component {

  constructor (props) {
    super(props);
  }

  makeLink ({linkName, link, icon, placeholder, required, container}) {
    if (!link && required) {
      return (
        <div className="row row-vertical-center">
          <div className="col-md-2 padding-right-xs">
            <span className="h4 margin-horizontal-xs"><i className={icon} aria-hidden="true" /></span>
          </div>
          <div className="col-md-8 padding-right-xs padding-left-md">
            <span className="">{placeholder}</span>
          </div>
        </div>
      );
    } else if (!link && !required) {
       return '';
    }

    return (
      <div className="row row-vertical-center">
        <div className="col-md-2 padding-right-xs">
          <a className="" target="_blank" href={link} rel="noopener noreferrer">
            <span className="h4 margin-horizontal-xs"><i className={icon} aria-hidden="true" /></span>
          </a>
        </div>
        <div className="col-md-8 padding-right-xs padding-left-md">
          <a className="" target="_blank" href={link} rel="noopener noreferrer">
            <span className="">{linkName}</span>
          </a>
        </div>
      </div>
    );
  }

  render () {

    const ico = this.props.icoEntity;

    return (
      <div className="panel panel-default">
        <div className="panel-body padding-all-sm">

          <div className="row row-vertical-center">

            <div className="col-xs-12 col-md-2 padding-right-xs">
              <img className="img-responsive margin-top-sm" src={this.props.icoEntity.icoProjectLogo || '/logo1_min.png'} />
              { AccountsMgmt.isAdmin() ? (
                <div className="margin-vertical-md">
                  <a href={`/admin/edit-ico/${this.props.icoEntity._id}`}>
                    <span className="h4">
                      <i className="fa fa-pencil margin-right-sm" />
                      Edit ICO
                    </span>
                  </a>
                </div> ) : ''
              }
            </div>

            <div className="col-xs-12 col-md-10 padding-left-sm">

              <IcoShortItemMainRows ico={this.props.icoEntity} isProfile={true} />

              <hr className="margin-vertical-xs" />

              <div className="row row-vertical-center">

                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-home', linkName: 'Main website',
                    link: ico.officialWebsiteLink, placeholder: 'No Main website', required: true })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-money', linkName: 'Ico website',
                    link: ico.icoWebsiteLink, placeholder: 'No Ico website', required: true })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-file-text-o', linkName: 'Whitepaper',
                    link: ico.whitePaperLink, placeholder: 'No Whitepaper', required: true })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-money', linkName: 'Business Plan',
                    link: ico.businessPlanLink, placeholder: 'No Business Plan', required: true })
                  }
                </div>

              </div>

              <div className="row row-vertical-center">

                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-github', linkName: 'Github',
                    link: ico.githubLink, placeholder: 'No Github', required: true })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-twitter', linkName: 'Twitter',
                    link: ico.twitterLink, placeholder: 'No Twitter', required: true })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-facebook-official', linkName: 'Facebook',
                    link: ico.facebookLink, placeholder: 'No Facebook  ', required: true })
                  }
                </div>
                <div className="col-xs-4 col-md-3 padding-right-xs">

                  { this.makeLink({ icon: 'fa fa-newspaper-o', linkName: 'Blog',
                    link: ico.blogLink, placeholder: 'No Blog', required: true })
                  }
                </div>

              </div>

              <div className="row">

                { ico.bitcointalkLink ?
                  <div className="col-xs-4 col-md-3 padding-right-xs">

                    { this.makeLink({
                      icon: 'fa fa-btc', linkName: 'Bitcoin Talk',
                      link: ico.bitcointalkLink
                    })
                    }
                  </div>
                  : ''
                }

                { ico.slackLink ?
                  <div className="col-xs-4 col-md-3 padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-slack', linkName: 'Slack',
                      link: ico.slackLink })
                    }
                  </div>
                  : ''
                }

                { ico.youtubeLink ?
                  <div className="col-xs-4 col-md-3 padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-youtube', linkName: 'Youtube',
                      link: ico.youtubeLink })
                    }
                  </div>
                  : ''
                }

                { ico.linkedinLink ?
                  <div className="col-xs-4 col-md-3 padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-linkedin-square', linkName: 'LinkedIn',
                      link: ico.linkedinLink })
                    }
                  </div>
                  : ''
                }

                { ico.redditLink ?
                  <div className="col-xs-4 col-md-3 padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-reddit', linkName: 'Reddit',
                      link: ico.redditLink })
                    }
                  </div>
                  : ''
                }

                { ico.steemitLink ?
                  <div className="col-xs-4 col-md-3 padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-newspaper-o', linkName: 'Steemit',
                      link: ico.steemitLink })
                    }
                  </div>
                  : ''
                }

                { ico.telegramLink ?
                  <div className="col-xs-4 col-md-3 padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-telegram', linkName: 'Telegram',
                      link: ico.telegramLink })
                    }
                  </div>
                  : ''
                }

                { ico.weiboLink ?
                  <div className="col-xs-4 col-md-3 padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-weibo', linkName: 'Weibo',
                      link: ico.weiboLink })
                    }
                  </div>
                  : ''
                }

                { ico.weChatLink ?
                  <div className="col-xs-4 col-md-3 padding-right-xs">

                    { this.makeLink({ icon: 'fa fa-weixin', linkName: 'WeChat',
                      link: ico.weChatLink })
                    }
                  </div>
                  : ''
                }

                { ico.qqLink ?
                  <div className="col-xs-4 col-md-3 padding-right-xs">

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
              <hr />

              <h3>ICO overview</h3>
              <p>
                {ico.mediumLengthDescription}
              </p>
              <hr />

              <h3>Team</h3>
              <div className="row">

                {ico.coFounders.map((coFounder)=> {
                  return (
                    <div key={Math.random().toString()} className="col-xs-6 col-md-3">
                      <p> <img className="img-responsive" src={coFounder.photoUrl} /> </p>
                      <h4 className="display-inline-block margin-right-xs"> {coFounder.name} </h4>
                      {this.makeLink({ icon: 'fa fa-twitter', linkName: '', link: coFounder.twitterProfileUrl })}
                      {this.makeLink({ icon: 'fa fa-linkedin-square', linkName: '', link: coFounder.linkedInProfileUrl })}
                      <h5><strong>{coFounder.roleDescription}</strong></h5>
                      <p> {coFounder.personalBackground} </p>
                    </div>

                  )
                })}
              </div>
              <hr />
              { /* <h4>Marketing & community</h4>*/}

            </div>
          </div>

          <div className="row">
            <div className="col-md-12">

              <h3>Admin section</h3>

              <button className="btn btn-primary margin-horizontal-xs" type="button"
                      disabled={ico.entityState.state === 'published' ? true : ''} onClick={this.props.publishConcept.bind(this, ico._id)}>
                Publish
              </button>
              <button className="btn btn-secondary margin-horizontal-xs" type="button"
                      disabled={ico.entityState.state === 'concept' ? true : ''} onClick={this.props.unPublish.bind(this, ico._id)}>
                UnPublish
              </button>
            </div>
          </div>

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

