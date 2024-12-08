export const template = `
<main class="container">
            {{{ changePasswordModal }}}
            {{{ changeAvatarModal }}}
            <div class="container__return-back">
                {{{ returnButton }}}
            </div>
            <div class="settings-page">
                <div class="settings-page__title">
                    {{{ avatar }}}
                    <h3 class="title__name">{{{ first_name }}}</h3>
                </div>
                <div class="settings-page__content">
                    <div class="settings-page__content_item">
                        <div>
                            Почта
                        </div>
                        <div>
                            {{{ email }}}
                        </div>
                    </div>
                    <div class="settings-page__content_item">
                        <div>
                            Логин
                        </div>
                        <div>
                            {{{ login }}}
                        </div>
                    </div>
                    <div class="settings-page__content_item">
                        <div>
                            Имя
                        </div>
                        <div>
                           {{{ first_name }}}
                        </div>
                    </div>
                    <div class="settings-page__content_item">
                        <div>
                            Фамилия
                        </div>
                        <div>
                            {{{ second_name }}}
                        </div>
                    </div>
                    <div class="settings-page__content_item">
                        <div>
                            Имя в чате
                        </div>
                        <div>
                            {{{ display_name }}}
                        </div>
                    </div>
                    <div class="settings-page__content_item">
                        <div>
                            Телефон
                        </div>
                        <div>
                            {{{ phone }}}
                        </div>
                    </div>
                </div>
                <div class="settings-page__footer">
                    <div class="settings-page__footer_item">
                        {{{ navigateToUpdateSettingButton }}}
                    </div>
                    <div class="settings-page__footer_item">
                        {{{ navigateToUpdatePasswordButton }}}
                    </div>
                    <div class="settings-page__footer_item">
                        {{{ exitButton }}}
                    </div>

                </div>
            </div>
        </m>
`;
