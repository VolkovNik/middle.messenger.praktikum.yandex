export const template = `
<label for={{ id }}></label>
    <input
            id={{ id }}
            class="chat_input"
            {{#if placeholder}}placeholder={{ placeholder }}{{/if}}
            name={{ name }}
            value={{ value }}
>
{{#if error}}
            <div class="chat_input_error">{{ error }}</div>
{{/if}}
`;
