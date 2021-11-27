
// Function that Gets called when API call succeeds, it creates a color card for all the response data received, loops through and displays each one on the page
function get_colors_success(response) {
    // Create Our Parent Card section
    var color_card = document.createElement('section');
    // Loop through the data received from the API, and display the relevent info on the page
    for (var i = 0; i < response.data.data.length; i++) {
        var color_name = document.createElement('h2');
        color_name.innerText = response.data.data[i].name;

        var color_year = document.createElement('h3');
        color_year.innerText = `Year Made: ${response.data.data[i].year}`;

        var color_box = document.createElement('div');
        color_box.style.width = '200px';
        color_box.style.height = '200px';
        color_box.style.backgroundColor = response.data.data[i].color;
        // Appending the children to the parent so they are seen on page
        color_card.appendChild(color_name);
        color_card.appendChild(color_year);
        color_card.appendChild(color_box);
        welcome_message.appendChild(color_card);
    }

}
// Simple function that removes any login token cookies and sends user back to login page
function logout() {
    Cookies.remove('login_token');
    window.location = "../index.html"
}
// Error function for if the API call fails
function get_colors_fail(error) {
    welcome_message.innerText = "Uh-Oh something went wrong, resfresh and try again!"
}
// Setting up various variables we need to be used as parents
var welcome_message = document.getElementById('welcome_message');
var user_token = Cookies.get('login_token');
var error_message = document.getElementById('error_message');
// adding a logout button on to the page
var logout_button = document.createElement('button');
logout_button.innerText = 'Logout';
// If button clicked, call the logout function
logout_button.addEventListener('click', logout);

welcome_message.appendChild(logout_button);
// Here we check to see if the user has a valid login token if its undefined we send them a back button and an error message
if (user_token === undefined) {
    var back_button = document.createElement('button');
    back_button.innerText = "Back to Login";
    back_button.addEventListener('click', logout);
    error_message.appendChild(back_button);
    error_message.innerText = "Oops! Please Go back and login"
    // If the user has a valid login token, we make an api call that calls our get_colors_success function to display data on the page for the user
} else {


    axios.request({
        url: 'https://reqres.in/api/unknown'
    }).then(get_colors_success).catch(get_colors_fail);



}
