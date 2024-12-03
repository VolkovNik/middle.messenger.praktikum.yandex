export const template = `
<main class="authorization">
    <h2 class="authorization__title">Регистрация</h2>
    <form class="authorization__form">
        <div class="form__inputs">
            {{{ mailInput }}}
            {{{ loginInput }}}
            {{{ firstNameInput }}}
            {{{ secondNameInput }}}
            {{{ telephoneNumberInput }}}
            {{{ passwordInput }}}
            {{{ repeatPasswordInput }}}
        </div>
        <div class="form__buttons">
            {{{ button }}}
            {{#if error}}
              <div class="form__buttons_error">{{ error }}</div>
             {{/if}}
            {{{ link }}}
        </div>
    </form>
</div>
`;
