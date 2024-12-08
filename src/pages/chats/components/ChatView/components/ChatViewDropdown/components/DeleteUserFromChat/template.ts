export const template = `
<div class="delete_user">
    {{{ userIdInput }}}
    {{#if error}}
              <div class="delete_user_error">{{ error }}</div>
    {{/if}}
    {{{ confirmButton  }}}
</div>
`;
