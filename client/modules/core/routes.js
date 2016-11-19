import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';

import AddOrEditIco from './containers/addOrEditIco';
import NotFound from './containers/notFound';


export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'ico.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco />)
      });
    }
  });

  FlowRouter.route('/admin/add-ico', {
    name: 'ico.add',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco/>)
      });
    }
  });

  FlowRouter.route('/admin/edit-ico/:icoId', {
    name: 'ico.edit',
    action(icoId) {
      mount(MainLayoutCtx, {
        content: () => (<AddOrEditIco icoId={icoId} />)
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
