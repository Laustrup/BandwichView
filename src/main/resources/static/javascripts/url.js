function viewDomainURL() { return "http://localhost:8080/"; }
function apiDomainURL() { return "http://localhost:8081/api/"; }
function apiSearchURL(searchQuery) { return apiDomainURL() + "/user/search/"+searchQuery; }
function dashboardURL(searchQuery) {
    return viewDomainURL() + "dashboard" + (searchQuery != null ? "/?search_query=" + searchQuery : "");
}