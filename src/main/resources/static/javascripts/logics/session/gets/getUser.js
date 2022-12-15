function getUser() {
    const id = sessionStorage.getItem("user_id");
    return {
        id: id,
        username: sessionStorage.getItem("username"),
        firstname: sessionStorage.getItem("firstname"),
        fullname: sessionStorage.getItem("fullname"),
        lastname: sessionStorage.getItem("lastname"),
        description: sessionStorage.getItem("description"),
        contactInfo: getContactInformation({ id: "user_" + id }),
        albums: getAlbums({ id: "user_" + id }),
        ratings: getRatings({ id: id })
    };
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
            author: getForeignUser({
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
        tags.push(getForeignUser({
            id: item.id + "_tag",
            index: i
        }));
    }

    return tags;
}

function getRatings(item) {
    let ratings = [];

    for (let i = 0; i < parseInt(sessionStorage.getItem("rating_amount")); i++) {
        ratings.push({
            value: sessionStorage.getItem("rating_value_" + i),
            comment: sessionStorage.getItem("rating_comment_" + i),
            judge: getForeignUser({
                kind: "judge",
                index: i
            })
        });
    }

    return ratings;
}

function getForeignUser(item) {

}