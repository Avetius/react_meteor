import React from 'react';
import {Table} from '@sketchpixy/rubix';
import UsersMgmtShared from '/lib/usersMgmtShared';
import _ from 'lodash';
import AddDeleteIcoManager from '../icoMgmt/addDeleteIcoManager'
import {Modal} from '@sketchpixy/rubix';

export default class ManageAdmins extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      showAddModal: false,
      selectedUserId: null
    }
  }

  addContentAdmin(userId) {
    this.props.addContentAdmin(userId);
    this.close();
  }

  removeFromContentAdminRole(userId) {
    this.props.removeContentAdmin(userId);
    this.close();
  }

  getRoles(roles) {
    let result = [];
    _.mapKeys(roles, (roleGroupVal, roleGroupKey) => {
      _.map(roleGroupVal, (role) => {
        result.push(`${role}: (${roleGroupKey})`);
      });
    });
    return result;
  }

  openConfirmModal(modalType, userId) {
    let objToSet = {selectedUserId: userId};
    objToSet[modalType] = true;
    this.setState(objToSet);
  }

  close() {
    this.setState({
      showDeleteModal: false,
      showAddModal: false
    });
  }

  render() {
    return (
      <div>
        <AddDeleteIcoManager addIcoManager={this.props.addIcoManager} deleteIcoManager={this.props.deleteIcoManager}/>
        <Table responsive>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Options</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{_.map(this.getRoles(user.roles), (role, i) => {
                    return <p key={i}>{role}</p>
                  })}
                  </td>
                  <td>
                    <div>
                      <div className="col-xs-3">
                        {!UsersMgmtShared.isUserContentAdmin(user.id) ?
                          <button onClick={this.openConfirmModal.bind(this, 'showAddModal', user.id)}
                                  className="btn btn-primary margin-horizontal-md">Add as content admin</button> :
                          <button onClick={this.openConfirmModal.bind(this, 'showDeleteModal', user.id)}
                                  className="btn btn-danger margin-horizontal-md">Remove from content admin
                            role</button>
                        }
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </Table>

        <Modal show={this.state.showAddModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add as content admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <em>Do you want to really add this user to content admin role?</em>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={this.addContentAdmin.bind(this, this.state.selectedUserId)}>Yes</button>
            <button className="btn btn-default" onClick={this.close.bind(this)}>Close</button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showDeleteModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete from content admin role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <em>Do you want to really delete this user from content admin role?</em>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={this.removeFromContentAdminRole.bind(this, this.state.selectedUserId)}>Delete</button>
            <button className="btn btn-default" onClick={this.close.bind(this)}>Close</button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}