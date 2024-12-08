export const template = `
<div>
  <div class="change_avatar">
      {{#if avatarName }}
        {{{ avatarName }}}
      {{else}}
        {{{ avatarInput }}}
      {{/if}}
      {{{ confirmButton }}}
  </div>   
  {{#if error}}
      <div class="change_avatar_error">{{ error }}</div>
  {{/if}}
</div>
`;
