renderMain();

function renderMain() {
    let url = window.location.href.split("=");
    switch (url[0]) {
        case frontpageURL: {
            renderFrontpage();
            break;
        }
        case loginURL: {
            renderLogin();
            break;
        }
        case signupURL: {
            renderSignup();
            break;
        }
        case profileURL: {
            renderProfile();
            break;
        }
        case dashboardURL(): {
            renderDashboard();
            break;
        }
        case (dashboardURL() + "/?search_query"): {
            if (sessionStorage.getItem("search") !== url[1])
                search(url[1]);
            renderDashboard();
            break;
        }
        case (viewDomainURL + "/?event"): {
            renderEvent(url[1]);
            break;
        }
        case (viewDomainURL + "/?user"): {
            renderUser(url[1]);
            break;
        }
    }
}

async function search(query) {
    window.location.href = dashboardURL(query);
    sessionStorage.setItem("search", await (await fetch(apiSearchURL(query))).json())
}

function renderFrontpage() {
    let html = ``;
    if (sessionStorage.getItem("logged_in") !== undefined)
        html = ``;
    else
        html = ``;

    document.getElementById("main_content").innerHTML = `
        <div class="wrapper">
            ` + html + `
        </div>
    
    `;
}

function renderLogin() {
    if (!userIsLoggedIn()) {
        let content = `
            <section id="login_field_section">
                <div class="wrapper">
                    <label id="username">Title:</label>
                    <input type="text" id="username" placeholder="username/email...">
                    
                    <label id="password">Password:</label>
                    <input type="password" id="password" placeholder="password">
                </div>
            </section>
            <section id="login_buttons">
                <div class="wrapper">
                    <button onclick="renderFrontpage()" class="return_button">
                        Go back
                    </button>
                    <button onclick="login()" class="action_button">
                        Log in
                    </button>
                </div>
            </section>
        `;

        document.getElementById("main_content").innerHTML = `
            <div class="wrapper">
                <section id="login_title_section">
                    <div class="wrapper">
                        <h4 class="title">
                            Login |
                        </h4>
                        <p class="description">
                            Fill the fields in order to login.
                            The title can either your username or Email.
                        </p>
                    </div>
                </section>
                <section id="login_content_section">
                    <div class="wrapper">
                        ${content}
                    </div>
                </section>
                <section id="login_info_section">
                    <div class="wrapper">
                        <div class="response_message"></div>
                    </div>
                </section>
            </div>
        `;
    } else {
        renderProfile();
    }
}

let userType;
function renderSignup() {

}

function renderProfile() {
    let html = ``;
    if (sessionStorage.getItem("logged_in") !== undefined)
        html = ``;
    else
        html = ``;

    document.getElementById("main_content").innerHTML = `
        <div class="wrapper">
            ` + html + `
        </div>
    
    `;
}

function renderDashboard() {
    let html = ``;
    if (sessionStorage.getItem("logged_in") !== undefined)
        html = ``;
    else
        html = ``;

    document.getElementById("main_content").innerHTML = `
        <div class="wrapper">
            ` + html + `
        </div>
    
    `;
}

function renderEvent(id) {
    let html = ``;
    if (sessionStorage.getItem("logged_in") !== undefined)
        html = ``;
    else
        html = ``;

    document.getElementById("main_content").innerHTML = `
        <div class="wrapper">
            ` + html + `
        </div>
    
    `;
}

function renderUser(id) {
    let html = ``;
    if (sessionStorage.getItem("logged_in") !== undefined)
        html = ``;
    else
        html = ``;

    document.getElementById("main_content").innerHTML = `
        <div class="wrapper">
            ` + html + `
        </div>
    
    `;
}