import {Server} from "@helpers/server";
import {checkAuth} from "@helpers/checkAuth";
import {refreshToken} from "@requests/user";
import {pingHandler, stopPingHandler, messagesHandler} from "@/handlers/chatHandlers";

export const getChatToken = access_token => {
    return Server('get', 'user/v1/chat/token')
        .catch(checkAuth);
};

export const getChatterById = data => {
    return Server('get', 'user/v1/chat/chatter', data);
}

export const getChatterByRole = role => {
    return Server('get', 'user/v1/chat/role', {role});
}

export const sendChatCommand = command => {
    return Server('get', 'user/v1/chat/command', {command});
}

export const updateChatter = chatter => {
    return Server('post', 'user/v1/chat/updatechatter', chatter);
}

export const sendMessage = message => {
    return Server('post', 'user/v1/chat/send', {message});
}

export const connectToChat = async (access_token) => {
    try {
        await refreshToken(access_token);
        const token = await getChatToken(access_token);

        const socket = new WebSocket('wss://open-chat.trovo.live/chat');

        socket.onopen = event => {
            socket.send(JSON.stringify({
                "type": "AUTH",
                "nonce": "erfgthyjuikjmuhngb",
                "data": {
                    "token": token
                }
            }));

            socket.send(JSON.stringify({
                    "type": "PING",
                    "nonce": "PING_randomstring"
                })
            );
        };

        socket.onmessage = event => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case 'CHAT':
                    const {data: msg} = data;
                    messagesHandler(msg, socket);
                    break;
                case  'PONG':
                    const {gap} = data.data;
                    pingHandler(gap, socket);
                    break;
            }
        }

        const close = () => {
            stopPingHandler();
            socket.close();
        };

        return close;
    } catch (e) {
        console.log('err connect to chat', e)
    }
};