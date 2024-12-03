export const template = `
<div class="create_chat">
    {{{ chatNameInput }}}
    {{#if error}}
              <div class="create_chat_error">{{ error }}</div>
    {{/if}}
    {{{ confirmButton  }}}
</div>
`;
