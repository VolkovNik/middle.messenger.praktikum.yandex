import { renderDOM } from '@/utils/renderDOM';

import './css/main.scss';

import { MainPage } from '@/pages/main';
import { LoginPage } from '@/pages/authorization/LoginPage';
import { SignupPage } from '@/pages/authorization/SignupPage';
import { Page404 } from '@/pages/errors/404';
import { Block } from '@/utils/block';
import { ErrorPage } from '@/pages/errors/error';
import { SettingsPage } from '@/pages/settings/settings';
import { UpdateSettingsPage } from '@/pages/settings/update-settings';
import { ChatsPage } from '@/pages/chats';

const Pages: Record<string, Block> = {
  '/login': new LoginPage({}),
  '/signup': new SignupPage({}),
  '/404': new Page404({}),
  '/error': new ErrorPage({}),
  '/': new MainPage(),
  '/settings': new SettingsPage({}),
  '/update-settings': new UpdateSettingsPage({}),
  '/chats': new ChatsPage({}),
};

document.addEventListener('DOMContentLoaded', () => {
  if (Pages[window.location.pathname]) {
    renderDOM('#app', Pages[window.location.pathname]);
  } else {
    renderDOM('#app', Pages['/404']);
  }
});
