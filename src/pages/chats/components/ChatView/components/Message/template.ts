export const template = `
<div class="message__container {{#if isMine}}message__container_mine{{/if}}">
    <div class="message {{#if isMine}}message_mine{{/if}}">
      <div>{{ content }}</div>
      <div class="message_time">{{ time }}</div>
    </div>
</div>
`;
