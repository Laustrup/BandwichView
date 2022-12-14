function getUser() {
    let user = {
        primaryId: undefined,
        username: undefined,
        description: undefined
    };

    user.primaryId = sessionStorage.getItem("user_id");
    user.username = sessionStorage.getItem("username");
    user.description = sessionStorage.getItem("description");

    return user;
}