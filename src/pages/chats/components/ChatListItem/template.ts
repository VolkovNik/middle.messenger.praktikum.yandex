export const template = `
<div class="chat_item">
    <div class="chat_item__avatar">
        {{#if avatar}}
            <img src="{{ avatar }}" alt="Аватар" />
        {{else}}
            <div class="chat_item__avatar_empty">
                {{{ avatarStub }}}
            </div>
        {{/if}}
    </div>
    {{{avatar}}}
    <div class="chat_item__body">
        <div class="chat_item__body_title">{{ title }}</div>
        {{#if message}}
            <div class="chat_item__body_message">{{ message }}</div>
        {{/if}}
    </div>
    <div class="chat__info">
        <div class="chat_item__info_time">{{{ time }}}</div>
        {{{unreadMessages}}}
    </div>
</div>
`;
