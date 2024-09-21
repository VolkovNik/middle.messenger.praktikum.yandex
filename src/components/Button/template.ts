export const template = `
<button
        class="button"
        {{#if type}}
            type={{ type }}
        {{/if}}
>
    {{ text }}
</button>
`;
