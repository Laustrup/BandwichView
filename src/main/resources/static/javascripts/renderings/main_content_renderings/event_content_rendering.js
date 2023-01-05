function renderEvent(id) {
    let html = ``;
    if (userIsLoggedIn())
        html = ``;
    else
        html = ``;

    document.getElementById("main_content").innerHTML = `
        ${html}
    `;
}