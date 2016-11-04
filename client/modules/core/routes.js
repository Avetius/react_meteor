import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';

import AddIco from './containers/addIco';
import NotFound from './containers/notFound';


export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'ico.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AddIco />)
      });
    }
  });

  FlowRouter.route('/admin/add-ico', {
    name: 'add-ico',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AddIco/>)
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
