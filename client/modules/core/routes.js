import React from 'react';
import {mount} from 'react-mounter';
import {Accounts} from 'meteor/std:accounts-ui';

import MainLayout from './components/main_layout';

import AddOrEditIco from './containers/addOrEditIco';
import IcoFrontList from './containers/icoFrontList';
import IcoProfile from './containers/icoProfile'
import NotFound from './containers/notFound';


export default function (inject, context, actions) {
  const {FlowRouter, LocalState} = context;

  // inject function doesn't work as expected and it will not provide context object to MainLayout so we need it inject explicitly in route defs
  const MainLayoutCtx = inject(MainLayout);

  FlowRouter.route('/', {
    name: 'ico.home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<IcoFrontList mode="published"  />),
        context: () => context
      });
    }
  });

  FlowRouter.route('/admin/concepts', {
    name: 'ico.concepts',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<IcoFrontList mode="concepts" />),
        context: () => context
      });
    }
  });

  FlowRouter.route('/profile/:icoSlug', {
    name: 'ico.profile',
    action({icoSlug}) {
      mount(MainLayoutCtx, {
        content: () => (<IcoProfile icoSlug={icoSlug} />),
        context: () => context
      })
    }
  });

  FlowRouter.route('/admin/add-ico', {
    name: 'ico.add',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco editMode={{active: false}} />),
        context: () => context
      });
    }
  });

  FlowRouter.route('/admin/edit-ico/:icoSlug', {
    name: 'ico.edit',
    action({icoSlug}) {
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco editMode={{active: true, icoId: icoSlug}} />),
        context: () => context
      });
    }
  });

  FlowRouter.route('/login', {
    name: 'login',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Accounts.ui.LoginForm />),
        context: () => context
      });
    }
  });

  FlowRouter.route('/not-found', {
    name: '404',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NotFound/>),
        context: () => context
      });
    }
  });

  FlowRouter.route('/:fallback', {
    name: 'fallback',
    action() {
      FlowRouter.go('404');
    }
  });
}
