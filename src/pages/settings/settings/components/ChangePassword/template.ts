export const template = `
<div class="change_password">
    {{{ oldPasswordInput }}}
    {{{ newPasswordInput }}}
    {{{ repeatPasswordInput }}}
    {{#if error}}
              <div class="change_password_error">{{ error }}</div>
    {{/if}}
    {{{ confirmButton  }}}
</div>
`;
