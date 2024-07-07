export const template = `
<div class="chats-page">
            <div class="list">
                <div class="list__header">
                    <div class="list__header_link">
                        {{{ link }}}
                    </div>
                    <form>
                        <label>
                            <input placeholder="Поиск" name="message">
                        </label>
                    </form>
                </div>
                <div class="list__body">
                    <h3>Чатов нет</h3>
                </div>
            </div>
            <div class="chat">
                <div class="chat__header">
                    <div class="chat__header_user">
                        <div>
                            <img alt="avatar" src="../../assets/avatar.svg"/>
                        </div>
                        <div>
                            Эля
                        </div>
                    </div>
                  <div>
                      <img alt="more icon" src="../../assets/more.svg" />
                  </div>
                </div>
                <div class="chat__body"><h3>Сообщений нет</h3></div>
                <div class="chat__footer">
                    <div>
                        <img alt="attach icon" src="../../assets/attacg.svg" />
                    </div>   
                    {{{ sendForm }}}
                </div>
            </div>
        </div>
`;
