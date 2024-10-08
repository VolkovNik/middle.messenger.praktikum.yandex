export const template = `
<div class="container">
            <div class="container__return-back">
                <a href="/chats">
                    <img src="../../../assets/icon-back.svg" alt="icon-back" />
                </a>
            </div>
            <div class="settings-page">
                <div class="settings-page__title">
                    <div class="title__avatar">
                        <img src="../../../assets/avatar-empty.svg" alt="avatar-empty" />
                    </div>
                    <h3 class="title__name">Никита</h3>
                </div>
                <div class="settings-page__content">
                    <div class="settings-page__content_item">
                        <div>
                            Почта
                        </div>
                        <div>
                            nikitavolkov1707@gmail.com
                        </div>
                    </div>
                    <div class="settings-page__content_item">
                        <div>
                            Логин
                        </div>
                        <div>
                            HukumkaBanana
                        </div>
                    </div>
                    <div class="settings-page__content_item">
                        <div>
                            Имя
                        </div>
                        <div>
                            Никита
                        </div>
                    </div>
                    <div class="settings-page__content_item">
                        <div>
                            Фамилия
                        </div>
                        <div>
                            Волков
                        </div>
                    </div>
                    <div class="settings-page__content_item">
                        <div>
                            Имя в чате
                        </div>
                        <div>
                            Никитос
                        </div>
                    </div>
                    <div class="settings-page__content_item">
                        <div>
                            Телефон
                        </div>
                        <div>
                            +7 (999) 999 99 99
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
        </div>
`;
