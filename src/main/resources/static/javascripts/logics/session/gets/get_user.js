function getUser() {
    if (userIsLoggedIn()) {
        const id = parseInt(sessionStorage.getItem("user_id"));
        return {
            id: id,
            username: sessionStorage.getItem("username"),
            firstname: sessionStorage.getItem("firstname"),
            fullname: sessionStorage.getItem("fullname"),
            lastname: sessionStorage.getItem("lastname"),
            description: sessionStorage.getItem("description"),
            authority: sessionStorage.getItem("authority"),
            contactInfo: getContactInformation({ id: "user_" + id }),
            albums: getAlbums({ id: "user_" + id }),
            ratings: getRatings({ id: id }),
            events: getEvents({ id: "user_" + id }),
            chatRooms: getChatRooms({ id: "user_" + id }),
            subscription: {
                type: sessionStorage.getItem("subscription_type"),
                status: sessionStorage.getItem("subscription_status"),
                price: parseFloat(sessionStorage.getItem("subscription_price")),
                offer: {
                    expires: sessionStorage.getItem("subscription_offer_expires"),
                    type: sessionStorage.getItem("subscription_offer_type"),
                    effect: sessionStorage.getItem("subscription_offer_effect"),
                },
                cardId: parseInt(sessionStorage.getItem("subscription_card_id"))
            },
            bulletins: getBulletins({ id: "user_" + id }),
            idols: getIdols({ id: "user_" + id }),
            fans: getFans({ id: "user_" + id }),
            gigs: getGigs({ id: "user_" + id }),
            bands: getBands({ id: "user_" + id }),
            members: getMembers({ id: "user_" + id }),
            requests: getRequests({ id: "user_" + id }),
            runner: sessionStorage.getItem("runner"),
            location: sessionStorage.getItem("location"),
            size: parseInt(sessionStorage.getItem("size")),
            timestamp: sessionStorage.getItem("timestamp")
        };
    }
    return undefined;
}

function getContactInformation(item) {
    const index = (item.index !== undefined ? "_" + item.index : "");
    function generateKey(content) { return item.id + content + index; }

    return {
        email: sessionStorage.getItem(generateKey("_email")),
        phone: {
            country: {
                title: sessionStorage.getItem(generateKey("_phone_country_title")),
                indexes: sessionStorage.getItem(generateKey("_phone_country_indexes"))
            },
            firstDigits: sessionStorage.getItem(generateKey("_phone_number_digits")),
            numbers: sessionStorage.getItem(generateKey("_phone_numbers")),
            isMobile: sessionStorage.getItem(generateKey("_phone_is_mobile")),
        },
        address: {
            street: sessionStorage.getItem(generateKey("_street")),
            floor: sessionStorage.getItem(generateKey("_floor")),
            postal: sessionStorage.getItem(generateKey("_postal")),
            city: sessionStorage.getItem(generateKey("_city"))
        },
        country: {
            title: sessionStorage.getItem(generateKey("_country_title")),
            indexes: sessionStorage.getItem(generateKey("_country_indexes")),
            firstDigits: sessionStorage.getItem("_country_number_digits")
        }
    }
}

function getAlbums(item) {
    let albums = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_album_amount")); i++) {
        function generateKey(content) {
            return item.id + content + (item.index !== undefined ? item.index + "_" + i : i);
        }
        albums.push({
            id: sessionStorage.getItem(generateKey("_album_id_")),
            title: sessionStorage.getItem(generateKey("_album_title_")),
            items: getAlbumItems({
                id: item.id + "_album",
                index: i
            }),
            author: getPrimitiveUser({
                id: item.id + "_album",
                index: i
            }),
            timestamp: generateKey("_album_timestamp_")
        });
    }

    return albums;
}

function getAlbumItems(item) {
    let items = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_item_amount_" + item.index)); i++) {
        items.push({
            tags: getTags({
                id: item.id + "_album",
                index: i
            }),
            endpoint: sessionStorage.getItem(item.id + "_item_endpoint_" + item.index + "_" + i)
        });
    }

    return items;
}

function getTags(item) {
    let tags = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_tags_length_" + item.index)); i++) {
        tags.push(getPrimitiveUser({
            id: item.id + "_tag",
            index: i
        }));
    }

    return tags;
}

function getRatings() {
    let ratings = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem("rating_amount")); i++) {
        ratings.push({
            value: sessionStorage.getItem("rating_value_" + i),
            comment: sessionStorage.getItem("rating_comment_" + i),
            judge: getPrimitiveUser({
                kind: "judge",
                index: i
            })
        });
    }

    return ratings;
}

function getEvents(item) {
    let events = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_event_amount")); i++) {
        const id = item.id + "_event",
            index = item.index + "_" + i;
        function generateKey(content) {
            return id + content + index;
        }
        events.push({
            openDoors: sessionStorage.getItem(generateKey("_open_doors_")),
            start: sessionStorage.getItem(generateKey("_start_")),
            end: sessionStorage.getItem(generateKey("_end_")),
            length: sessionStorage.getItem(generateKey("_length_")),
            description: sessionStorage.getItem(generateKey("_description_")),
            isVoluntary: sessionStorage.getItem(generateKey("_is_voluntary_")),
            is_public: sessionStorage.getItem(generateKey("_is_public_")),
            is_cancelled: sessionStorage.getItem(generateKey("_is_cancelled_")),
            is_sold_out: sessionStorage.getItem(generateKey("_is_sold_out_")),
            location: sessionStorage.getItem(generateKey("_location_")),
            price: sessionStorage.getItem(generateKey("_price_")),
            ticketsURL: sessionStorage.getItem(generateKey("_tickets_url_")),
            contactInformation: getContactInformation({
                id: id,
                index: i
            }),
            gigs: getGigs({
                id: id,
                index: i
            }),
            venue: getPrimitiveUser({
                type: "venue",
                kind: "event",
                id: id,
                index: i
            }),
            participations: getParticipations({
                id: id,
                index: i
            }),
            bulletins: getBulletins({
                id: id,
                index: i
            }),
            albums: getAlbums({
                id: id,
                index: i
            })
        });
    }

    return events;
}

function getGigs(item) {
    let gigs = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_gigs_amount_" + item.index)); i++) {
        const id = item.id + "_gig_" + gig._primaryId,
            index = i;
        function generateKey(content) {
            return id + content + index;
        }

        gigs.push({
            eventId: sessionStorage.getItem(generateKey("_event_id")),
            act: getAct({
                id: id,
                index: index
            }),
            start: sessionStorage.getItem(generateKey("_start_")),
            end: sessionStorage.getItem(generateKey("_end_"))
        });
    }

    return gigs;
}

function getAct(item) {
    let act = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_acts_" + item.index)); i++) {
        act.push(getPrimitiveUser({
            kind: "performer",
            id: item.id + "_act_" + act[i]._primaryId,
            index: i
        }));
    }

    return act;
}

function getParticipations(item) {
    let participations = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_participations_amount")); i++) {
        const id = item.id,
            index = item.index + "_" + i;
        function generateKey(content) {
            return id + content + index;
        }

        participations.push({
            user: getPrimitiveUser({
                type: "participant",
                kind: "participation",
                index: item.index,
                id: id
            }),
            event: {
                openDoors: sessionStorage.getItem(generateKey("_open_doors_")),
                start: sessionStorage.getItem(generateKey("_start_")),
                end: sessionStorage.getItem(generateKey("_end_")),
                length: sessionStorage.getItem(generateKey("_length_")),
                description: sessionStorage.getItem(generateKey("_description_")),
                isVoluntary: sessionStorage.getItem(generateKey("_is_voluntary_")),
                is_public: sessionStorage.getItem(generateKey("_is_public_")),
                is_cancelled: sessionStorage.getItem(generateKey("_is_cancelled_")),
                is_sold_out: sessionStorage.getItem(generateKey("_is_sold_out_")),
                location: sessionStorage.getItem(generateKey("_location_")),
                price: sessionStorage.getItem(generateKey("_price_")),
                ticketsURL: sessionStorage.getItem(generateKey("_tickets_url_"))
            },
            type: sessionStorage.getItem(generateKey("_type_"))
        });
    }

    return participations;
}

function getBulletins(item) {
    let bulletins = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_bulletin_amount")); i++) {
        const id = item.id,
            index = (item.index !== undefined ? item.index + "_" : "") + i;
        function generateKey(content) { return id + content + index; }

        bulletins.push({
            id: sessionStorage.getItem("_bulletin_id_"),
            author: getPrimitiveUser({
                id: item.id + "_bulletin",
                kind: "author",
                index: i
            }),
            content: sessionStorage.getItem(generateKey("_bulletin_content_")),
            isSent: sessionStorage.getItem(generateKey("_bulletin_is_sent_")),
            isEdited: sessionStorage.getItem(generateKey("_bulletin_is_edited_")),
            isPublic: sessionStorage.getItem(generateKey("_bulletin_is_public_"))
        });
    }

    return bulletins;
}

function getChatRooms(item) {
    let chatRooms = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(
        item.id + "_chat_room_amount_" + (item.index !== undefined ? item.index : ""))); i++) {
        const id = item.id,
            index = item.index + "_" + i;
        function generateKey(content) { return id + content + index; }

        chatRooms.push({
            id: sessionStorage.getItem(generateKey("_chat_room_id_")),
            title: sessionStorage.getItem(generateKey("_chat_room_title_")),
            mails: getMails({
                id: item.id + "_chat_room",
                index: i
            }),
            chatters: getChatters({
                id: item.id + "_chat_room",
                index: i
            }),
            responsible: getPrimitiveUser({
                id: item.id + "_chat_room",
                kind: "responsible",
                index: i
            }),
            answeringTime: sessionStorage.getItem(generateKey("_chat_room_answering_time_")),
            isAnswered: sessionStorage.getItem(generateKey("_chat_room_is_answered_"))
        })
    }

    return chatRooms;
}

function getMails(item) {
    let mails = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_mail_amount_" + item.index)); i++) {
        const id = item.id,
            index = (item.index !== undefined ? item.index + "_" + i : "");
        function generateKey(content) { return id + content + index; }

        mails.push({
            id: sessionStorage.getItem(generateKey("_mail_id_")),
            author: getPrimitiveUser({
                id: item.id + "_mail",
                kind: "author",
                index: i
            }),
            content: sessionStorage.getItem(generateKey("_mail_content_")),
            isSent: sessionStorage.getItem(generateKey("_mail_is_sent_")),
            isEdited: sessionStorage.getItem(generateKey("_mail_is_edited_")),
            isPublic: sessionStorage.getItem(generateKey("_mail_is_public_")),
            timestamp: sessionStorage.getItem(generateKey("_timestamp_"))
        });
    }

    return mails;
}

function getChatters(item) {
    let chatters = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_chatter_amount_" + item.index)); i++) {
        chatters.push(getPrimitiveUser({
            id: item.id,
            kind: "chatter",
            index: i
        }));
    }

    return chatters;
}

function getIdols(item) {
    let idols = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_fan_amount")); i++) {
        idols.push(getPrimitiveUser({
            kind: "idol",
            id: item.id,
            index: i
        }));
    }

    return idols;
}

function getFans(item) {
    let fans = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_fan_amount")); i++) {
        fans.push(getPrimitiveUser({
            kind: "fan",
            id: item.id,
            index: i
        }));
    }

    return fans;
}

function getBands(item) {
    let bands = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_band_amount")); i++) {
        const id = item.id + "_band_" + sessionStorage.getItem(item.id + "_band_id_" + i);
        bands.push({
            id: parseInt(sessionStorage.getItem(item.id + "_band_id_" + i)),
            band: getPrimitiveUser({
                id: id,
                index: i
            }),
            members: getMembers({
                id: id,
                index: i
            })
        });
    }

    return bands;
}

function getMembers(item) {
    let members = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem(item.id + "_member_amount")); i++) {
        members.push(getPrimitiveUser({
            type: "artist",
            kind: (item.index === undefined ? "of_this_user" : ""),
            id: item.id + "_" + sessionStorage.getItem(
                item.id + "_member_id_" + (item.index !== undefined ? item.index + "_" + i : i)),
            index: item.index + "_" + i
        }));
    }

    return members;
}

function getRequests() {
    let requests = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem("request_amount")); i++) {
        const primaryId = parseInt(sessionStorage.getItem("request_primary_id_" + i)),
            secondaryId = parseInt(sessionStorage.getItem("request_secondary_id_" + i));

        requests.push({
            primaryId: primaryId,
            secondaryId: secondaryId,
            events: getEvents({
                id: "request_" + primaryId + "_" + secondaryId,
                index: i
            }),
            approved: sessionStorage.getItem("request_approved_" + i),
            message: sessionStorage.getItem("request_message_" + i)
        });
    }

    return requests;
}

function getPrimitiveUser(item) {
    const kind = (item.kind === undefined ? "" : item.kind + "_"),
        type = (item.type === undefined ? "" : item.type + "_"),
        index = (item.index === undefined ? "" : item.index),
        id = (item.id === undefined ? "" : item.id + "_");

    return {
        id: parseInt(sessionStorage.getItem(id + "id_" + kind + type + index)),
        username: sessionStorage.getItem(id + "username_" + kind + type + index),
        firstname: sessionStorage.getItem(id + "firstname_" + kind + type + index),
        fullname: sessionStorage.getItem(id + "fullname" + kind + type + index),
        lastname: sessionStorage.getItem(id + "lastname_" + kind + type + index),
        description: sessionStorage.getItem(id + "description_" + kind + type + index)
    };
}