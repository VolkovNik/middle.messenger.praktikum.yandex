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
                </form>
            </div>
        </div>
`;
