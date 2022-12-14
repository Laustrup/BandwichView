function saveUser(user) {
    const id = user._primaryId;
    sessionStorage.setItem("user_id",id);
    sessionStorage.setItem("username",user._username);
    sessionStorage.setItem("firstname",user._firstName);
    sessionStorage.setItem("lastname",user._lastName);
    sessionStorage.setItem("description",user._description);
    saveContactInformation({
        info: user._contactInfo,
        id: "user_" + id,
    });
    saveAlbums({
        albums: user._albums._data,
        id: "user_" + id
    });
    saveRatings(user._ratings._data);
    saveEvents({
        events: user._events._data,
        id: "user_" + id
    });
    saveChatRooms({
        chatRooms: user._chatRooms._data,
        user: user,
    });
    saveSubscription(user._subscription);
    saveBulletins(user._bulletins._data);
    saveIdols(user._idols._data);
    saveFans(user._fans._data);
    saveGigs(user._gigs._data);
    saveBands(user._bands._data);
    saveRunner(user._runner);
    saveRequests(user._requests._data);
    saveMembers(user._members._data);
    saveLocation(user._location);
    saveGearDescription(user._gearDescription);
    saveSize(user._size);
    sessionStorage.setItem("timestamp",user._timestamp);

    const item = getUser();
    return item;
}

function getUser() {
    let user = {
        primaryId: undefined,
        username: undefined,
        description: undefined
    };

    user.primaryId = sessionStorage.getItem("user_id");
    user.username = sessionStorage.getItem("username");
    user.description = sessionStorage.getItem("description");

    return user;
}

function saveContactInformation(item) {
    const index = (item.index !== undefined ? "_" + item.index : "");
    sessionStorage.setItem(item.id + "_email" + index, item._email);
    sessionStorage.setItem(item.id + "_phone_country_title" + index, item._phone._country._title);
    sessionStorage.setItem(item.id + "_phone_country_indexes" + index, item._phone._country._indexes);
    sessionStorage.setItem(item.id + "_phone_number_digits" + index, item._phone._country._firstPhoneNumberDigits);
    sessionStorage.setItem(item.id + "_phone_numbers" + index, item._numbers);
    sessionStorage.setItem(item.id + "_phone_is_mobile" + index, item._mobile);
    sessionStorage.setItem(item.id + "_street" + index, item._street);
    sessionStorage.setItem(item.id + "_floor" + index, item._floor);
    sessionStorage.setItem(item.id + "_postal" + index, item._postal);
    sessionStorage.setItem(item.id + "_city" + index, item._city);
    sessionStorage.setItem(item.id + "_country_title" + index, item._country._title);
    sessionStorage.setItem(item.id + "_country_indexes" + index, item._country._indexes);
    sessionStorage.setItem(item.id + "_country_number_digits" + index, item._country._firstPhoneNumberDigits);
}

function saveAlbums(item) {
    const albums = item.albums;
    for (let i = 0; i < albums.length; i++) {
        const album = albums[i],
            index = (item.index !== undefined ? item.index : i);
        sessionStorage.setItem(item.id + "_album_id_" + index, album._primaryId);
        sessionStorage.setItem(item.id + "_album_title_" + index, album._title);
        saveAlbumItems(album);
        saveAuthor(album);
        sessionStorage.setItem("album_timestamp_"+index,album._timestamp);
    }
    sessionStorage.setItem("album_amount",albums.length);
}

function saveAlbumItems(album) {
    for (let i = 0; i < album._items.length; i++) {
        let item = album._items._data[i];
        saveTags(item._tags._data);
        sessionStorage.setItem(album._primaryId + "_item_endpoint",item._endpoint);
    }
    sessionStorage.setItem(album._primaryId + "_item_amount",album._items._data.length);
}

function saveTags(item) {
    for (let i = 0; i < item.length; i++)
        saveAuthor(tag._author);
    sessionStorage.setItem(item._endpoint + "_tags_length", item._tags._data.length)
}

function saveRatings(ratings) {
    for (let i = 0; i < ratings.length; i++) {
        let rating = ratings[i];
        let appointedId = rating._appointed._primaryId,
            judgeId = rating._judge._primaryId;
        let appointedIndex = (sessionStorage.getItem(appointedId + "_rating_appointed_amount") !== undefined ?
                sessionStorage.getItem(appointedId + "_rating_appointed_amount") : 0),
            judgeIndex = (sessionStorage.getItem(judgeId + "_rating_judge_amount") !== undefined ?
                sessionStorage.getItem(judgeId + "_rating_judge_amount") : 0);

        sessionStorage.setItem(appointedId + "_rating_appointed_" + appointedIndex, rating._appointed._primaryId);
        sessionStorage.setItem(appointedId + "_rating_appointed_value_" + appointedIndex, rating._value);
        sessionStorage.setItem(appointedId + "_rating_appointed_comment_" + appointedIndex, rating._comment);
        sessionStorage.setItem(appointedId + "_rating_appointed_amount", appointedIndex.toString());

        sessionStorage.setItem(judgeId + "_rating_judge_" + judgeIndex, rating._judge._primaryId);
        sessionStorage.setItem(judgeId + "_rating_judge_value_" + judgeIndex, rating._value);
        sessionStorage.setItem(judgeId + "_rating_judge_comment_" + judgeIndex, rating._comment);
        sessionStorage.setItem(judgeId + "_rating_judge_amount", judgeIndex.toString());

        appointedIndex = 0;
        judgeIndex = 0;
    }
}

function saveEvents(events) {
    for (let i = 0; i < events.length; i++) {
        let event = events[i],
            id = item.id + "_event";
        sessionStorage.setItem(id + "_open_doors_"+i, event._openDoors);
        sessionStorage.setItem(id + "_start_"+i, event._start);
        sessionStorage.setItem(id + "_end_"+i, event._end);
        sessionStorage.setItem(id + "_length_"+i, event._length);
        sessionStorage.setItem(id + "_description_"+i, event._description);
        sessionStorage.setItem(id + "_is_voluntary_"+i, event._voluntary._truth);
        sessionStorage.setItem(id + "_is_public_"+i, event._public._truth);
        sessionStorage.setItem(id + "_is_cancelled_"+i, event._cancelled._truth);
        sessionStorage.setItem(id + "_is_sold_out_"+i, event._soldOut._truth);
        sessionStorage.setItem(id + "_location_"+i, event._location);
        sessionStorage.setItem(id + "_price_"+i, event._price);
        sessionStorage.setItem(id + "_tickets_url_"+i, event._ticketsURL);
        saveContactInformation({
            info: event._contactInfo,
            id: id,
            index: i
        });
        saveGigs({
            gigs: event._gigs._data,
            type: id,
            index: i
        });
        saveAuthor(event._venue);
        saveRequests({
           requests: event._requests._data,
           type: id,
           index: i
        });
        saveParticipations({
            participations: event._participations,
            event: event,
            index: i
        });
        saveBulletins({
            bulletins: event._bulletins._data,
            type: id,
            index: i
        });
        saveAlbums({
            albums: event._albums._data,
            type: id,
            id: "event_id_" + event._primaryId,
            index: i
        });
    }
    sessionStorage.setItem("event_amount", events.length);
}

function saveParticipations(item) {
    const participations = item.participations;
    for (let i = 0; i < participations.length; i++) {
        const participation = participations[i];
        let type = "participation";
        saveAuthor({
            author: participation._participant,
            userKind: "participant",
            type: type,
            index: i
        });

        type += "_participation_" + participation._primaryId + "_" + participation._secondaryId;
        sessionStorage.setItem(type + "_open_doors_"+i, item.event._openDoors);
        sessionStorage.setItem(type + "_start_"+i, item.event._start);
        sessionStorage.setItem(type + "_end_"+i, item.event._end);
        sessionStorage.setItem(type + "_length_"+i, item.event._length);
        sessionStorage.setItem(type + "_description_"+i, item.event._description);
        sessionStorage.setItem(type + "_is_voluntary_"+i, item.event._voluntary._truth);
        sessionStorage.setItem(type + "_is_public_"+i, item.event._public._truth);
        sessionStorage.setItem(type + "_is_cancelled_"+i, item.event._cancelled._truth);
        sessionStorage.setItem(type + "_is_sold_out_"+i, item.event._soldOut._truth);
        sessionStorage.setItem(type + "_location_"+i, item.event._location);
        sessionStorage.setItem(type + "_price_"+i, item.event._price);
        sessionStorage.setItem(type + "_tickets_url_"+i, item.event._ticketsURL);

        sessionStorage.setItem(type + "_type_"+i, participation._type);
    }
    sessionStorage.setItem(item.event._primaryId + "_participations_amount",participations.length);
}

function saveChatRooms(item) {
    const chatRooms = item.chatRooms;
    for (let i = 0; i < chatRooms; i++) {
        const chatRoom = chatRooms[i];
        sessionStorage.setItem(item.user._primaryId + "_chat_room_id_"+i,chatRoom._primaryId);
        saveMails({
            chatRoom: chatRoom,
            user: item.user,
            chatRooms: item.chatRooms,
            index: i
        });
        saveChatters({
            chatRoom: chatRoom,
            chatRooms: chatRooms,
            user: user,
            chatters: chatRoom._chatters._data,
            index: i
        });
        sessionStorage.setItem("")
    }
    sessionStorage.setItem(item.user._primaryId + "_chat_room_amount", chatRooms.length);
}

function saveMails(item) {

}

function saveChatters(item) {

}

function saveSubscription(subscription) {

}

function saveBulletins(bulletins) {

}

function saveIdols(idols) {

}

function saveFans(fans) {

}

function saveGigs(gigs) {

}

function saveBands(bands) {

}

function saveRunner(runner) {

}

function saveRequests(requests) {

}

function saveMembers(members) {

}

function saveLocation(location) {

}

function saveGearDescription(gear) {

}

function saveSize(size) {

}

function saveAuthor(item) {

}


function getAuthor(id) {

}
