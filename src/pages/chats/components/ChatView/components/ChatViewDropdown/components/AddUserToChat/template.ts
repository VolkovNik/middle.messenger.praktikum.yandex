export const template = `
<div class="add_user">
    {{{ userIdInput }}}
    {{#if error}}
              <div class="add_user_error">{{ error }}</div>
    {{/if}}
    {{{ confirmButton  }}}
</div>
`;
