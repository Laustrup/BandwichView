async function login() {
    let username = document.getElementById("username_login").value;
    let password = document.getElementById("password_login").value;

    const response = await fetch("http://localhost:8081/api/user/login",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _username: username,
            _password: password
        })
    });

    const responseEntity = await response.json();
    if (responseEntity==null) {
        document.location.href = 'http://localhost:8080/welcome';
    } else {
        sessionStorage.setItem("user",responseEntity._element);
        document.location.href = 'http://localhost:8080/dashboard/';
    }
}
function logout() {
    sessionStorage.removeItem("user");
    document.getElementById("response_message").innerHTML = `
        <div>
            <p>
                You have logged out!
            </p>
        </div>
    `;
    document.location.href = 'http://localhost:8080/welcome';
}