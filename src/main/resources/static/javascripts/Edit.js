async function editUser() {
    const username = document.getElementById("username").value,
        description = document.getElementById("description").value,
        firstname = document.getElementById("firstname").value,
        lastname = document.getElementById("lastname").value,
        email = document.getElementById("email").value,
        number = document.getElementById("phone_number").value,
        isMobile = document.getElementById("is_mobile").value,
        city = document.getElementById("city").value,
        street = document.getElementById("city").value,
        floor = document.getElementById("floor").value,
        postal = document.getElementById("postal").value,
        countryTitle = document.getElementById("country").value,
        location = document.getElementById("location").value,
        size = document.getElementById("size").value,
        confirmationPassword = document.getElementById("confirmation_password").value,
        newPassword = document.getElementById("new_password").value;

    const id = parseInt(localStorage.getItem("user_id"));
    const user = {
        _id: id,
        _username: username,
        _firstname: firstname,
        _lastname: lastname,
        _description: description,
        _contactInfo: {
            _email: email,
            _phone: {
                _country: {
                    _title: countryTitle,
                    _indexes: localStorage.getItem("user_" + id + "_phone_country_indexes"),
                    _firstDigits: localStorage.getItem("user_" + id + "_phone_number_digits")
                },
                _numbers: number,
                _isMobile: isMobile
            },
            _address: {
                _city: city,
                _street: street,
                _floor: floor,
                _postal: postal
            },
            _country: {
                _title: countryTitle,
                _indexes: localStorage.getItem("user_" + id + "_phone_country_indexes"),
                _firstDigits: localStorage.getItem("user_" + id + "_phone_number_digits")
            }
        },
        _albums: getAlbums({id: "user_" + id}),
        _ratings: getRatings({id: id}),
        _events: getEvents({id: "user_" + id}),
        _chatRooms: getChatRooms({id: "user_" + id}),
        _subscription: {
            _type: localStorage.getItem("subscription_type"),
            _status: localStorage.getItem("subscription_status"),
            _price: parseFloat(localStorage.getItem("subscription_price")),
            _offer: {
                _expires: localStorage.getItem("subscription_offer_expires"),
                _type: localStorage.getItem("subscription_offer_type"),
                _effect: localStorage.getItem("subscription_offer_effect"),
            },
            _cardId: parseInt(localStorage.getItem("subscription_card_id"))
        },
        _bulletins: getBulletins({id: "user_" + id}),
        _idols: getIdols({id: "user_" + id}),
        _fans: getFans({id: "user_" + id}),
        _gigs: getGigs({id: "user_" + id}),
        _bands: getBands({id: "user_" + id}),
        _members: getMembers({id: "user_" + id}),
        _requests: getRequests({id: "user_" + id}),
        _runner: localStorage.getItem("runner"),
        _location: location,
        _size: size,
        _timestamp: localStorage.getItem("timestamp")
    };

    const response = await (await (fetch(apiUserEditURL({
        username: localStorage.getItem("username"),
        confirmationPassword: confirmationPassword,
        newPassword: newPassword !== undefined || newPassword !== "" ? newPassword : confirmationPassword
    }), {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }))).json();

    if (response._element !== undefined)
        saveUser(response);
    else if (response._error)
        document.getElementById("editing_message").innerText = response._message;
    else
        document.getElementById("editing_message").innerText = "Something went wrong..."
}