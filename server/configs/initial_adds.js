import {IcoProjects} from '/lib/collections';
import moment from 'moment';

export default function () {

    const testIcoId = "41b7cfcc-fb0b-4350-a549-b656370fb079";
    const icoStartDate = moment().toDate();
    const icoStartEnd = moment().add(1, 'months').toDate();

    const testIco = {
      "_id" : testIcoId,
      "createdAt": new Date(),
      "entityState" : { "isConcept" : false, "isChangeRequest" : false },
      "projectName" : "TestICO",
      "abbreviation" : "TESTICO",
      "officialWebsiteLink" : "ico.com",
      "icoWebsiteLink" : "ico.com/ico",
      "whitePaperLink" : "ico.com/whitepaper",
      "icoStatus" : "upcoming",
      "projectStatus" : "concept",
      "oneSentenceExplanation" : "One Sentence Explanation",
      "mediumLengthDescription" : null,
      "icoStartDatetime" : icoStartDate,
      "icoEndDatetime" : icoStartEnd,
      "icoEvents" : null,
      "maxSupply" : null,
      "fundKeeper" : "escrow",
      "runningSocialCampaign" : "yes",
      "coFounders" : "John Doe",
      "countryOfOrigin" : "CZ",
      "underlyingCryptoPlatform" : "ETH",
      "bonus" : false,
      "bounty" : false,
      "affiliate" : false, "affiliateAmount" : null,
      "githubLink" : null, "slackLink" : null, "twitterLink" : null, "facebookLink" : null,
      "redditLink" : null, "blogLink" : null, "telegramLink" : null
    };

    if (IcoProjects.find({}).count() === 0) {
      IcoProjects.insert(testIco, (err, _id) => {
        console.log('Default test ICO object added.')
      });
    }

}
