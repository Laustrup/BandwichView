async function renderDashboard() {
    const user = getUser();
    document.getElementById("main_content").innerHTML = `
            <section id="welcoming_section">
                ${generateWelcomeSection()}
                <section id="action_message_section">
                    <div id="response_message"></div>
                </section>
            </section>
            <section>
                ${generateSearchSection(sortedSearch)}
                <section id="attending_events_section">
                    ${(userIsAttendingEvents(user) ? `
                        <h3 class="title">
                            Events you are attending at:
                        </h3>
                        <div class="container_box">
                            <div class="wrapper">
                                ${generateAttendingEventContainers()}
                            </div>
                        </div>
                    ` : `
                        <h3 class="title">
                            At the moment you are not going to attend any events...
                        </h3>
                        <p class="description">
                            Feel welcome to browse for any interesting events.
                        </p>
                    `)}
                </section>
                <section id="idols_section">
                    ${(user.idols.length > 0 ? `
                        <h3 class="title">
                            Idols:
                        </h3>
                        <div class="container_box">
                            <div class="wrapper">
                                ${generateIdolsContainers()}
                            </div>
                        </div>
                    `: `
                        <h3 class="title">
                            At the moment you are not admiring any bands or artists...
                        </h3>
                        <p class="description">
                            Feel welcome to browse through the different musicians.
                        </p>
                    `)}
                </section>
                <section id="events_section">
                    <h3 class="title">
                        New events of Bandwich:
                    </h3>
                    <div class="container_box">
                        <div class="wrapper">
                            ${await generateEventContainers()}
                        </div>
                    </div>
                </section>
            </section>
        `;
}

function userIsAttendingEvents(user) {
    if (user.events > 0) {
        user.events.forEach((event) => {
            event.participations.forEach((participation) => {
                if (participation._participant._primaryId === user.id)
                    return true;
            });
        });
    }
    return false;
}