export const template = `
<div class="chat_users">
    {{ chatUsers }}
    {{#if error}}
              <div class="chat_users_error">{{ error }}</div>
    {{/if}}
</div>
`;
