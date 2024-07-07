export const template = `
<label for={{ id }}>{{#if placeholder}}{{ placeholder }}{{/if}}</label>
    <input
            id={{ id }}
            class="input"
            {{#if placeholder}}placeholder={{ placeholder }}{{/if}}
            name={{ name }}
            value={{ value }}
>
{{#if error}}
            <div class="input_error">{{ error }}</div>
{{/if}}
`;