import React from 'react';
import Link from './general/link';
import Icon from './general/icon';
import Constants from '/client/configs/constants';

export default class Footer extends React.Component {

  render () {
    return <div className="container-fluid padding-vertical-lg">
      <div className="row">
        <div className="col-xs-12">

          {/* Section1 */}
          <div className="row footer-section-odd">
            <div className="col-xs-12 col-sm-10 col-sm-push-1">
              <div className="row margin-vertical-md">


                <div className="col-xs-12 col-md-6">

                  <div className="row margin-vertical-md">
                    <div className="col-xs-12">
                      <img className="img-responsive" src={Constants.assetsUrls.logoWhite} />
                    </div>
                  </div>

                  <div className="row margin-vertical-md">
                    <div className="col-xs-12">
                      <p className="h4 margin-vertical-none">
                        <Link linkHref='http://icoindex.com'>ICOindex.com</Link> is a platform that enables you to find
                        all ongoing and upcoming ICOs. There are many ICOs happening around the world.
                        Thanks to <Link linkHref='http://icoindex.com'>ICOindex.com</Link> you will never miss
                        the next Initial Coin Offering.
                      </p>
                    </div>
                  </div>

                </div>

                <div className="col-xs-12 col-md-6">
                  <div className="row margin-vertical-md">
                    <div className="col-xs-12">
                      <p className="h4">
                        <Link linkHref='http://icoindex.com'>ICOindex.com</Link> is a community-based project.
                        We are aiming to make ICOs transparent, easy to understand and available for everyone.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Section2 */}
          <div className="row footer-section-even">
            <div className="col-xs-12 col-sm-10 col-sm-push-1">
              <div className="row margin-top-md">

                <div className="col-xs-12 col-md-6">

                  <div className="row">

                    <div className="col-xs-12 social-links-section-wrapper">
                      <div className="row margin-vertical-sm social-links-section">
                        <div className="col-xs-6">
                          <Link className="footer-social-link twitter-link display-block padding-all-sm"
                                linkHref={Constants.assetsUrls.socialMediaAccounts.twitter}
                                linkProps={{target: '_blank'}}>
                            <Icon iconClasses={'fa fa-twitter social-icon'}
                                  parentClasses='h4 margin-all-none flex-vertical-center flex-horizontal-center'
                                  childrenPosition='afterIcon'>
                              <span className="h5 social-link-caption margin-left-sm margin-vertical-none">Follow us on twitter</span>
                            </Icon>
                          </Link>
                        </div>
                        <div className="col-xs-6">
                          <Link className="footer-social-link facebook-link display-block padding-all-sm"
                                linkHref={Constants.assetsUrls.socialMediaAccounts.facebook}
                                linkProps={{target: '_blank'}}>
                            <Icon iconClasses={'fa fa-facebook-official social-icon'}
                                  parentClasses='h4 margin-all-none flex-vertical-center flex-horizontal-center'
                                  childrenPosition='afterIcon'>
                              <span className="h5 social-link-caption margin-left-sm margin-vertical-none">Like us on Facebook</span>
                            </Icon>
                          </Link>
                        </div>
                      </div>
                      <div className="row margin-vertical-sm social-links-section flex-horizontal-center">
                        <div className="col-xs-7">
                          <Link className="footer-social-link slack-link display-block padding-all-sm"
                                linkHref={Constants.assetsUrls.socialMediaAccounts.slack}
                                linkProps={{target: '_blank'}}>
                            <Icon iconClasses={'fa fa-slack social-icon'}
                                  parentClasses='h4 margin-all-none flex-vertical-center flex-horizontal-center'
                                  childrenPosition='afterIcon'>
                              <span className="h5 social-link-caption margin-left-sm margin-vertical-none">Join us on Slack channel</span>
                            </Icon>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="col-xs-12 col-md-6">

                  <div className="row margin-bottom-md">
                    <div className="col-xs-12">
                      Would you like to register a new ICO project? <br />
                      Would you like to report a scam project, mistake or a bug? <br />
                      Or if you have any other question or inquiries send us an e-mail to:&nbsp;
                      <Link linkHref='mailto:info@icoindex.com'>info@icoindex.com</Link>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Section3 */}
          <div className="row footer-section-odd">
            <div className="col-xs-12 col-sm-10 col-sm-push-1">
              <div className="row flex-horizontal-center">

                <div className="col-xs-12 col-md-8">

                  <div className="row margin-vertical-md">
                    <div className="col-xs-12 flex-horizontal-center">
                      <h4>Donations are always appreciated!</h4>
                    </div>
                  </div>

                  <div className="row margin-vertical-md donations-section">

                    <div className="col-xs-4">
                      <div className="row flex-horizontal-center">
                        <div className="col-xs-7">
                          <img className="img-responsive" src={Constants.assetsUrls.cryptoLogos.btcLogo} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 donation-message-text">
                          <h6>Every donation you make will help us make ICOindex.com more awesome.</h6>
                        </div>
                        <div className="col-xs-12">
                          <img className="img-responsive" src={Constants.assetsUrls.cryptoAccounts.btc1_QR} />
                        </div>
                        <div className="col-xs-12">
                          <span className="donation-address-text">{Constants.assetsUrls.cryptoAccounts.btc1_text}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-xs-4">
                      <div className="row flex-horizontal-center">
                        <div className="col-xs-7">
                          <img className="img-responsive" src={Constants.assetsUrls.cryptoLogos.dashLogo} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 donation-message-text">
                          <h6>If your donation is smaller than the BTC transaction fee you should better send Dash.</h6>
                        </div>
                        <div className="col-xs-12">
                          <img className="img-responsive" src={Constants.assetsUrls.cryptoAccounts.dash1_QR} />
                        </div>
                        <div className="col-xs-12">
                          <span className="donation-address-text">{Constants.assetsUrls.cryptoAccounts.dash1_text}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-xs-4">
                      <div className="row flex-horizontal-center">
                        <div className="col-xs-7">
                          <img className="img-responsive" src={Constants.assetsUrls.cryptoLogos.ethLogo} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 donation-message-text">
                          <h6>Ethereum, Augur, Golem or any other Ethereum-based token will make us happy :-)</h6>
                        </div>
                        <div className="col-xs-12">
                          <img className="img-responsive" src={Constants.assetsUrls.cryptoAccounts.eth1_QR} />
                        </div>
                        <div className="col-xs-12">
                          <span className="donation-address-text">{Constants.assetsUrls.cryptoAccounts.eth1_text}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>


          {/* todo: move to another - Disclaimer page
          <div className="row margin-vertical-lg">
            <div className="col-xs-12">

              <p> All Initial coin offerings on <Link linkHref='http://icoindex.com'>ICOindex.com</Link> have been
                checked before publishing on this website. By using website
                <Link linkHref='http://icoindex.com'>ICOindex.com</Link> you agree that you have done your own
                due diligence before participating in any initial coin offering or any other project listed on this website.
                Moreover we strongly discourage people from participating in initial coin offerings that are listed
                in scam or suspicious group.
              </p>
              <p>
                <Link linkHref='http://icoindex.com'>ICOindex.com</Link> cannot be hold responsible for any issues
                relating to projects listed on <Link linkHref='http://icoindex.com'>ICOindex.com</Link> website.
                <Link linkHref='http://icoindex.com'>ICOindex.com</Link>  is not a founder of initial coin offerings and
                is not connected with them in any way.
              </p>
              <p>
                <Link linkHref='http://icoindex.com'>ICOindex.com</Link>  does not give any investment recommendations.&nbsp;
                <Link linkHref='http://icoindex.com'>ICOindex.com</Link> serves solely for collecting important
                information about initial coin offerings.
              </p>

            </div>
          </div>
           */}

        </div>
      </div>
    </div>;
  }
}
