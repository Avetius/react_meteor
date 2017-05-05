import React from 'react';
import {mount} from 'react-mounter';
import SignupLoginMgmt from './components/signupLoginMgmt';

import MainLayout from './components/main_layout';

import AddOrEditIco from './containers/addOrEditIco';
import IcoFrontList from './containers/icoFrontList';
import IcoProfile from './containers/icoProfile'
import NotFound from './containers/notFound';
import IcoManagement from './containers/icoManagement';


export default function (inject, context, actions) {
  const { FlowRouter } = context;

  // inject function doesn't work as expected and it will not provide context object to MainLayout so we need it inject explicitly in route defs
  const MainLayoutCtx = inject(MainLayout);

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

  FlowRouter.route('/admin/concepts/:subView', {
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

  FlowRouter.route('/admin/add-ico', {
    name: 'ico.add',
    action() {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco editMode={{active: false}} />),
        context: () => context
      });
    }
  });

  FlowRouter.route('/admin/edit-ico/:icoSlug', {
    name: 'ico.edit',
    action({icoSlug}) {
      actions.icoProject.resetInfiniteScrolling(context);
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco editMode={{active: true, icoId: icoSlug}} />),
        context: () => context
      });
    }
  });

  FlowRouter.route('/admin/login', {
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
