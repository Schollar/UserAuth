function get_colors_success(response) {
    var color_card = document.createElement('section');
    for (var i = 0; i < response.data.data.length; i++) {
        var color_name = document.createElement('h2');
        color_name.innerText = response.data.data[i].name;

        var color_year = document.createElement('h3');
        color_year.innerText = `Year Made: ${response.data.data[i].year}`;

        var color_box = document.createElement('div');
        color_box.style.width = '200px';
        color_box.style.height = '200px';
        color_box.style.backgroundColor = response.data.data[i].color;

        color_card.appendChild(color_name);
        color_card.appendChild(color_year);
        color_card.appendChild(color_box);
        welcome_message.appendChild(color_card);
    }

}

function logout() {
    Cookies.remove('login_token');
    window.location = "../index.html"
}

function get_colors_fail(error) {
    welcome_message.innerText = "Uh-Oh something went wrong, resfresh and try again!"
}

var welcome_message = document.getElementById('welcome_message');
var user_token = Cookies.get('login_token');
var error_message = document.getElementById('error_message');
var logout_button = document.createElement('button');
logout_button.innerText = 'Logout';
logout_button.addEventListener('click', logout);

welcome_message.appendChild(logout_button);

if (user_token === undefined) {
    var back_button = document.createElement('button');
    back_button.innerText = "Back to Login";
    back_button.addEventListener('click', logout);
    error_message.appendChild(back_button);
    error_message.innerText = "Oops! Please Go back and login"

} else {


    axios.request({
        url: 'https://reqres.in/api/unknown'
    }).then(get_colors_success).catch(get_colors_fail);



}
