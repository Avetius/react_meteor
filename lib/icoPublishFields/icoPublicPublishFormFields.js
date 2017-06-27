import _ from 'lodash';
import IcoPublicFormFields from '../icoFormFields/icoPublicFormFields';

let IcoPublicPublishFormFields = {};
_.each(_.keys(IcoPublicFormFields), (key) => {
  if (IcoPublicFormFields[key].fields) {
    _.each(IcoPublicFormFields[key].fields, (field) => {
      IcoPublicPublishFormFields[field] = 1;
    })
  }
});

_.assign(IcoPublicPublishFormFields, {
  slugUrlToken: 1,
  entityState: 1,
  _id: 1,
  createdAt: 1,
  updatedAt: 1
});

export default IcoPublicPublishFormFields;
