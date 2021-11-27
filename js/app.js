function login_success(response) {
    console.log(response);
    Cookies.set('login_token', response.data.token);
    window.location = "/pages/home.html"
}
function login_failure(error) {
    var error_message = document.getElementById('error_message');
    error_message.innerText = "You did not enter valid Email or Password, please try again."
}
function attempt_login(e) {
    var email_input = document.getElementById('email_input').value;
    var password_input = document.getElementById('password_input').value;

    axios.request({
        url: 'https://reqres.in/api/login',
        method: "POST",
        data: {
            email: email_input,
            password: password_input
        }
    }).then(login_success).catch(login_failure);
}
var user_section = document.getElementById('user_container');

var login_button = document.getElementById('login_submit');
login_button.addEventListener('click', attempt_login);