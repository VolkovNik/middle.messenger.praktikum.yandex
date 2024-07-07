export const template = `
<button
        class="button_img"
        {{#if type}}
            type={{ type }}
        {{/if}}
>
    <img alt={{ alt }} src={{ src }} />
</button>
`;
