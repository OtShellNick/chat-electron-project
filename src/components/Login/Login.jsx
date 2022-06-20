import React from "react";

import './Login.scss';

const Login = () => <div>
    <a href={`https://open.trovo.live/page/login.html?client_id=${CLIENT_ID}
&response_type=code
&scope=channel_details_self+channel_update_self+user_details_self
+channel_subscriptions+chat_send_self
+chat_connect+send_to_my_channel+manage_messages
&redirect_uri=https://trovo-bot-front.herokuapp.com/
&state=myntgbdrfsed`}>
        Войти
    </a>
</div>

export default Login;