export const template = `
 <main class="container">
            <div class="container__return-back">
                {{{ returnButton }}}
            </div>
            <div class="settings-page">
                <form class="settings-page__form">
                    <div class="settings-page__content">
                        <div class="settings-page__content_item">
                            <div>
                                Почта
                            </div>
                            <div>
                                {{{ mailInput }}}
                            </div>
                        </div>
                        <div class="settings-page__content_item">
                            <div>
                                Логин
                            </div>
                            <div>
                                {{{ loginInput }}}
                            </div>
                        </div>
                        <div class="settings-page__content_item">
                            <div>
                                Имя
                            </div>
                            <div>
                                {{{ firstNameInput }}}
                            </div>
                        </div>
                        <div class="settings-page__content_item">
                            <div>
                                Фамилия
                            </div>
                            <div>
                                {{{ secondNameInput }}}
                            </div>
                        </div>
                        <div class="settings-page__content_item">
                            <div>
                                Имя в чате
                            </div>
                            <div>
                                {{{ displayNameInput }}}
                            </div>
                        </div>
                        <div class="settings-page__content_item">
                            <div>
                                Телефон
                            </div>
                            <div>
                                {{{ telephoneNumberInput }}}
                            </div>
                        </div>
                    </div>
                    <div class="settings-page__footer settings-page__footer_save">
                        {{{ saveChangesButton }}}
                    </div>
                    {{#if error}}
                        <div class="settings-page__footer_error">{{ error }}</div>
                    {{/if}}
                </form>
            </div>
        </main>
`;
