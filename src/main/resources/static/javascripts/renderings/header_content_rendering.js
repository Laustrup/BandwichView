renderHeader();

function renderHeader() {
    let leftSection = ``,
        midSection = `
            <section>
                <div class="wrapper">
                    <input type="search" onchange="search(this)" placeholder="search" id="search-input">
                </div>
            </section>
        `,
        rightSection = ``;

    if (getUser() === undefined) {
        leftSection = `
            <section id="header_left">
                <div class="wrapper">
                    <div id="header_title">
                        <a href="/welcome" class="image_button">
                            <img src="../static/images/logo.png" alt="BANDWICH">
                        </a>
                    </div>
                    |
                    <div id="navigation_bar">
                        <a href="/dashboard" class="navigation_tag">
                            Events
                        </a>
                    </div>
                </div>
            </section>
        `;
        rightSection = `
            <section id="header_right">
                <a class="login_tag">
                    signup
                </a>
                |
                <a class="login_tag">
                    login
                </a>
            </section> `;
    } else {
        const user = getUser();

        leftSection = `
            <section id="header_left">
                <div class="wrapper">
                    <div id="header_title">
                        <a href="/welcome" class="image_button">
                            <img src="../static/images/logo.png" alt="BANDWICH">
                        </a>
                    </div>
                    |
                    <div id="navigation_bar">
                        <a href="/profile" class="navigation_tag">
                            Profile
                        </a>
                        <a href="/dashboard" class="navigation_tag">
                            Events
                        </a>
                    </div>
                </div>
            </section>
        `;
        rightSection = `
            <section id="header_right">
                <a href="/profile" class="login_tag">` +
                    user.username + `
                </a>
                |
                <a class="login_tag">
                    logout
                </a>
            </section> 
        `;
    }

    document.getElementById("header_content").innerHTML = `
        <div class="wrapper">
            ` +
            leftSection +
            midSection +
            rightSection +
        `
        </div>
    `;
}