function generateWelcomeSection() {
    const user = getUser();
    return (userIsLoggedIn() ?`
        <section id="informative_welcome_section">
            <h2 class="title">
                Hi ${(user.fullname !== undefined ? user.fullname : user.title)}. You are logged in as ${user.fullname} | 
            </h2>
            <p class="description">
                Now you can explore the full experience of Bandwich
            </p>
        </section>
    `: hasSearched() ?`
        <section id="informative_welcome_section">
            <h2 class="title">
                Here's what we found | 
            </h2>
            <p class="description">
                Hope that it is what you were looking for.
                Notice that you can filter, sort and choose for a more specific search.
            </p>
        </section>
    `: `
        <section id="informative_welcome_section">
            <h2 class="title">
                That's odd | 
            </h2>
            <p class="description">
                You weren't supposed to be here...
            </p>
        </section>
    `);
}

function generateSearchSection(items) {
    function generateSearchContainers() {
        let containers = generateEventContainers(items._events);
        items._users.forEach((user) => {
            containers += `
                <div class="container">
                    <div class="wrapper">
                        <a onclick="changeURL(${userURL(user._id)})">
                            <h5 class="body_text">
                                ${(user._username !== undefined ? user._username : user._title)}
                            </h5>
                        </a>
                    </div>
                </div>
            `;
        });

        return `
            <section id="search_containers_section">
                ${containers}
            </section>
        `
    }

    return (hasSearched() ?`
            <section id="search_header">
                <h2 class="title">Searches</h2>
                ${generateFilterSection()}
            </section>
            <section id="search_index_section">
                <section id="search_selector_section">
                    <form id="search_selector_form">
                        <input type="radio" id="any_radio" value="ANY">
                        <label for="any_radio">ANY</label><br>
                        <input type="radio" id="events_radio" value="EVENTS">
                        <label for="events_radio">Events</label><br>
                        <input type="radio" id="venues_radio" value="VENUES">
                        <label for="venues">Venues</label><br>
                        <input type="radio" id="bands_radio" value="BANDS">
                        <label for="bands_radio">Bands</label><br>
                        <input type="radio" id="artists_radio" value="ARTISTS">
                        <label for="artists_radio">Artists</label><br>
                        <input type="radio" id="participants_radio" value="PARTICIPANTS">
                        <label for="participants_radio">Participants</label>
                    </form>
                </section>
                ${generateSearchContainers()}
            </section>
        `: ``);
}

function generateFilterSection() {
    function renderPriceRange(doRender) {
        const html = `
            <label for="price_range">Highest price:</label>
            <div class="slide_container">
                <input type="range" id="price_range" class="slider" min="0" max="3000">
            </div>
        `;
        document.getElementById("price_defying").innerHTML = (doRender ? html : ``);
        return html;
    }

    return `
        <section id="filter_section">
            <section id="filter_header_section">
                <h3 class="title">
                    Filter and sort your search
                </h3>
                <p class="description">
                    Here you can specify your search.
                    Just change the wished detail and it will do the action.
                    Empty fields will contain an example.
                </p>
            </section>
            <section id="filter_configs_section">
                <section id="common_filters_section">
                    <h4 class="title">
                        Common filters
                    </h4>
                    <p class="description">
                        These filters will affect search elements of both users and events.
                    </p>
                    <label for="city_filtering">City:</label>
                    <input type="text" id="city_filtering" placeholder="København" onchange="filterSearch()">
                </section>
                <section id="event_filters_section">
                    <h4 class="title">
                        Events
                    </h4>
                    <p class="description">
                        These filters are only affecting events.
                    </p>
                    <div class="date_filters">
                        <label for="include_past_events">Include past events:</label>
                        <input type="checkbox" id="include_past_events" onclick="filterSearch()">
                        <label for="earliest_date_filtering">Earliest date:</label>
                        <input type="date" id="earliest_date_filtering" onclick="filterSearch()">
                        <label for="latest_date_filtering">Latest date:</label>
                        <input type="date" id="latest_date_filtering" onclick="filterSearch()">
                    </div>
                    <div class="price_filters">
                        <label for="only_free_events">Only free events:</label>
                        <input type="checkbox" id="only_free_events" onclick="${renderPriceRange(this)}">
                        <div id="price_defying">
                            <label for="price_range">Highest price:</label>
                            <div class="slide_container">
                                <input type="range" id="price_range" class="slider" min="0" max="3000">
                            </div>
                        </div>
                    </div>
                </section>
                <section id="sorting_section">
                    <h4 class="title">
                        Sorting
                    </h4>
                    <p class="description">
                        Pick a way of sorting.
                    </p>
                    <label for="sorting">Sort:</label>
                    <select id="sorting" onclick="sortSearch()">
                        <option value="DON'T_SORT">Don't sort</option>
                        <option value="EARLIEST_DATE">Earliest date</option>
                        <option value="LATEST_DATE">Latest date</option>
                        <option value="HIGHEST_PRICE">Highest price</option>
                        <option value="LOWEST_PRICE">Lowest price</option>
                        <option value="ALFABETICLY">Alfabeticly</option>
                    </select>
                </section>
            </section>
        </section>
    `
}

function generateIdolsContainers() {
    return userContainers(getIdols({id: "user_" + id }));
}

function generateAttendingEventContainers() {
    return eventContainers(getEvents({ id: "user_" + sessionStorage.getItem("user_id") }));
}

//TODO Filter only if necessarily
function eventContainers(events) {
    events.filter((event) => {
        return event._isCancelled === false &&
            Date.now().toEpochMilli() <= Date.parse((event._openDoors).toString()).toEpochMilli();
    });

    let html = ``;

    events.forEach((event) => {
        html += `
            <div class="container">
                <div class="wrapper">
                    <a onclick="${changeURL(eventURL(event._id))}" class="container_a_tag">
                        ${generateImage({
                            endpoint: event._albums._data[0]._items._data[0]._endpoint,
                            class: "container_image"
                        })}
                        <h5 class="container_title">${event._title}</h5>
                        <p class="container_body_text">
                            Doors opens at: ${event._openDoors.toLocaleString()}
                        </p>
                        <p class="container_body_text">
                            Location: ${event._location}
                        </p>
                    </a>
                </div>
            </div>
            
        `;
    });

    return html;
}

function userContainers(users) {
    let html = ``;

    users.forEach((user) => {
        html += `
            <div class="container">
                <div class="wrapper">
                    <a onclick="${changeURL(userURL(user._id))}" class="container_a_tag">
                        ${generateImage({
                            endpoint: event._albums._data[0]._items._data[0]._endpoint,
                            class: "container_image"
                        })}
                        <h5 class="container_title">${user._username}</h5>
                    </a>
                </div>
            </div>
        `;
    })

    return html;
}

function generateGigContainers() {
    const gigs = getGigs({ id: "user_" + sessionStorage.getItem("user_id") });

    gigs.filter((gig) => {
        return  Date.now().toEpochMilli() <= Date.parse((gig.start).toString()).toEpochMilli();
    });

    let gigContainers = ``;

    gigs.forEach((gig) => {
        gigContainers += `
            <div class="container">
                <div class="wrapper">
                    <h5 class="container_title">${gig.title}</h5>
                    <p class="container_body_text">
                        Doors opens at: ${gig.start.toLocaleString()}
                    </p>
                    <p class="container_body_text">
                        Location: ${gig.event.title}
                    </p>
                </div>
            </div>
            
        `;
    });
}

async function generateEventContainers() {
    return eventContainers(await (await fetch(apiEventGet(), {
        method: "POST"
    })).json());
}

function generateSearchItemContainers(items) {
    let containers = ``;
    items.forEach((element) => {
        containers += `
            <div></div>
        `;
    });
    return containers;
}

async function generateImage(item) {

}