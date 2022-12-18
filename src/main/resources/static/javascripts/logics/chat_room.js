async function sendMessage() {
    const message = document.getElementById("new_message_content").value,
        isPublic = document.getElementById("is_public").value;
    let chatRoom = getChosenChatRoom();

    const user = getUser();
    chatRoom.mails.push({
        _chatRoom: chatRoom,
        _author: user,
        _content: message,
        _sent: true,
        _edited: constructPlato({boolean: false}),
        _public: isPublic,
        _timestamp: Date.now()
    });
    const response = (await (await fetch(apiChatRoomUpsert, convertChatRoomToAPI(chatRoom))).json())._element;

    saveChatRooms({
        chatRooms: [response],
        id: "user_" + user.id
    });
}

async function editMessage(id) {

}

async function createChatRoom() {
    const title = document.getElementById("title").value,
        message = document.getElementById("new_message_content").value,
        isPublic = document.getElementById("is_public").value;
    let chatRoom = getChosenChatRoom();

    const responsible = (await (await fetch(apiUserGetURL(
        document.getElementById("responsible_id").value))).json())._element;
}

function saveDraft(draft) { sessionStorage.setItem(draft.id + "_draft",draft.message); }
function getDraft(id) {
    return (sessionStorage.getItem(id + "_draft") !== undefined ?
        sessionStorage.getItem(id + "_draft") : "");
}

async function changeReceiverDataList(search) {
    const response = (await (await fetch(apiSearchURL(search))).json())._element._users._data;
    let options = ``;
    response.forEach((user) => {
        options += `<option value="${user._id}">${user._username}</option>`;
    });

    document.getElementById("responsible_id").innerHTML = `
        <datalist>
            ${options}
        </datalist>
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
    if (sessionStorage.getItem("chosen_chat_room_id") !== undefined)
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
    else
        return undefined;
}

function convertChatRoomFromAPI(chatRoom) {
    return {
        id: chatRoom._id,
        mails: chatRoom._mails,
        chatters: chatRoom._chatters,
        responsible: chatRoom._responsible,
        isAnswered: chatRoom._answered
    }
}

function convertChatRoomToAPI(chatRoom) {
    return {
        _id: chatRoom.id,
        _mails: chatRoom.mails,
        _chatters: chatRoom.chatters,
        _responsible: chatRoom._responsible,
        _answeringTime: chatRoom.answeringTime,
        _answered: chatRoom.isAnswered
    }
}