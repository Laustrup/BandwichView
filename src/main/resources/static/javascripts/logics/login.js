updateSession().then();

async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    const response = await (await fetch(apiLoginURL,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _username: username,
            _password: password
        })
    })).json();

    if (response === undefined) {
        document.getElementById("response_message").innerHTML = `
            <p class="body_text">
                Response to server didn't have a success...
            </p>
        `;
    } else if (response._message !== undefined) {
        document.getElementById("response_message").innerHTML = `
            <p class="body_text">
                ${response._message}
            </p>
        `;
    } else {
        saveUser(response);
        sessionStorage.setItem("logged_in", "true")
        document.getElementById("response_message").innerHTML = `
            <p class="body_text">
                Congrats ${response._username}. You have logged in!
            </p>
        `;
        document.location.href = profileURL;
    }
}
function logout() {
    sessionStorage.clear();
    document.getElementById("response_message").innerHTML = `
        <p class="body_text">
            You have logged out!
        </p>
    `;
    document.location.href = frontpageURL;
}
async function signup(kind) {
    if (kind !== "") {
        const username = document.getElementById("username").value,
                password = document.getElementById("password").value,
                description = document.getElementById("user_description").value,
                contactInformation = {
                    email: document.getElementById("user_email").value,
                    phone: {
                        country: {
                            title: document.getElementById("phone_country_title").value,
                            indexes: document.getElementById("phone_country_indexes").value,
                            phoneNumberDigits: document.getElementById("phone_number_digits").value
                        },
                        numbers: document.getElementById("user_phone_numbers").value,
                        isMobile: document.getElementById("is_mobile").value
                    },
                    address: {
                        street: document.getElementById("street").value,
                        floor: document.getElementById("floor").value,
                        postal: document.getElementById("postal").value,
                        city: document.getElementById("city")
                    },
                    country: {
                        title: document.getElementById("country_title").value,
                        indexes: document.getElementById("country_indexes").value,
                        phoneNumberDigits: document.getElementById("number_digits").value
                    }
                };

        switch (kind) {
            case "VENUE": {
                const location = document.getElementById("user_location").value,
                    gearDescription = document.getElementById("user_gear_description").value,
                    size = document.getElementById("venue_size");

                const response = await (await fetch(apiCreateVenue(password),{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _username: username,
                        _description: description,
                        _location: location,
                        _gearDescription: gearDescription,
                        _size: size,
                        _contactInfo: contactInformation
                    })
                })).json();

                if (response != null)
                    saveUser(response._element);

                break;
            }
            case "ARTIST": {
                const firstname = document.getElementById("user_first_name").value,
                    lastname = document.getElementById("user_last_name").value,
                    runner = document.getElementById("runner").value;

                const response = await (await fetch(apiCreateArtist(password),{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _username: username,
                        _firstName: firstname,
                        _lastName: lastname,
                        _runner: runner,
                        _description: description,
                        _contactInfo: contactInformation
                    })
                })).json();

                if (response != null)
                    saveUser(response._element);

                break;
            }
            case "BAND": {
                if (getUser() !== undefined) {
                    const runner = document.getElementById("runner").value;

                    const response = await (await fetch(apiCreateBand(password),{
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            _username: username,
                            _members: getUser(),
                            _runner: runner,
                            _description: description,
                            _contactInfo: contactInformation
                        })
                    })).json();

                    if (response != null)
                        saveUser(response._element);
                } else {
                    alert("You need to be signed in as an Artist to create a band...");
                }
                break;
            }
            case "PARTICIPANT": {
                const firstname = document.getElementById("user_first_name").value,
                    lastname = document.getElementById("user_last_name").value;

                const response = await (await fetch(apiCreateArtist(password),{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _username: username,
                        _firstName: firstname,
                        _lastName: lastname,
                        _description: description,
                        _contactInfo: contactInformation
                    })
                })).json();

                if (response != null)
                    saveUser(response._element);

                break;
            }
        }
        if (getUser() !== undefined)
            window.location.href = profileURL();
    }
}

async function updateSession() {
    if (getUser() !== undefined)
        saveUser((await (await fetch(apiUserGetURL(
            sessionStorage.getItem("user")))).json())._element);
}

function userIsLoggedIn() {
    return sessionStorage.getItem("logged_in") === "true";
}