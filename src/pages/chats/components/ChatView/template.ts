export const template = `
            <div class="chat">
                <div class="chat__header">
                    <div class="chat__header_user">
                        <div class="chat_item__avatar_empty">
                            {{{ avatarStub }}}
                        </div>
                        <div>
                            {{ title }}
                        </div>
                    </div>
                  {{{ chatViewDropdown }}}
                </div>
                <div class="chat__body">
                    {{#if messages}}
                        {{{ messages }}}
                    {{else }}
                        <div class="list__body_empty">
                            <h3>Сообщений нет</h3>
                        </div>
                    {{/if}}
                </div>
                <div class="chat__footer">
                    {{{ sendForm }}}
                </div>
            </div>
`;
