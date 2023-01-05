async function renderProfile() {
    let profileContent;

    function generateProfileContent(user) {
        function profileContentSection(item) {
            return `
                <section id="profile_content_left_section">
                    
                </section>
                <section id="profile_content_left_section">
                    ${item.mainSection}
                </section>
            `;
        }

        function generateProfileAlbumContent(user) {
            const albums = user.albums;
            return ``;
        }

        function generateProfileEditingContent(user) {

        }

        function generateProfileBandsContent(user) {

        }

        let mainSection;
        if (profileContent !== undefined)
            switch (profileContent) {
                case "BULLETINS": {
                    mainSection = generateBulletinContent(user.bulletins);
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
                case "BANDS": {
                    mainSection = generateProfileBandsContent(user)
                    break;
                }
                case "FOLLOWINGS": {
                    mainSection = generateFollowingContent(user);
                    break;
                }
                default: {
                    mainSection = generateProfileEditingContent(user);
                    break;
                }
            }
        else
            mainSection = generateProfileEditingContent(user);
        return profileContentSection({
            user: user,
            mainSection: mainSection
        });
    }

    async function changeProfileContent(content) {
        profileContent = content;
        await renderProfile();
    }

    if (!userIsLoggedIn())
        await renderFrontpage("You are not logged in...");
    else {
        const user = getUser();
        if (user !== undefined) {
            document.getElementById("main_content").innerHTML = `
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
                                <a onclick="${await changeProfileContent("EDITING")}">
                                    <p class="header_link_title">Editing</p>
                                </a>
                                ${(user.authority === "ARTIST" ? `
                                <a onclick="${await changeProfileContent("BANDS")}">
                                    <p class="header_link_title">Bands</p>
                                </a>
                                ` : ``)}
                                ${(user.authority !== "VENUE" ? `
                                <a onclick="${await changeProfileContent("FOLLOWINGS")}">
                                    <p class="header_link_title">Followings</p>
                                </a>
                                ` : ``)}
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
        }
        else
            await renderFrontpage("You are not logged in...");
    }
}