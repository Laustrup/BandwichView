let profileContent;

async function renderProfile() {
    if (!userIsLoggedIn())
        await renderDashboard()
    else {
        const user = getUser();
        if (user !== undefined) {
            let html = `
                <section id="profile_header_section">
                    <div id="cover_image_container">
                        <div class="wrapper">
                            ${await generateImage({
                                endpoint: user.albums[0]._items._data[1]._endpoint,
                                class: "cover_image"
                            })}
                        </div>
                    </div>
                    <section id="profile_header_detail_section">
                        ${await generateImage({
                            endpoint: user.albums[0]._items._data[1]._endpoint,
                            class: "profile_image"
                        })}
                        <div>
                            <div id="profile_header_titles">
                                <h2 id="profile_username_title" class="title">${user.username}</h2>
                                <h3 id="profile_full_name_title" class="descritpion">${user.fullname}</h3>
                            </div>
                            <div id="profile_header_links">
                                <a onclick="${await changeProfileContent("BULLETINS")}">
                                    <p class="header_link_title">Bulletins</p>
                                </a>
                                <a onclick="${await changeProfileContent("ALBUMS")}">
                                    <p class="header_link_title">Albums</p>
                                </a>
                            </div>
                            <div id="profile_header_right side">
                                <h4 class="title">Welcome to your profile</h4>
                                <p class="description">
                                    Here you can view your information
                                    and change them for your liking.
                                </p>
                            </div>
                        </div>
                    </section> 
                </section>
                <section id="profile_content_section">
                    ${generateProfileContent(user)}
                </section>
            `;

            document.getElementById("main_content").innerHTML = html;
        }
        else
            await renderDashboard();
    }
}

function generateProfileContent(user) {
    let mainSection;
    if (profileContent !== undefined)
        switch (profileContent) {
            case "BULLETINS": {
                mainSection = generateBulletinContent(user);
                break;
            }
            case "ALBUMS": {
                mainSection = generateProfileAlbumContent(user);
                break;
            }
            case "EDITING": {
                mainSection = generateProfileEditingContent(user);
                break;
            }
            default: {
                mainSection = generateProfileEditingContent(user);
                break;
            }
        }
    else
        mainSection = generateProfileEditingContent(user);
    return profileContent({
        user: user,
        mainSection: mainSection
    });
}

function profileContent(item) {
    return `
        <section id="profile_content_left_section">
            
        </section>
        <section id="profile_content_left_section">
            ${item.mainSection}
        </section>
    `;
}

function generateProfileAlbumContent(user) {

}

function generateProfileEditingContent(user) {

}

async function changeProfileContent(content) {
    profileContent = content;
    await renderProfile();
}