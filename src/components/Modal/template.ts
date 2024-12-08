export const template = `

<div class="overlay {{#unless isOpen}} overlay_hidden {{/unless}}">
    <div class="modal">
        <div class="modal__title">{{{ title }}}</div>
        <div class="modal__children">
            {{{ children }}}
        </div>
    </div>
</div>
`;
