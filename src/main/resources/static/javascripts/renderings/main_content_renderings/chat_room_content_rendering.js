async function renderChatRoom() {
    let chatRooms = getChatRooms();
    chatRooms.sort((a,b) => {
        return a._mails.sort((a,b) => {
            return date.parse(a._timestamp).toEpochMilli() -
                date.parse(b._timestamp).toEpochMilli()
        })[0] - b._mails.sort((a,b) => {
            return date.parse(a._timestamp).toEpochMilli() -
                date.parse(b._timestamp).toEpochMilli()
        })[0]
    });

    let leftSection = ``;
    chatRooms.forEach((chatRoom) => {
        leftSection += `
            <div class="container">
                <div class="wrapper">
                    <a onclick="chooseChatRoom(${chatRoom})" class="pressable_title">
                        ${chatRoom.title}
                    </a>
                </div>
            </div>
        `;
    });

    let chatRoom = getChosenChatRoom();
    if (chatRoom === undefined)
        chatRoom = chatRooms[0];

    let chatterTitles = "";
    chatRoom.chatters.forEach((chatter,index) => {
        chatterTitles += chatter.username;
        if (index < chatRoom.chatters.length)
            chatterTitles += ", ";
    })
    const rightSection = (chatRoom !== undefined ? `
        <section>
            <h2>
                ${chatRoom.title} |
            </h2>
            <p>
                ${chatterTitles}
            </p>
        </section>
        <section>
            
        </section>
    ` : `
        <p>
    `);
    document.getElementById("main_content").innerHTML = `
        <section id="chat_rooms_container">
            <div class="wrapper">
                ${leftSection}
            </div>
        </section>
        <section>
            ${rightSection}
        </section>
    `;
}

function chooseChatRoom(chatRoom) {
    sessionStorage.setItem("chosen_chat_room_id", chatRoom.id);
    sessionStorage.setItem("chosen_chat_room_title", chatRoom.title)
    saveMails({
        mails: chatRoom.mails._data,
        id: "chosen_chat_room"
    });
    saveChatters({
        chatters: chatRoom.chatters._data,
        id: "chosen_chat_room"
    });
    savePrimitiveUser({
        user: chatRoom.responsible,
        id: "chosen_chat_room",
        kind: "responsible"
    });
    sessionStorage.setItem("chosen_chat_room_answering_time", chatRoom.answeringTime);
    sessionStorage.setItem("chosen_chat_room_is_answered", chatRoom.isAnswered);
}

function getChosenChatRoom() {
    return {
        id: sessionStorage.getItem("chosen_chat_room_id"),
        title: sessionStorage.getItem("chosen_chat_room_title"),
        mails: getMails({id: "chosen_chat_room"}),
        chatters: getChatters({id: "chosen_chat_room"}),
        responsible: getPrimitiveUser({
            id: "chosen_chat_room",
            kind: "responsible"
        }),
        answeringTime: sessionStorage.getItem("chosen_chat_room_answering_time"),
        isAnswered: sessionStorage.getItem("chosen_chat_room_is_answered")
    };
}