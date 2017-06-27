import _ from 'lodash';
import IcoPublicFormFields from './icoPublicFormFields';

let IcoExtendedFormFields = _.cloneDeep(IcoPublicFormFields);

IcoExtendedFormFields.finance.fields = _.concat(IcoExtendedFormFields.finance.fields, [
  'bitcoinInvestments',
  'ethInvestments',
  'usdTotalInvestment',
  'participantsInIco',
  'totalEvaluation',
  'affiliate',
  'affiliateAmount',
  'instantExchangeLink'
]);

IcoExtendedFormFields.assessment.fields =  ['ratingExplanation', 'ratingScore'];

export default IcoExtendedFormFields;
