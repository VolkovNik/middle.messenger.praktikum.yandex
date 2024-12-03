export const template = `
<main class="chats-page">
{{{ createChatModal }}}
            <div class="list">
                <div class="list__header">
                    <div class="list__header_link">
                        {{{ link }}}
                    </div>
                    {{{ createChatButton }}}
                </div>
                <div class="list__body">
                    {{#if chatItems}}
                        {{{ chatItems }}}
                    {{else }}
                        <div class="list__body_empty">
                            <h3>Чатов нет</h3>
                        </div>
                    {{/if}}
                </div>
            </div>
            <div class="chats-page__chat_container">
                {{#if currentChat}}
                        {{{ chatView }}}
                    {{else }}
                        <div class="list__body_empty">
                            <h3>Выберите чат</h3>
                        </div>
                    {{/if}}
            </div>
        </main>
`;
