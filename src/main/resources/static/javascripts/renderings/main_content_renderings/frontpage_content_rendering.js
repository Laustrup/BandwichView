async function renderFrontpage(message) {
    if (sessionStorage.getItem("logged_in") !== undefined)
        window.location.href = profileURL;
    else {
        let events = await (await fetch(apiEventGet(), {
            method: "POST"
        })).json();

        events.filter((event) => {
            return event._isCancelled === false &&
                Date.now().toEpochMilli() <= Date.parse((event._openDoors).toString()).toEpochMilli();
        });

        let eventContainers = ``;

        events.forEach((event) => {
            eventContainers += `
                <div class="container">
                    <div class="wrapper">
                        <h5 class="container_title">${event._title}</h5>
                        <p class="container_body_text">
                            Doors opens at: ${event._openDoors.toLocaleString()}
                        </p>
                        <p class="container_body_text">
                            Location: ${event._location}
                        </p>
                    </div>
                </div>
                
            `;
        });

        document.getElementById("main_content").innerHTML = `
            <section id="frontpage_information_section">
                <section id="welcome_detail_section">
                    <h2 class="title">Welcome | </h2>
                    <p class="body_text">
                        Feel free to either login or signup,
                        otherwise browse some events underneath.
                    </p>
                </section>
                <section id="frontpage_message_section">
                    ${(message !== undefined ? `<p class="body_text">${message}</p>` : `` )}
                    <div id="response_message"></div>
                </section>
            </section>
            <hr>
            <section id="frontpage_events_section">
                <h3 class="title">
                    Events
                </h3>
                <div class="container_box">
                    <div class="wrapper">
                        ${eventContainers}
                    </div>
                </div>
            </section>
        `;
    }
}