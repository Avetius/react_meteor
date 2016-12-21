import {IcoProjects} from '/lib/collections';
import moment from 'moment';

export default function ({redeploy = false}) {

  // default data generation

  const decentIcoProjectLogoUrl = 'https://s3-eu-west-1.amazonaws.com/ico1/logo1/72077535-1198-4304-8767-6a8fd32c747a_Decent_foundation_logo.png';
  const decentFounderPhoto1 = 'https://s3-eu-west-1.amazonaws.com/ico1/teamMemberPhoto/618e29a9-a91a-4d6e-b284-02c0ed726a45_Matej-Michalko3-1-e1439212308183.png';
  const decentFounderPhoto2 = 'https://s3-eu-west-1.amazonaws.com/ico1/teamMemberPhoto/ad724843-c1aa-4716-9539-8468fbd47c1c_Matej-Boda-e1436127070902.png';
  const decentFounderPhoto3 = 'https://s3-eu-west-1.amazonaws.com/ico1/teamMemberPhoto/489f89c9-c6e8-40a5-b3ca-69321f3c6d57_Josef1-e1438782985778.jpg';

  const coFounder1 = {
    name: 'John Doe1',
    roleDescription: 'CEO',
    personalBackground: 'Matej’s interest in online privacy was fueled first while studying Computer Science at the Swiss Federal Institute of Technology in Lausanne where he completed a project concerning the privacy protection of mobile phone users for Nokia Research Center. Since then he became more and more involved with Bitcoin. Mining at his own laptop in the beginning, then organizing cryptocurrency conferences around the world (Austria, China, Belgium, UK, …). He also founded the first Bitcoin Marketing agency in the world. Matej has operated from multiple countries, including the UK, Isle of Man, Switzerland, Slovakia or China. Since the beginning he is passionate about the immense potential of blockchain technologies. Thereby, he founded DECENT last year.',
    photoUrl: decentFounderPhoto1,
    linkedInProfileUrl: 'https://twitter.com/matmichalko',
    twitterProfileUrl: 'https://twitter.com/matmichalko'
  };

  const coFounder2 = {
    name: 'VeryLongNameIsHereVeryLongNameIsHereVeryLongNameIsHere Doe2',
    roleDescription: 'CTO',
    personalBackground: 'Matej’s interest in online privacy was fueled first while studying Computer Science at the Swiss Federal Institute of Technology in Lausanne where he completed a project concerning the privacy protection of mobile phone users for Nokia Research Center. Since then he became more and more involved with Bitcoin. Mining at his own laptop in the beginning, then organizing cryptocurrency conferences around the world (Austria, China, Belgium, UK, …). He also founded the first Bitcoin Marketing agency in the world. Matej has operated from multiple countries, including the UK, Isle of Man, Switzerland, Slovakia or China. Since the beginning he is passionate about the immense potential of blockchain technologies. Thereby, he founded DECENT last year.',
    photoUrl: decentFounderPhoto2,
    linkedInProfileUrl: 'https://twitter.com/matmichalko',
    twitterProfileUrl: 'https://twitter.com/matmichalko'
  };

  const coFounder3 = {
    name: 'John Doe3',
    roleDescription: 'CMO',
    personalBackground: 'Matej’s interest in online privacy was fueled first while studying Computer Science at the Swiss Federal Institute of Technology in Lausanne where he completed a project concerning the privacy protection of mobile phone users for Nokia Research Center. Since then he became more and more involved with Bitcoin. Mining at his own laptop in the beginning, then organizing cryptocurrency conferences around the world (Austria, China, Belgium, UK, …). He also founded the first Bitcoin Marketing agency in the world. Matej has operated from multiple countries, including the UK, Isle of Man, Switzerland, Slovakia or China. Since the beginning he is passionate about the immense potential of blockchain technologies. Thereby, he founded DECENT last year.',
    photoUrl: decentFounderPhoto3,
    linkedInProfileUrl: 'https://twitter.com/matmichalko',
    twitterProfileUrl: 'https://twitter.com/matmichalko'
  };

  const genericIcoId = '41b7cfcc-fb0b-4350-a549-b656370fb079';
  const genericIcoStartDate = moment().toDate();
  const genericIcoEndDate = moment().add(1, 'months').toDate();

  const genericIco = {
    _id: genericIcoId,
    createdAt: new Date(),
    meta: {
      dataStatus: 'test'
    },
    entityState: { isConcept : false, isChangeRequest : false },

    projectName: 'Decent',
    abbreviation: 'DCT',
    icoProjectLogo: decentIcoProjectLogoUrl,
    officialWebsiteLink : 'https://decent.ch',
    icoWebsiteLink: 'http://sale.decent.ch',
    whitePaperLink: 'https://decent.ch/src/decent-whitepaper.pdf',
    projectStatus: 'concept',
    oneSentenceExplanation : '@DECENTplatform is a #decentralized content distribution network that is open-source and utilizes #blockchain to ensure Trust & Security',
    mediumLengthDescription : 'DECENT’s mission is to become a liaison between various industries by bridging the gap between the emerging blockchain ecosystem. Through secure and trustworthy digital content sharing platform we provide a vertically integrated system for industries, organizations or businesses while we focus on flexibility & sustainable development. Infrastructure of linked systems enables to set more intelligent international standards of efficient, cost-effective & secure content distribution. The principles of DECENT, based on distributed trust machine – the blockchain, bring reliability to wide range of sectors & services in which privacy and security play the crucial role.',
    icoStartDatetime : genericIcoStartDate,
    icoEndDatetime : genericIcoEndDate,
    icoEvents: [],
    maxSupply: null,
    fundKeeper: 'escrow',
    coFounders: [
      coFounder1, coFounder2, coFounder3
    ],
    countryOfOrigin : 'CZ',
    underlyingCryptoPlatform : 'ETH',
    bounty: true,
    affiliate: false,
    affiliateAmount: null,
    githubLink: null,
    slackLink: null,
    twitterLink: 'https://twitter.com/DECENTplatform',
    facebookLink: null,
    redditLink: null,
    blogLink: null,
    telegramLink: null
  };

  const testIcoStartDatePast = moment().subtract(3, 'months').toDate();
  const testIcoEndDatePast = moment().subtract(1, 'months').toDate();

  const testIcoStartDateOngoing = moment().subtract(1, 'months').toDate();
  const testIcoEndDateOngoing = moment().add(1, 'months').toDate();

  const testIcoStartDateUpcoming = moment().add(1, 'months').toDate();
  const testIcoEndDateUpcoming = moment().add(3, 'months').toDate();


  // generate 3 basic ICO projects

  let testIco1 = { ...genericIco };
  testIco1.projectName = 'Decent1';
  testIco1._id = 'edbec846-a79a-497f-8d67-5ecfbaf36aa9';
  testIco1.icoStartDatetime = testIcoStartDatePast;
  testIco1.icoEndDatetime = testIcoEndDatePast;

  let testIco2 = { ...genericIco };
  testIco2.projectName = 'Decent2';
  testIco2._id = '9ed9fda5-a7e5-4a02-88b2-1c53feae2251';
  testIco2.icoStartDatetime = testIcoStartDateOngoing;
  testIco2.icoEndDatetime = testIcoEndDateOngoing;

  let testIco3 = { ...genericIco };
  testIco3.projectName = 'Decent3';
  testIco3._id = 'eb48459a-3748-48b5-8cb9-198bfbee745d';
  testIco3.icoStartDatetime = testIcoStartDateUpcoming;
  testIco3.icoEndDatetime = testIcoEndDateUpcoming;

  if (redeploy) {
    IcoProjects.remove({ $or: [ {_id: genericIcoId }, { _id: testIco1._id }, { _id: testIco2._id }, { _id: testIco3._id } ]});
  }

  if (IcoProjects.find({}).count() === 0 || IcoProjects.find({ _id: genericIcoId}).count() === 0) {
    IcoProjects.insert(genericIco, (err, _id) => {
      console.log('Default test ICO object added.')
    });

    IcoProjects.insert(testIco1, (err, _id) => {
      console.log('Default test ICO object added.')
    });

    IcoProjects.insert(testIco2, (err, _id) => {
      console.log('Default test ICO object added.')
    });

    IcoProjects.insert(testIco3, (err, _id) => {
      console.log('Default test ICO object added.')
    });
  }

}
