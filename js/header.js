
// User directory: change to "/~f14g20" when moving this code 
// from a developer's server to the production server
var siteRoot = "/~fsilva";

// Regex used for input format validation
var userRegex = new RegExp("^[a-zA-Z0-9_-]{0,50}$");
var passRegex = new RegExp("(?=^.{8,40}$)(?=^.*[A-Z].*$)(?=^.*[a-z].*$)(?=^.*[0-9].*$)(?=^.*[!|@|#|\$|%|\^|&|\*|\(|\)|-|_|=|\+|`|~|,|\.|<|>|/|\?|;|'|:\"|\[|\]|{|}|\\|\|].*$)");
var emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");

// Properly escapes a string for use in a regular expression. See the following url for details: 
// http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

// Checks the val() of an input against a RegExp or simply not empty
// id must be a string in the format: "#input-id"
function validateInput(id, re) {
    // checks if re is defined
    re = re || /^\S+$/;
    if( re.test( $(id).val() ) ) {
        $(id).parent().removeClass('has-error');
        $(id).parent().addClass('has-success');
        return true;
    } else {
        $(id).parent().removeClass('has-success');
        $(id).parent().addClass('has-error');
        return false;
    }
}

// Replaces the login link with the appropriate profile link and the sign out link
function loginHeaderUpdate(userType) {
    $('#user-action-list').html('');
    if(userType === 'customer') {
        $('#user-action-list').html('<li><a href="profile.php" id="customer-profile-link">Profile</a></li>');
    } else if(userType === 'realtor') {
        $('#user-action-list').html('<li><a href="portal.php" id="realtor-portal-link">Portal</a></li>');
    } else if(userType === 'admin') {
        $('#user-action-list').html('<li><a href="#" id="admin-control-panel-link">Control Panel</a></li>');
    }
    $('#user-action-list').append('<li><a href="#" id="signout-link">Sign Out</a></li>');
    $(document).trigger('ready');
}

// All of the following needs to run on all pages in the site
$('document').ready(function(){
    // Clears the data from the Log In modal when it is closed
    $('#login-modal').on('hidden.bs.modal', function (e) {
        $('#login-email-input, #login-pass-input').each(function(){
            $(this).val("");
            $(this).parent().removeClass('has-error has-success');
            $(this).popover('hide');
        });
        // Close any error messages
        $('#login-modal-error').hide(0);
    });
    // Clears the data from the Sign Up modal when it is closed
    $('#signup-modal').on('hidden.bs.modal', function (e) {
        $('#signup-email-input, #signup-pass-input, #signup-pass-conf-input, #signup-fname-input, #signup-lname-input').each(function(){
            $(this).val("");
            $(this).parent().removeClass('has-error has-success');
            $(this).popover('hide');
        });
        // User Type must be done separately since it is a select element
        $('#signup-user-type-input').val("Customer");
        $('#signup-user-type-input').parent().removeClass('has-warning');
        $('#signup-user-type-input').popover('hide');
        // Close any errors messages
        $('#signup-modal-error').hide(0);
    });

    // Displays popover when login username input is in focus
    $("#login-email-input").popover({
        animation:  true,
        container:  'body',
        content:    'Please enter the email address you signed-up with.',
        placement:  'right',
        trigger:    'focus'
    });
    // Displays popover when login password input is in focus
    $("#login-pass-input").popover({
        animation:  true,
        container:  'body',
        content:    'Please enter your password.',
        placement:  'right',
        trigger:    'focus'
    });
    // Displays popover when login username input is in focus
    $("#signup-email-input").popover({
        animation:  true,
        container:  'body',
        content:    'You must enter a valid email address.',
        placement:  'right',
        trigger:    'focus'
    });
    // Displays popover when login password input is in focus
    $("#signup-pass-input").popover({
        animation:  true,
        container:  'body',
        content:    'The password must be from 8 to 50 characters long and consist of at lease one capital and one lowercase letter as well as one number and one of the following special characters: ! @ # $ % ^ & * ( ) - _ = + ` ~ , . < > / ? ; \' : " [ ] { } \\ |',
        placement:  'right',
        trigger:    'focus'
    });
    // Validating each input when changed
    $('#login-email-input').on('change',function(){
        validateInput('#login-email-input',emailRegex);
    });
    $('#login-pass-input').on('change',function(){
        validateInput('#login-pass-input',passRegex);
    });
    $('#signup-email-input').on('change',function(){
        validateInput('#signup-email-input',emailRegex);
    });
    $('#signup-pass-input').on('change',function(){
        validateInput('#signup-pass-input',passRegex);
        $('#signup-pass-conf-input').trigger('change');
    });
//    $('#signup-pass-conf-input').on('change',function(){
//        if(validateInput('#signup-pass-conf-input',new RegExp(escapeRegExp($('#signup-pass-input').val())))) {
//            $(this).popover('hide');
//        } else {
//            $(this).popover({
//                animation:  true,
//                container:  'body',
//                content:    'This must match Password.',
//                placement:  'right',
//                trigger:    'manual'
//            });
//            $(this).popover('show');
//        }
//    });
    $('#signup-fname-input').on('change',function(){
        if(validateInput('#signup-fname-input',userRegex)){
            $(this).popover('hide');
        } else {
            $(this).popover({
                animation:  true,
                container:  'body',
                content:    'Please enter a valid First Name.',
                placement:  'right',
                trigger:    'manual'
            });
            $(this).popover('show');
        }
    });
    $('#signup-lname-input').on('change',function(){
        if(validateInput('#signup-lname-input',userRegex)){
            $(this).popover('hide');
        } else {
            $(this).popover({
                animation:  true,
                container:  'body',
                content:    'Please enter a valid Last Name.',
                placement:  'right',
                trigger:    'manual'
            });
            $(this).popover('show');
        }
    });
    // Displays warning when Realtor is selected
    $('#signup-user-type-input').on('change', function(){
        if( $(this).val() === "Realtor" ) {
            $(this).parent().addClass('has-warning');
            $(this).popover({
                animation:  true,
                container:  'body',
                content:    'Notice: Realtor accounts require administrator confirmation before they are fully functional.',
                placement:  'right',
                trigger:    'manual'
            });
            $(this).popover('show');
        } else {
            $(this).parent().removeClass('has-warning');
            $(this).popover('hide');
        }
    });
    
    // Log In modal form handler
    $("#login-modal-form").submit(function(){
        // Check that all input is valid
//        if( validateInput('#login-email-input',userRegex) && validateInput('#login-pass-input',passRegex) ) {
            // Contruct data array from form input values
            var data = {
                action: "login",
                email:   $("#login-email-input").val(),
                pass:   $("#login-pass-input").val()
            };
            data = $.param(data);
            // Send out the AJAX request
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "api.php",
                data: data,
                success: function(data) {
                    if(typeof(data['success']) !== undefined){
                        if(data['success'] === true) {
                            loginHeaderUpdate(data['uType']);
                            //$('#login-modal-toggle').parent().html('<a href="#" id="signout">Sign Out</a>');
                            $('#login-modal').modal('hide');
                            window.location = window.location.href;
                        } else {
                            // Login unsuccessful. Outpue error message
                            $('#login-modal-error').html('<p>'+data['message']+'</p>');
                            $('#login-modal-error').show(200);
                        }
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log("status: " + textStatus + "\n" + "Error: " + errorThrown);
                }
            });
//        }
        return false;
    });
    
    // Sign Up modal form handler
    $('#signup-modal-form').submit(function(){
        // Check that all input is valid
//        if( validateInput('#signup-email-input',userRegex) 
//                && validateInput('#signup-pass-input',passRegex) 
//                && validateInput('#signup-pass-conf-input',new RegExp(escapeRegExp($('#signup-pass-input').val())))
//                && validateInput('#signup-fname-input')
//                && validateInput('#signup-lname-input',emailRegex)
//                && validateInput('#signup-user-type-input',/^Customer|Realtor$/) ) {
            // Contruct data array from form input values
            var data = {
                action: "signup",
                email:   $('#signup-email-input').val(),
                pass:   $('#signup-pass-input').val(),
                pass2:  $('#signup-pass-conf-input').val(),
                fName:   $('#signup-fname-input').val(),
                lName:  $('#signup-lname-input').val(),
                uType:  $('#signup-user-type-input').val()
            };
            data = $.param(data);
            // Send out the AJAX request
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "api.php",
                data: data,
                success: function(data) {
                    //data = $.parseJSON(data);
                    if(typeof(data['success']) !== undefined){
                        if(data['success'] === true) {
                            loginHeaderUpdate(data['uType']);
                            //$('#login-modal-toggle').parent().html('<a href="#" id="signout">Sign Out</a>');
                            $('#signup-modal').modal('hide');
                        } else {
                            // Login unsuccessful. Outpue error message
                            $('#signup-modal-error').html('<p>'+data['message']+'</p>');
                            $('#signup-modal-error').show(200);
                        }
                    }
                },
                error:  function(jqXHR, textStatus, errorThrown){
                    console.log("status: " + textStatus + "\n" + "Error: " + errorThrown);
                }
            });
//        }
        return false;
    });
    
    
    changeNavBarSelected();
    
});

function getCurrentPageFile(){
    
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
}

function changeNavBarSelected(){
    var page = getCurrentPageFile();
    
    if(page === "searchResults.php"){
        element = document.getElementById("search-tab");
        element.id = "nav-bar-selected";
    }else if(page === "aboutUs.php"){
        element = document.getElementById("about-tab");
        element.id = "nav-bar-selected";
    }else if(page === "contactRealtor.php"){
        element = document.getElementById("contact-tab");
        element.id = "nav-bar-selected";
    }else if(page === "portal.php"){
        element = document.getElementById("portal-tab");
        element.id = "nav-bar-selected";
    }else if(page === "profile.php"){
        element = document.getElementById("profile-tab");
        element.id = "nav-bar-selected";
    }else if(page === "controlPanel.php"){
        element = document.getElementById("admin-tab");
        element.id = "nav-bar-selected";
    }
    
}



$(document).on('click', '#open-login-modal', function() {    
      $("#login-modal").modal();
      return false;
});


$(document).on('click', '#open-signup-modal', function() {    
      $("#signup-modal").modal();
      return false;
});

// Log In modal toggle link
$(document).on('click', '#login-modal-toggle', function() {
    $("#login-modal").modal();
    return false;
});
// Sign Up modal toggle link
$(document).on('click', '#signup-modal-toggle', function() {
    $("#login-modal").modal('hide');
    $("#signup-modal").modal();
    return false;
});
// Sign Out link handler
$(document).on('click', '#signout-link', function() {
    window.location = "logout.php";
//    var data = { action: "signout" }
//    data = $.param(data);
//    $.ajax({
//        type: "POST",
//        dataType: "json",
//        url: "api.php",
//        data: data,
//        success: function(data) {
//            //console.log(data);
//            $('#user-action-list').html('<li><a href="#" id="login-modal-toggle">Log In</a></li>');
//            $(document).trigger('ready');
//        }
//    });
});

