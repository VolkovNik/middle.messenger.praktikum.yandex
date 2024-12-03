import './css/main.scss';

import { LoginPage } from '@/pages/authorization/LoginPage';
import { SignupPage } from '@/pages/authorization/SignupPage';
import { Page404 } from '@/pages/errors/404';
import { ErrorPage } from '@/pages/errors/error';
import { SettingsPage } from '@/pages/settings/settings';
import { UpdateSettingsPage } from '@/pages/settings/update-settings';
import { ChatsPage } from '@/pages/chats';
import { router } from '@/utils/router';

document.addEventListener('DOMContentLoaded', () => {
  router
    .use('/', LoginPage)
    .use('/sign-up', SignupPage)
    .use('/settings', SettingsPage)
    .use('/update-settings', UpdateSettingsPage)
    .use('/messenger', ChatsPage)
    .use('/error', ErrorPage)
    .use('/404', Page404)
    .start();
});
