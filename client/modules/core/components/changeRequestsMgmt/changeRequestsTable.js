import React from 'react';
import { Table } from '@sketchpixy/rubix';
import Link from '../general/link';
import Icon from '../general/icon';
import UsersMgmtShared from '/lib/usersMgmtShared';

export default class ChangeRequestsTable extends React.Component {
  render() {
    const changeRequests = this.props.changeRequests;
    const editCase = UsersMgmtShared.isCurrentUserSuperAdmin() || UsersMgmtShared.isUserContentAdmin() ? "edit-ico" : "edit-public-ico";
    return (
      <Table responsive>
        <thead>
        <tr>
          <th>Ico Name (abbreviation)</th>
          <th>Current Profile</th>
          <th>ICO Form</th>
          <th>Options</th>
          <th>{UsersMgmtShared.isCurrentUserSuperAdmin() ? 'Author' : ""}</th>
        </tr>
        </thead>
        <tbody>
        {
          changeRequests.map((changeRequest, i) => {
            return (
              <tr key={i}>
                <td>{changeRequest.projectName}{changeRequest.abbreviation ? ` (${changeRequest.abbreviation})` : ''}</td>
                <td>
                  <Link linkHref={`/profile/${changeRequest.icoSlug}`} linkProps={{target: '_blank'}}>
                    Profile
                  </Link>
                </td>
                <td>
                  <Link linkHref={`/admin/${editCase}/${changeRequest.icoId}`} linkProps={{target: '_blank'}}>
                    Ico Form
                  </Link>
                </td>
                <td>
                  {!changeRequest.submitedForApproval ?
                  <Link linkHref={`/admin/manage-request/${changeRequest._id}`} linkProps={{target: '_blank'}}>
                    <Icon iconClasses="glyphicon glyphicon-eye-open margin-right-sm" parentClasses="h4 vertical-align-middle">
                      Edit
                    </Icon>
                  </Link> : ""}
                </td>
                <td>
                  {UsersMgmtShared.isCurrentUserSuperAdmin() ?
                    <p title={changeRequest.author}>{changeRequest.authorName}</p> : ""}
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </Table>
    );
  }
}