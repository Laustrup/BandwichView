await renderMain();

async function renderMain() {
    clearSearch();
    let url = window.location.href.split("=");
    switch (url[0]) {
        case frontpageURL: {
            await renderFrontpage();
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
            await renderProfile();
            break;
        }
        case dashboardURL(): {
            await renderDashboard();
            break;
        }
        case viewDomainURL + "/?chat_room": {
            if (userIsLoggedIn())
                await renderChatRoom();
            else
                return renderFrontpage("You need to log in for viewing chat room page");
            break;
        }
        case (dashboardURL() + "/?search_query"): {
            await search(url[1]);
            await renderDashboard();
            break;
        }
        case (viewDomainURL + "/?event"): {
            await renderEvent({
                id: url[1],
                doFetch: true
            });
            break;
        }
        case (viewDomainURL + "/?user"): {
            renderUser(url[1]);
            break;
        }
    }
}