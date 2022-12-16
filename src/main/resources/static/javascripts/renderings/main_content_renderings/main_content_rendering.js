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

function renderProfile() {
    let html = ``;
    if (sessionStorage.getItem("logged_in") !== undefined)
        html = ``;
    else
        html = ``;

    document.getElementById("main_content").innerHTML = `
        <div class="wrapper">
            ${html}
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
            ${html}
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
            ${html}
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
            ${html}
        </div>
    
    `;
}