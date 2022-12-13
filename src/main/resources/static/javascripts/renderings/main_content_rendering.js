renderMain();

function renderMain() {
    document.getElementById("error_content").innerHTML = `
        
    `
        `
            <div>
                <a href="/static" class="button"><p>Go back</p></a>
            </div>
    `;
}

async function search(query) {
    window.location.href = dashboardURL(query);
    sessionStorage.setItem("search", await (await fetch(apiSearchURL(query))).json())
}