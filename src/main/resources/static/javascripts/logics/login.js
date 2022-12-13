updateSession();

async function login() {
    let username = document.getElementById("username_login").value;
    let password = document.getElementById("password_login").value;

    const response = await (await fetch(apiLoginURL(),{
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

    if (response==null) {
        document.location.href = frontpageURL();
    } else {
        sessionStorage.setItem("user",response._element);
        document.location.href = profileURL();
    }
}
function logout() {
    sessionStorage.removeItem("user");
    document.getElementById("response_message").innerHTML = `
        <div>
            <p>
                You have logged out!
            </p>
        </div>
    `;
    document.location.href = 'http://localhost:8080/welcome';
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
                            title: document.getElementById("country_title").value,
                            indexes: document.getElementById("country_indexes").value,
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
                        phoneNumberDigits: document.getElementById("phone_number_digits").value
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
                    sessionStorage.setItem("user",response);

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
                    sessionStorage.setItem("user",response);

                break;
            }
            case "BAND": {
                if (sessionStorage.getItem("user") != null) {
                    const runner = document.getElementById("runner").value;

                    const response = await (await fetch(apiCreateBand(password),{
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            _username: username,
                            _members: [sessionStorage.getItem("user")],
                            _runner: runner,
                            _description: description,
                            _contactInfo: contactInformation
                        })
                    })).json();

                    if (response != null)
                        sessionStorage.setItem("user",response);
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
                    sessionStorage.setItem("user",response);

                break;
            }
        }
        if (sessionStorage.getItem("user") != null)
            window.location.href = profileURL();
    }
}

async function updateSession() {
    if (sessionStorage.getItem("user")!=null)
        sessionStorage.setItem("user",(await (await fetch(apiUserGetURL(
            sessionStorage.getItem("user")))).json())._element._id);
}