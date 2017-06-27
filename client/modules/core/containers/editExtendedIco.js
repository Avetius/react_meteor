import _ from 'lodash';
import EditExtendedIco from '../components/editExtendedIco';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {Meteor} from 'meteor/meteor';
import UsersMgmtShared from '/lib/usersMgmtShared';
import IcoStatus from '/lib/icoStatus'

export const composer = ({context, editMode}, onData) => {
  const {Meteor, Collections} = context();
  const userId = Meteor.userId();

  // lets fetch and edit ICO //
  if (editMode && editMode.icoSlug) {
    if (Meteor.subscribe('ico.editMode', { icoSlug: editMode.icoSlug}).ready()) {
      if (UsersMgmtShared.isCurrentUserSuperAdmin() || UsersMgmtShared.isCurrentUserContentAdmin()) {
        let icoEntity = Collections.IcoProjects.findOne({slugUrlToken: editMode.icoSlug});
        if (icoEntity) {
          let changeRequest;
          if (UsersMgmtShared.isCurrentUserContentAdmin()) {
            changeRequest = Collections.ChangeRequests.findOne({icoId: icoEntity._id});
            if (changeRequest) {
              const changedFields = _.mapValues(changeRequest.fields, (field, key, obj) => {
                return field.newValue;
              });
              icoEntity = _.defaults(changedFields, icoEntity);
            }
          }
          onData(null, {icoEntity, changeRequest, userId: userId, published: IcoStatus.isIcoPublished(icoEntity)});
        } else {
          FlowRouter.go('404');
        }
      } else {
        FlowRouter.go('404');
      }
    } else {
      const icoEntity = Collections.IcoProjects.findOne({slugUrlToken: editMode.icoSlug});
      if (icoEntity) {
        onData(null, { icoEntity, userId: userId, published: IcoStatus.isIcoPublished(icoEntity)});
      } else {
        onData(null, { userId: userId });
      }
    }

  // lets create new ICO
  } else {
    onData(null, { userId: Meteor.userId() });
  }

};

export const depsMapper = (context, actions) => ({
  saveEditedIco: actions.icoProject.edit,
  addAsConcept: actions.icoProject.addAsConcept,
  deleteIco: actions.icoProject.deleteIco,
  sendChangeRequest: actions.icoProject.sendChangeRequest,
  context: () => context
});

export default composeAll(
  // consider add: null, null, {pure:true}
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EditExtendedIco);
