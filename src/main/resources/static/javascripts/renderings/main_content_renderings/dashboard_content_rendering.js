async function renderDashboard() {
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
                    <h3 class="title">
                        Events you are attending at:
                    </h3>
                    <div class="container_box">
                        <div class="wrapper">
                            ${generateAttendingEventContainers()}
                        </div>
                    </div>
                </section>
                <section id="idols_section">
                    <h3 class="title">
                        Idols:
                    </h3>
                    <div class="container_box">
                        <div class="wrapper">
                            ${generateIdolsContainers()}
                        </div>
                    </div>
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