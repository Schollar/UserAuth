
// Sets the cookie equal to our response.data.token and then sends user to next page
function login_success(response) {
    Cookies.set('login_token', response.data.token);
    window.location = "/pages/home.html"
}
// Gets called if any errors with API call happen
function login_failure(error) {
    var error_message = document.getElementById('error_message');
    error_message.innerText = "You did not enter valid Email or Password, please try again."
}
// When user attempts to login, we grab the email and password values they have input, and send those values off as data in our POST request, if all good it calls our 
// login_success function and if not our login_fail function
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
// Setting up parent variables and adding a click listenter to our button that calls the attempt_login button
var user_section = document.getElementById('user_container');
var login_button = document.getElementById('login_submit');
login_button.addEventListener('click', attempt_login);