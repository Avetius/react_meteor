import EditPublicIco from '../components/editPublicIco';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {Meteor} from 'meteor/meteor';
import _ from 'lodash';
import IcoStatus from '/lib/icoStatus';
import UsersMgmtShared from '/lib/usersMgmtShared';

export const composer = ({context, icoSlug}, onData) => {
  const {Meteor, Collections} = context();

  if (icoSlug) {
    if (Meteor.subscribe('ico.editMode', {icoSlug: icoSlug}).ready()) {
      let icoEntity = Collections.IcoProjects.findOne({slugUrlToken: icoSlug});
      if (icoEntity && UsersMgmtShared.isCurrentUserIcoAdmin(icoEntity.slugUrlToken)) {
        const changeRequest = Collections.ChangeRequests.findOne({icoId: icoEntity._id});
        if (changeRequest) {
          const changedFields = _.mapValues(changeRequest.fields, (field, key, obj) => {
            return field.newValue;
          });
          icoEntity = _.defaults(changedFields, icoEntity);
        }
        onData(null, {icoEntity, changeRequest, userId: Meteor.userId(), published: IcoStatus.isIcoPublished(icoEntity)});
      } else {
        FlowRouter.go('404');
      }
    }
  }
};

export const depsMapper = (context, actions) => ({
  saveEditedIco: actions.icoProject.edit,
  sendChangeRequest: actions.icoProject.sendChangeRequest,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EditPublicIco);
