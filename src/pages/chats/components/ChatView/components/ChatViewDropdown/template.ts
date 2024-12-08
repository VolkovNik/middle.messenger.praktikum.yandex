export const template = `
<div class="dropdown">
    {{{ addUserModal }}}
    {{{ deleteUserModal }}}
   {{{ chatUsersModal }}}
    <div class="dropdown__icon">
      <img alt="more icon" src="{{ moreIcon }}" />
    </div>
    <div class="dropdown__menu">
      {{{ addUserDropdownItem }}}
      {{{ deleteUserDropdownItem }}}
      {{{ chatUsersDropdownItem }}}
    </div>  
</div> 
`;
