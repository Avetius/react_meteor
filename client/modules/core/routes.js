import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';

import AddOrEditIco from './containers/addOrEditIco';
import EditPublicIco from './containers/editPublicIco';
import IcoFrontList from './containers/icoFrontList';
import IcoProfile from './containers/icoProfile'
import NotFound from './containers/notFound';
import IcoManagement from './containers/icoManagement';
import ChangeRequestsList from './containers/changeRequestsList';
import ManageChangeRequest from './containers/manageChangeRequest';
import ManageAdmins from './containers/manageAdmins';

export default function (inject, context, actions) {
  const { FlowRouter } = context;

  // inject function doesn't work as expected and it will not provide context object to MainLayout so we need it inject explicitly in route defs
  const MainLayoutCtx = inject(MainLayout);
  const IcoAdmin = FlowRouter.group({
    prefix: "/admin"
  });

  IcoAdmin.route('/manage-admins', {
    name: 'users.manage-admins',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<ManageAdmins />),
        context: () => context
      });
    }
  });

  FlowRouter.route('/', {
    name: 'ico.home',
    action() {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<IcoFrontList entityState="published" subView='ongoing' />),
        context: () => context
      });
    }
  });

  /**
   * :subView is ongoing | upcoming | finished | suspicious | scam
   * :category is like fintech | healthcare | media
   * next parameters will be queries
   */
  FlowRouter.route('/index/:subView', {
    name: 'ico.index',
    action({subView}) {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<IcoFrontList entityState="published" subView={subView} />),
        context: () => context
      });
    }
  });

  FlowRouter.route('/favourites/:subView', {
    name: 'ico.favourites',
    action({subView}) {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<IcoFrontList entityState="published" subView={subView} />),
        context: () => context
      });
    }
  });

  IcoAdmin.route('/concepts/:subView', {
    name: 'ico.concepts',
    action({subView}) {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<IcoFrontList entityState="concept" subView={subView} />),
        context: () => context
      });
    }
  });

  FlowRouter.route('/profile/:icoSlug', {
    name: 'ico.profile',
    action({icoSlug}) {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<IcoProfile icoSlug={icoSlug} />),
        context: () => context
      })
    }
  });

  IcoAdmin.route('/add-ico', {
    name: 'ico.add',
    action() {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco editMode={{active: false}} />),
        context: () => context
      });
    }
  });

  IcoAdmin.route('/edit-ico/:icoSlug', {
    name: 'ico.edit',
    action({icoSlug}) {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco editMode={{active: true, icoId: icoSlug}} />),
        context: () => context
      });
    }
  });

  IcoAdmin.route('/edit-public-ico/:icoSlug', {
      name: 'ico.public-edit',
      action({icoSlug}) {
          actions.icoProject.resetInfiniteScrolling(context);
          mount(MainLayoutCtx, {
              content: () => (<EditPublicIco icoId={icoSlug} />),
              context: () => context
          });
      }
  });

  IcoAdmin.route('/change-requests', {
    name: 'change-request.view-all',
    action() {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<ChangeRequestsList/>),
        context: () => context
      });
    }
  });

  IcoAdmin.route('/manage-request/:requestId', {
    name: 'change-request.manage',
    action({requestId}) {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<ManageChangeRequest requestId={requestId} />),
        context: () => context
      });
    }
  });

  IcoAdmin.route('/login', {
    name: 'admin.login',
    action() {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<IcoManagement/>),
        context: () => context
      });
    }
  });

  FlowRouter.route('/ico-management', {
    name: 'ico.management',
    action() {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<IcoManagement/>),
        context: () => context
      });
    }
  });

  FlowRouter.route('/not-found', {
    name: '404',
    action() {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<NotFound/>),
        context: () => context
      });
    }
  });

  FlowRouter.notFound = {
    action: () => {
      FlowRouter.go('404');
    }
  };
}

export const RouteSettings = {
  infiniteScrollableRoutes: ['ico.home', 'ico.index', 'ico.favourites', 'ico.concepts']
};
