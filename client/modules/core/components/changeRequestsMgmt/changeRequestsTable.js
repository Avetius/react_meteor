import React from 'react';
import {Table} from '@sketchpixy/rubix';
import Link from '../general/link';
import Icon from '../general/icon';
import UsersMgmtShared from '/lib/usersMgmtShared';
import ContentWithPopover from '../contentWithPopover';
import {renderDatetime, renderDatetimeInUTC} from '/client/lib/helpers';

export default class ChangeRequestsTable extends React.Component {
  render() {
    const changeRequests = this.props.changeRequests;
    const editTypes = {
      rejected: "Rejected By",
      approved: "Approved By",
      published: "Published By"
    };
    return (
      <Table responsive>
        <thead>
        <tr>
          <th>Ico Name (abbreviation)</th>
          <th>Current Profile</th>
          <th>{this.props.showIcoForm !== false ? "ICO Form" : ''}</th>
          <th>{this.props.type !== 'published' ? 'Options' : ''}</th>
          <th>{UsersMgmtShared.isCurrentUserSuperAdmin() ? 'Author' : ""}</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>{(UsersMgmtShared.isCurrentUserSuperAdmin() || UsersMgmtShared.isCurrentUserContentAdmin()) &&
            editTypes[this.props.type] ? editTypes[this.props.type] : ''}
          </th>
        </tr>
        </thead>
        <tbody>
        {
          changeRequests.map((changeRequest, i) => {
            const editPath = UsersMgmtShared.isCurrentUserSuperAdmin() || UsersMgmtShared.isCurrentUserContentAdmin() ?
              FlowRouter.path('ico.edit', {icoSlug: changeRequest.icoSlug}) : FlowRouter.path('ico.public-edit', {icoSlug: changeRequest.icoSlug});

            return (
              <tr key={i}>
                <td>{changeRequest.projectName}{changeRequest.abbreviation ? ` (${changeRequest.abbreviation})` : ''}</td>
                <td>
                  <Link linkHref={`/profile/${changeRequest.icoSlug}`}>
                    Profile
                  </Link>
                </td>
                <td>{this.props.showIcoForm !== false ?
                  <Link linkHref={editPath}>
                    Ico Form
                  </Link> : ''}
                </td>
                <td>
                  {this.props.type !== 'published' ? !changeRequest.publishRequest ?
                    <Link linkHref={`/admin/manage-request/${changeRequest._id}`}>
                      <Icon iconClasses="glyphicon glyphicon-eye-open margin-right-sm"
                            parentClasses="h4 vertical-align-middle">
                        Edit
                      </Icon>
                    </Link> : <p className="text-success text-strong">Publish request</p> : ''}
                </td>
                <td>
                  {UsersMgmtShared.isCurrentUserSuperAdmin() ?
                    <ContentWithPopover fieldLabel="Author email" helpText={changeRequest.author.email}>
                      <span className="text-help margin-right-xs">
                        {changeRequest.authorName}
                      </span>
                    </ContentWithPopover>
                    : ""}
                </td>
                <td>
                  <ContentWithPopover fieldLabel="UTC time" helpText={renderDatetimeInUTC(changeRequest.createdAt)}>
                    <span className="text-help margin-right-xs">
                      {renderDatetime(changeRequest.createdAt)}
                    </span>
                  </ContentWithPopover>
                </td>
                <td>
                  <ContentWithPopover fieldLabel="UTC time" helpText={renderDatetimeInUTC(changeRequest.updatedAt)}>
                    <span className="text-help margin-right-xs">
                      {renderDatetime(changeRequest.updatedAt)}
                    </span>
                  </ContentWithPopover>
                </td>
                <td>{UsersMgmtShared.isCurrentUserSuperAdmin() || UsersMgmtShared.isCurrentUserContentAdmin() ?
                  <div>{changeRequest.rejected && changeRequest.rejectedBy ?
                    <span className="margin-right-xs">
                      {changeRequest.rejectedBy.name}
                    </span> : ''}

                    {changeRequest.approved && changeRequest.approvedBy ?
                      <span className="margin-right-xs">
                        {changeRequest.approvedBy.name}
                      </span> : ''}

                    {changeRequest.published && changeRequest.publishedBy ?
                      <span className="margin-right-xs">
                        {changeRequest.publishedBy.name}
                      </span> : ''}
                  </div> : ''
                }
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