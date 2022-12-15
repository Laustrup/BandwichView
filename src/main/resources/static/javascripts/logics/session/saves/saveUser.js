function saveUser(user) {
    const id = user._primaryId;

    sessionStorage.setItem("user_id",id);
    sessionStorage.setItem("username",user._username);
    if (user._firstName !== undefined)
        sessionStorage.setItem("firstname",user._firstName);
    if (user._fullName !== undefined)
        sessionStorage.setItem("fullname", user._fullName);
    if (user._lastName !== undefined)
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
    if (user._ratings._data !== undefined)
        saveRatings(user._ratings._data);
    saveEvents({
        events: user._events._data,
        id: "user_" + id
    });
    saveChatRooms({
        chatRooms: user._chatRooms._data,
        id: "user_" + id
    });
    saveSubscription(user._subscription);
    if (user._bulletins._data !== undefined) {
        saveBulletins({
            bulletins: user._bulletins._data,
            id: "user_" + id
        });
    }
    if (user._idols._data !== undefined) {
        saveIdols({
            idols: user._idols._data,
            id: "user_" + id
        });
    }
    if (user._fans._data !== undefined) {
        saveFans({
            fans: user._fans._data,
            id: "user_" + id
        });
    }
    if (user._gigs._data !== undefined) {
        saveGigs({
            gigs: user._gigs._data,
            id: "user_" + id
        });
    }
    if (user._bands._data !== undefined) {
        saveBands({
            bands: user._bands._data,
            id: "user_" + id
        });
    }

    sessionStorage.setItem("runner",
        (user._runner !== undefined ? user._runner :
            user._gearDescription !== undefined ? user._gearDescription : undefined));

    if (user._requests._data !== undefined)
        saveRequests(user._requests._data);
    if (user._members._data !== undefined) {
        saveMembers({
            members: user._members._data,
            id: "user_" + id
        });
    }

    sessionStorage.setItem("location", (user._location !== undefined ? user._location : undefined));
    sessionStorage.setItem("size", (user._size !== undefined ? user._size : undefined));
    sessionStorage.setItem("timestamp",user._timestamp);

    return getUser();
}

function saveContactInformation(item) {
    const index = (item.index !== undefined ? "_" + item.index : "");
    function generateKey(content) { return item.id + content + index; }

    sessionStorage.setItem(generateKey("_email"), item._email);
    sessionStorage.setItem(generateKey("_phone_country_title"), item._phone._country._title);
    sessionStorage.setItem(generateKey("_phone_country_indexes"), item._phone._country._indexes);
    sessionStorage.setItem(generateKey("_phone_number_digits"), item._phone._country._firstPhoneNumberDigits);
    sessionStorage.setItem(generateKey("_phone_numbers"), item._numbers);
    sessionStorage.setItem(generateKey("_phone_is_mobile"), item._mobile);
    sessionStorage.setItem(generateKey("_street"), item._street);
    sessionStorage.setItem(generateKey("_floor"), item._floor);
    sessionStorage.setItem(generateKey("_postal"), item._postal);
    sessionStorage.setItem(generateKey("_city"), item._city);
    sessionStorage.setItem(generateKey("_country_title"), item._country._title);
    sessionStorage.setItem(generateKey("_country_indexes"), item._country._indexes);
    sessionStorage.setItem(generateKey("_country_number_digits"), item._country._firstPhoneNumberDigits);
}

function saveAlbums(item) {
    const albums = item.albums;
    for (let i = 0; i < albums.length; i++) {
        function generateKey(content) {
            return item.id + content + (item.index !== undefined ? item.index + "_" + i : i);
        }

        sessionStorage.setItem(generateKey("_album_id_"), album._primaryId);
        sessionStorage.setItem(generateKey("_album_title_"), album._title);
        saveAlbumItems({
            album: album,
            id: item.id + "_album",
            index: i
        });
        saveForeignUser({
            user: album._author,
            id: item.id + "_album",
            index: i
        });
        sessionStorage.setItem(generateKey("_album_timestamp_"),album._timestamp);
    }
    sessionStorage.setItem(item.id + "_album_amount", (albums.length).toString());
}

function saveAlbumItems(item) {
    const album = item.album;
    for (let i = 0; i < album._items.length; i++) {
        const item = album._items._data[i],
            index = item.index + "_" + i;
        saveTags({
            tag: item._tags._data,
            id: item.id + "_album",
            index: i
        });
        sessionStorage.setItem(item.id + "_item_endpoint_" + index, item._endpoint);
    }
    sessionStorage.setItem(item.id + "_item_amount_" + item.index, (album._items._data.length).toString());
}

function saveTags(item) {
    for (let i = 0; i < item.length; i++)
        saveForeignUser({
            user: item.tag._author,
            id: item.id + "_tag",
            index: i
        });
    sessionStorage.setItem(item.id + "_tags_length_" + item.index, (item._tags._data.length).toString())
}

function saveRatings(ratings) {
    for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];

        sessionStorage.setItem("rating_value_" + i, rating._value);
        sessionStorage.setItem("rating_comment_" + i, rating._comment);
        saveForeignUser({
            user: rating._judge,
            kind: "judge",
            index: i
        });
    }
    sessionStorage.setItem("rating_amount", (ratings.length).toString());
}

function saveEvents(item) {
    const events = item.events;
    for (let i = 0; i < events.length; i++) {
        const event = events[i],
            id = item.id + "_event",
            index = item.index + "_" + i;
        sessionStorage.setItem(id + "_open_doors_" + index, event._openDoors);
        sessionStorage.setItem(id + "_start_" + index, event._start);
        sessionStorage.setItem(id + "_end_" + index, event._end);
        sessionStorage.setItem(id + "_length_" + index, event._length);
        sessionStorage.setItem(id + "_description_" + index, event._description);
        sessionStorage.setItem(id + "_is_voluntary_" + index, event._voluntary._truth);
        sessionStorage.setItem(id + "_is_public_" + index, event._public._truth);
        sessionStorage.setItem(id + "_is_cancelled_" + index, event._cancelled._truth);
        sessionStorage.setItem(id + "_is_sold_out_" + index, event._soldOut._truth);
        sessionStorage.setItem(id + "_location_" + index, event._location);
        sessionStorage.setItem(id + "_price_" + index, event._price);
        sessionStorage.setItem(id + "_tickets_url_" + index, event._ticketsURL);
        saveContactInformation({
            info: event._contactInfo,
            id: id,
            index: i
        });
        saveGigs({
            gigs: event._gigs._data,
            id: id,
            index: i
        });
        saveForeignUser({
            user: event._venue,
            type: "venue",
            id: id,
            index: i
        });
        saveParticipations({
            participations: event._participations,
            event: event,
            id: id,
            index: i
        });
        saveBulletins({
            bulletins: event._bulletins._data,
            id: id,
            index: i
        });
        saveAlbums({
            albums: event._albums._data,
            id: id,
            index: i
        });
    }
    sessionStorage.setItem("event_amount", events.length);
}

function saveParticipations(item) {
    const participations = item.participations;
    for (let i = 0; i < participations.length; i++) {
        const participation = participations[i],
            index = item.index + "_" + i;
        saveForeignUser({
            user: participation._participant,
            type: "participant",
            kind: "participation",
            index: item.index,
            id: item.id + "_participation"
        });

        sessionStorage.setItem(id + "_id_" + index, item.event._primaryId);
        sessionStorage.setItem(id + "_open_doors_" + index, item.event._openDoors);
        sessionStorage.setItem(id + "_start_" + index, item.event._start);
        sessionStorage.setItem(id + "_end_" + index, item.event._end);
        sessionStorage.setItem(id + "_length_" + index, item.event._length);
        sessionStorage.setItem(id + "_description_" + index, item.event._description);
        sessionStorage.setItem(id + "_is_voluntary_" + index, item.event._voluntary._truth);
        sessionStorage.setItem(id + "_is_public_" + index, item.event._public._truth);
        sessionStorage.setItem(id + "_is_cancelled_" + index, item.event._cancelled._truth);
        sessionStorage.setItem(id + "_is_sold_out_" + index, item.event._soldOut._truth);
        sessionStorage.setItem(id + "_location_" + index, item.event._location);
        sessionStorage.setItem(id + "_price_" + index, item.event._price);
        sessionStorage.setItem(id + "_tickets_url_" + index, item.event._ticketsURL);
        sessionStorage.setItem(id + "_type_" + index, participation._type);
    }
    sessionStorage.setItem(item.event._primaryId + "_participations_amount",participations.length);
}

function saveChatRooms(item) {
    const chatRooms = item.chatRooms;
    for (let i = 0; i < chatRooms; i++) {
        const chatRoom = chatRooms[i],
            index = item.index + "_" + i;
        sessionStorage.setItem(item.id + "_chat_room_id_" + index,chatRoom._primaryId);
        saveMails({
            mails: chatRoom._mails._data,
            id: item.id + "_chat_room",
            index: i
        });
        saveChatters({
            chatters: chatRoom._chatters._data,
            id: item.id + "_chat_room",
            index: i
        });
        saveForeignUser({
            user: chatRoom._responsible,
            id: item.id + "_chat_room",
            kind: "chat_room_author",
            index: i
        });
        sessionStorage.setItem(item.id + "_chat_room_answering_time_" + index, chatRoom._answeringTime);
        sessionStorage.setItem(item.id + "_chat_room_is_answered_" + index, chatRoom._answered);
    }
    sessionStorage.setItem(item.id + "_chat_room_amount_" + item.index, chatRooms.length);
}

function saveMails(item) {
    const mails = item.mails;
    for (let i = 0; i < mails.length; i++) {
        const mail = mails[i],
            index = item.index + "_" + i;
        sessionStorage.setItem(item.id + "_mail_id_" + index, mail._primaryId);
        saveForeignUser({
            user: mail._author,
            id: item.id + "_mail",
            kind: "mail_author",
            index: i
        });
        sessionStorage.setItem(item.id + "_mail_content_" + index, mail._content);
        sessionStorage.setItem(item.id + "_mail_is_sent_" + index, mail._sent);
        sessionStorage.setItem(item.id + "_mail_is_edited_" + index, mail._edited._argument);
        sessionStorage.setItem(item.id + "_mail_is_public_" + index, mail._public)
    }
    sessionStorage.setItem(item.id + "_mail_amount_" + item.index, mails.length);
}

function saveChatters(item) {
    const chatters = item.chatters;
    for (let i = 0; i < chatters.length; i++) {
        const chatter = chatters[i];
        saveForeignUser({
            user: chatter,
            id: item.id,
            kind: "chatter",
            index: i
        });
    }
    sessionStorage.setItem(item.id + "_chatter_amount_" + item.index, chatters.length);
}

function saveSubscription(subscription) {
    sessionStorage.setItem("subscription_type", subscription._type);
    sessionStorage.setItem("subscription_status", subscription._status);
    sessionStorage.setItem("subscription_price", subscription._price);
    sessionStorage.setItem("subscription_offer_expires", subscription._offer._expires);
    sessionStorage.setItem("subscription_offer_type", subscription._offer._type);
    sessionStorage.setItem("subscription_offer_effect", subscription._offer._effect);
    sessionStorage.setItem("subscription_card_id", subscription._cardId);

}

function saveBulletins(item) {
    const bulletins = item.bulletins;
    for (let i = 0; i < bulletins.length; i++) {
        const bulletin = bulletins[i],
            index = item.index + "_" + i;
        sessionStorage.setItem(item.id + "_bulletin_id_" + index, bulletin._primaryId);
        saveForeignUser({
            user: bulletin._author,
            id: item.id + "_bulletin",
            kind: "bulletin_author",
            index: i
        });
        sessionStorage.setItem(item.id + "_bulletin_content_" + index, bulletin._content);
        sessionStorage.setItem(item.id + "_bulletin_is_sent_" + index, bulletin._sent);
        sessionStorage.setItem(item.id + "_bulletin_is_edited_" + index, bulletin._edited._argument);
        sessionStorage.setItem(item.id + "_bulletin_is_public_" + index, bulletin._public)
    }
}

function saveIdols(item) {
    const idols = item.idols;
    for (let i = 0; i < idols.length; i++) {
        saveForeignUser({
            user: idols[i],
            id: item.id + "_idol",
            index: i
        })
    }
    sessionStorage.setItem(item.id + "_idol_amount", idols.length);
}

function saveFans(item) {
    const fans = item.fans;
    for (let i = 0; i < fans.length; i++) {
        saveForeignUser({
            user: fans[i],
            id: item.id + "_fan",
            index: i
        })
    }
    sessionStorage.setItem(item.id + "_fan_amount", fans.length);
}

function saveGigs(item) {
    const gigs = item.gigs;
    for (let i = 0; i < gigs.length; i++) {
        const gig = gigs[i];
        const id = item.id + "_gig_" + gig._primaryId,
            index = i;
        sessionStorage.setItem(id + "_event_id" + index, gig._event._primaryId);
        saveAct({
            act: gig._act,
            id: id,
            index: index
        });
        sessionStorage.setItem(id + "_start_" + index, gig._start);
        sessionStorage.setItem(id + "_end_" + index, gig._end);
    }
    sessionStorage.setItem(item.id + "_gigs_amount_" + item.index, gigs.length);
}

function saveAct(item) {
    const act = item.act;
    for (let i = 0; i < act.length; i++) {
        saveForeignUser({
            user: act[i],
            id: item.id + "_act_" + act[i]._primaryId,
            index: i
        });
    }
    sessionStorage.setItem(item.id + "_acts_" + item.id, act.length);
}

function saveBands(item) {
    const bands = item.bands;
    for (let i = 0; i < bands.length; i++) {
        const id = item.id + "_band_" + bands[i]._primaryId;
        saveForeignUser({
            user: bands[i],
            id: id,
            index: i
        });
        saveMembers({
            members: bands[i]._members._data,
            id: id,
            index: i
        });
    }
    sessionStorage.setItem(item.id + "_bands_" + item.id, bands.length);
}

function saveRequests(requests) {
    for (let i = 0; i < requests.length; i++) {
        const request = requests[i];
        sessionStorage.setItem("request_primary_id_" + i, request._primaryId);
        sessionStorage.setItem("request_secondary_id_" + i, request._secondaryId);
        saveEvents({
            events: request._event,
            id: "request_" + request._primaryId + "_" + request._secondaryId,
            index: i
        });
        sessionStorage.setItem("request_approved_" + i, request._approved._argument);
        sessionStorage.setItem("request_message_" + i, request._message);
    }
    sessionStorage.setItem("request_amount",requests.length);
}

function saveMembers(item) {
    const members = item.members;
    for (let i = 0; i < members.length; i++) {
        const member = members[i];
        saveForeignUser({
            user: member,
            type: "artist",
            kind: (item.index === undefined ? "of_this_user" : ""),
            id: item.id + "_" + member._primaryId,
            index: item.index + "_" + i
        });
    }
    sessionStorage.setItem(item.id + "_member_amount", members.length);
}

function saveForeignUser(item) {
    const user = item.user,
        kind = (item.kind === undefined ? "" : item.kind + "_"),
        type = (item.type === undefined ? "" : item.type + "_"),
        index = (item.index === undefined ? "" : item.index),
        id = (item.id === undefined ? "" : item.id + "_");

    sessionStorage.setItem(id + "id_" + kind + type + index, user._primaryId);
    sessionStorage.setItem(id + "username_" + kind + type + index,user._username);
    if (user._firstName !== undefined)
        sessionStorage.setItem(id + "firstname_" + kind + type + index,user._firstName);
    if (user._fullName !== undefined)
        sessionStorage.setItem(id + "fullname" + kind + type + index, user._fullName);
    if (user._lastName !== undefined)
        sessionStorage.setItem(id + "lastname_" + kind + type + index,user._lastName);
    sessionStorage.setItem(id + "description_" + kind + type + index,user._description);
}