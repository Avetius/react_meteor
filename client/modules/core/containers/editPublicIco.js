import EditPublicIco from '../components/editPublicIco';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {Meteor} from 'meteor/meteor';
import IcoStatus from '/lib/icoStatus'

export const composer = ({context, icoId}, onData) => {
    const {Meteor, Collections} = context();

    if (icoId) {
        if (Meteor.subscribe('ico.single', { id: icoId }).ready()) {
            const icoEntity = Collections.IcoProjects.findOne(icoId);
            if (icoEntity) {
                onData(null, { icoEntity, userId: Meteor.userId(), published: IcoStatus.isIcoPublished(icoEntity) });
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
