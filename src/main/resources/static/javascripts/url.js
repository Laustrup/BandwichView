function viewDomainURL() { return "http://localhost:8080/"; }
function frontpageURL() { return viewDomainURL() + "welcome"}
function profileURL() { return viewDomainURL() + "profile"; }
function dashboardURL(searchQuery) {
    return viewDomainURL() + "dashboard" + (searchQuery !== undefined ? "/?search_query=" + searchQuery : "");
}
function eventURL(id) { return viewDomainURL() + "/?event=" + id; }


function apiDomainURL() { return "http://localhost:8081/api/"; }
function apiLoginURL() { return apiDomainURL() + "user/login"}
function apiUserGetURL(id) { return apiDomainURL() + "user/get/" + id; }
function apiSearchURL(searchQuery) { return apiDomainURL() + "user/search/" + searchQuery; }
function apiCreateVenue(password) { return apiDomainURL() + "venue/create/" + password; }
function apiCreateArtist(password) { return apiDomainURL() + "artist/create/" + password }
function apiCreateBand(password) { return apiDomainURL() + "band/create/" + password; }