import React from 'react';
import {mount} from 'react-mounter';
import {Accounts} from 'meteor/std:accounts-ui';

import MainLayout from './components/main_layout';

import AddOrEditIco from './containers/addOrEditIco';
import IcoFrontList from './containers/icoFrontList';
import IcoProfile from './containers/icoProfile'
import NotFound from './containers/notFound';


export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'ico.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<IcoFrontList />)
      });
    }
  });

  FlowRouter.route('/admin/concepts', {
    name: 'ico.concepts',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<IcoFrontList mode="concepts" />)
      });
    }
  });

  FlowRouter.route('/profile/:icoSlug', {
    name: 'ico.profile',
    action({icoSlug}) {
      mount(MainLayoutCtx, {
        content: () => (<IcoProfile icoSlug={icoSlug} />)
      })
    }
  });

  FlowRouter.route('/admin/add-ico', {
    name: 'ico.add',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco editMode={{active: false}} />)
      });
    }
  });

  FlowRouter.route('/admin/edit-ico/:icoSlug', {
    name: 'ico.edit',
    action({icoSlug}) {
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco editMode={{active: true, icoId: icoSlug}} />)
      });
    }
  });

  FlowRouter.route('/login', {
    name: 'login',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Accounts.ui.LoginForm />)
      });
    }
  });

  FlowRouter.route('/:callback', {
    name: '404',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NotFound/>)
      });
    }
  });
}
