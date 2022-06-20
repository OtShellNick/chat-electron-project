import {getChatterById, getChatterByRole, sendChatCommand, updateChatter, sendMessage} from "@requests/chat";

let pingInterval = 0;

export const pingHandler = (gap, socket) => {
    if (pingInterval) clearInterval(pingInterval);

    pingInterval = setInterval(() => {
        socket.send(JSON.stringify({
                "type": "PING",
                "nonce": "PING_randomstring"
            })
        )
    }, gap * 1000);
};

export const stopPingHandler = () => {
    if (pingInterval) clearInterval(pingInterval);
};

export const messagesHandler = (messages, socket) => {
    const {chats} = messages;
    if (chats.length < 50) {
        chats.forEach(async (chat) => {
            const {type, nick_name, roles, sender_id} = chat;
            let message = '';

            switch (type) {
                case 0:
                    const chatter = await getChatterById(chat);
                    const mostSociableChatter = await getChatterByRole('Достоевский');

                    if (mostSociableChatter && chatter.nick_name !== mostSociableChatter.nick_name && chatter.roles && !chatter.roles.includes('streamer') && chatter.messages + 1 > mostSociableChatter.messages) {
                        await sendChatCommand(`removerole Достоевский ${mostSociableChatter.nick_name}`);
                        const index = mostSociableChatter.roles.findIndex(role => role === 'Достоевский');
                        mostSociableChatter.roles.splice(index, 1);
                        await updateChatter(mostSociableChatter);
                        const data = await sendChatCommand(`addrole Достоевский ${chatter.nick_name}`);
                        if (data.is_success) await sendMessage(`Поздравляем @${chatter.nick_name} с получением титула Достоевский, теперь ты признан самым общительным) @${mostSociableChatter.nick_name} теряет лидерство, но вернуть то всегда есть шанс!`);
                    }

                    await updateChatter({sender_id, roles, messages: chatter.messages + 1});
                    break;
                case 5004:
                    message = `@${nick_name} добро пожаловать на канал! :shocked Устраивайся по удобнее, приятного просмотра)`;
                    await sendMessage(message);
                    break;
                case 5003:
                    message = `@${nick_name} спасибо за подписку! :purpleheart Добро пожаловать в семью!`;
                    await sendMessage(message);
            }
        });
    }
    console.log(messages);
}