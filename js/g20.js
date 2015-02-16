// Regex used for input format validation
var userRegex = new RegExp("^[a-zA-Z0-9_-]{6,50}$");
var passRegex = new RegExp("(?=^.{8,40}$)(?=^.*[A-Z].*$)(?=^.*[a-z].*$)(?=^.*[0-9].*$)(?=^.*[!|@|#|\$|%|\^|&|\*|\(|\)|-|_|=|\+|`|~|,|\.|<|>|/|\?|;|'|:\"|\[|\]|{|}|\\|\|].*$)");
var emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");

// User directory: change to "/~f14g20" when moving this code 
// from a developer's server to the production server
var siteRoot = "/~f14g20";

// Grabs the data for a particular property and modifies the DOM appropriately
// Author: Matthew McGuire
function populatePropertyDetails() {
//$("document").ready(function(){
    if (typeof pid !== 'undefined') {
    //$("#property-id-form").submit(function(){
        var data = {
            "action": "getPropertyByID",
            "property_id": pid
        };
        //data = $(this).serialize() + "&" + $.param(data);
        data = $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "api.php", //Relative or absolute path to response.php file
            data: data,
            success: function(data) {
                // Parse the returned data into a JSON object
                var property = $.parseJSON(data);
                if(!property['id']) {
                    jsonError();
                    return false;
                }
                
                // Populate the Address element
                $('#pe-addr').html(property['address_line_1']);
                if(property['address_line_2']){
                    $('#pe-addr').append(" " + property['address_line_2']);
                }
                $('#pe-addr').append(", " + property['city'])
                        .append(", " + property['state'])
                        .append(" " + property['zip']);
                
                // Populate the Price element (Price if house/condo & Rent if rental)
                if(property['property_type']==='house' || property['property_type']==='condo'){
                    $('#pe-price').html(
                            "<h3><small>Asking Price</small><br>$" + property['price'] + "</h3>"
                            );
                } else {
                    $('#pe-price').html(
                            "<h3><small>Monthly Rent</small><br>$" + property['price'] + "</h3>"
                            );
                }
                
                // Calculate and populate Price/Sq.Ft. element
                $('#pe-price-per-sqft').html(
                        "<h3><small>Price per Sq. Ft.</small><br>$" 
                        + (Math.round( (property['price']/property['size']) * 100 ) / 100)
                        + "</h3>"
                        );
                
                // Populate the HOA Fees element ("---" if null)
                if(property['hoa_fees']) {
                    $('#pe-hoa-fees').html(
                            "<h3><small>HOA Fees</small><br>$" + property['hoa_fees'] + "</h3>"
                            );
                } else { $('#pe-hoa-fees').html("<h3><small>HOA Fees</small><br>---</h3>"); }
                
                // Populate the Stat Buttons
                $('#pe-stat-buttons button')[0].innerHTML = property['bed'];
                $('#pe-stat-buttons button')[1].innerHTML = property['bath'];
                $('#pe-stat-buttons button')[2].innerHTML = property['size'];
                $('#pe-stat-buttons button')[3].innerHTML = property['land'];
                $('#pe-stat-buttons button')[4].innerHTML = property['built'];
                
                // Populate the description
                $('#pe-description').html(property['description']);
                
                // Populate the Amenities List
                $('#pe-amenities').html("");    // clears the list before refilling it
                for (index = 0; index < property['amenities'].length; ++index) {
                    $('#pe-amenities').append("<li>" + property['amenities'][index] + "</li>");
                }
                
                // Populate the Features List
                $('#pe-features').html("");    // clears the list before refilling it
                for (index = 0; index < property['features'].length; ++index) {
                    $('#pe-features').append("<li>" + property['features'][index] + "</li>");
                }
                
                // Add images to the carousel
                if (property['images'] !== null) {
                    if (property['images'].length >= 1) {
                        $('#pe-images-carousel ol.carousel-indicators').html(
                                '<li data-target="#pe-images-carousel" data-slide-to="0" class="active"></li>'
                                );
                        $('#pe-images-carousel div.carousel-inner').html(
                                '<div class="item active"><img src="image.php?i='
                                + property['images'][0] + '"></div>'
                                );
                    }
                    if (property['images'].length > 1) {
                        for( index = 1; index < property['images'].length; ++index) {
                            $('#pe-images-carousel ol.carousel-indicators').append(
                                    '<li data-target="#pe-images-carousel" data-slide-to="' 
                                    + index + '"></li>'
                                    );
                            $('#pe-images-carousel div.carousel-inner').append(
                                    '<div class="item"><img src="image.php?i='
                                    + property['images'][index] + '"></div>'
                                    );
                        }
                    }
                }
                
                // Lastly we unhide the container
                $('#property-container').removeClass('hidden');
            }
        });
        return false;
    } else if(document.URL.search("propertyDetails.php") >= 0) {
        jsonError();
    }
}//);

// Writes a general user-friendly error message to the page
function jsonError() {
    $('.navbar:first-child').after(
            '<div class="panel panel-danger"><div class="panel-body">'
            + "<h2>Whoops!</h2>"
            + "<p>Somethign went wrong. Use your browser's back button to go to the previous page.  Hopefully it will work next time.</p>"
            + '</div></div>'
            );
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

// Properly escapes a string for use in a regular expression. See the following url for details: 
// http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

// Replaces the login link with the appropriate profile link and the sign out link
function loginHeaderUpdate(userType) {
    if(userType === 'customer') {
        $('#user-action-list').html('<li><a href="#" id="customer-profile-link">Profile</a></li>');
    } else if(userType === 'realtor') {
        $('#user-action-list').html('<li><a href="#" id="realtor-portal-link">Portal</a></li>');
    } else if(userType === 'admin') {
        $('#user-action-list').html('<li><a href="#" id="admin-control-panel-link">Control Panel</a></li>');
    }
    $('#user-action-list').append('<li><a href="#" id="signout-link">Sign Out</a></li>');
    $(document).trigger('ready');
}

// quick query to check simple search API functionality
function simpleSearch(str) {
     var data = {
            "action": "getPropertyByID",
            "property_id": pid
        };
        //data = $(this).serialize() + "&" + $.param(data);
        data = $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "api.php", //Relative or absolute path to response.php file
            data: data,
            success: function(data) {
                // Parse the returned data into a JSON object
                var property = $.parseJSON(data);
                if(!property['id']) {
                    jsonError();
                    return false;
                }
                else {
                    alert(property);
                }
            }});
}

// All of the following needs to run on all pages in the site
$('document').ready(function(){
    // Clears the data from the Log In modal when it is closed
    $('#login-modal').on('hidden.bs.modal', function (e) {
        $('#login-user-input, #login-pass-input').each(function(){
            $(this).val("");
            $(this).parent().removeClass('has-error has-success');
            $(this).popover('hide');
        });
        // Close any error messages
        $('#login-modal-error').hide(0);
    });
    // Clears the data from the Sign Up modal when it is closed
    $('#signup-modal').on('hidden.bs.modal', function (e) {
        $('#signup-user-input, #signup-pass-input, #signup-pass-conf-input, #signup-name-input, #signup-email-input').each(function(){
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
    $("#login-user-input, #signup-user-input").popover({
        animation:  true,
        container:  'body',
        content:    'The username must be from 6 to 50 characters long and consist of alphanumeric characters and underscores only.',
        placement:  'right',
        trigger:    'focus'
    });
    // Displays popover when login password input is in focus
    $("#login-pass-input, #signup-pass-input").popover({
        animation:  true,
        container:  'body',
        content:    'The password must br from 8 to 50 characters long and consist of at lease one capital and one lowercase character as well as one number and one of the following special characters: ! @ # $ % ^ & * ( ) - _ = + ` ~ , . < > / ? ; \' : " [ ] { } \\ |',
        placement:  'right',
        trigger:    'focus'
    });
    // Validating each input when changed
    $('#login-user-input').on('change',function(){
        validateInput('#login-user-input',userRegex);
    });
    $('#login-pass-input').on('change',function(){
        validateInput('#login-pass-input',passRegex);
    });
    $('#signup-user-input').on('change',function(){
        validateInput('#signup-user-input',userRegex);
    });
    $('#signup-pass-input').on('change',function(){
        validateInput('#signup-pass-input',passRegex);
        $('#signup-pass-conf-input').trigger('change');
    });
    $('#signup-pass-conf-input').on('change',function(){
        if(validateInput('#signup-pass-conf-input',new RegExp(escapeRegExp($('#signup-pass-input').val())))) {
            $(this).popover('hide');
        } else {
            $(this).popover({
                animation:  true,
                container:  'body',
                content:    'This must match the password.',
                placement:  'right',
                trigger:    'manual'
            });
            $(this).popover('show');
        }
    });
    $('#signup-name-input').on('change',function(){
        validateInput('#signup-name-input');
    });
    $('#signup-email-input').on('change',function(){
        if(validateInput('#signup-email-input',emailRegex)){
            $(this).popover('hide');
        } else {
            $(this).popover({
                animation:  true,
                container:  'body',
                content:    'Please enter a valid email address.',
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
                content:    'Notice: Realtor account will require administrator confirmation before they are fully functional.',
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
        if( validateInput('#login-user-input',userRegex) && validateInput('#login-pass-input',passRegex) ) {
            // Contruct data array from form input values
            var data = {
                action: "login",
                user:   $("#login-user-input").val(),
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
                            loginHeaderUpdate(data['user-type']);
                            //$('#login-modal-toggle').parent().html('<a href="#" id="signout">Sign Out</a>');
                            $('#login-modal').modal('hide');
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
        }
        return false;
    });
    
    // Sign Up modal form handler
    $('#signup-modal-form').submit(function(){
        // Check that all input is valid
        if( validateInput('#signup-user-input',userRegex) 
                && validateInput('#signup-pass-input',passRegex) 
                && validateInput('#signup-pass-conf-input',new RegExp(escapeRegExp($('#signup-pass-input').val())))
                && validateInput('#signup-name-input')
                && validateInput('#signup-email-input',emailRegex)
                && validateInput('#signup-user-type-input',/^Customer|Realtor$/) ) {
            // Contruct data array from form input values
            var data = {
                action: "signup",
                user:   $('#signup-user-input').val(),
                pass:   $('#signup-pass-input').val(),
                pass2:  $('#signup-pass-conf-input').val(),
                name:   $('#signup-name-input').val(),
                email:  $('#signup-email-input').val(),
                utype:  $('#signup-user-type-input').val()
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
                            loginHeaderUpdate(data['user-type']);
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
        }
        return false;
    });
    
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
