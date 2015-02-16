function getUrlParameter( name )    {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
    return null;
    else
    return results[1];
}

//var customer = new Customer();
var pid = getUrlParameter("pid");
var realtor;
var property = null;

if(pid){
    property = new Property(getUrlParameter("pid"));
}

printFormDisclaimerMessage();

/*
populateContactForm = function() {
    
    $('#user-fname-in').val(  customer.getFName()  );
    $('#user-lname-in').val(  customer.getLName()  );
    $('#user-phone-in').val( customer.getPhone() );
    $('#user-email-in').val( customer.getEmail());
    
};
*/

populatePropertyImage = function(){
    $('#property-container').html(property.getListItemHTML(false));
};

function printFormDisclaimerMessage(){
    
    if(property){
        $('#user-message').html('<div class="alert alert-info" role="alert">Be sure that we have all the necessary contact information, you can check this in your <a href="portal.php">profile</a>.  </div>');
    }else{
        $('#user-message').html('<div class="alert alert-info" role="alert">Tell us about your property that you would like to sell/rent with us. <br> Be sure that we have all the necessary contact information, you can check this on your <a href="portal.php">profile</a>.  </div>');
    }
};

$(document).ready(function() {
    printFormDisclaimerMessage();
});



$(document).on('click', '#contact-submit', function() {
    
    propertyId = null;
    if(property){
        propertyId = property.getId();
    }
    
    message =  document.getElementById("message-body").value;
  
    var data = {
                action: "contactRealtor", 
                propertyId: propertyId,
                message: message
            };
    
    data = $.param(data);
  
    $.ajax({
        type:       "POST",
        dataType:   "json",
        url:        "api.php",
        data: {
                action: "contactRealtor", 
                propertyId: propertyId,
                message: message
            },
        
        success:    function(data) {
                    if(typeof(data['success']) !== undefined){
                        if(data['success'] === true) {
                            $('#user-message').html('<div class="alert alert-info" role="alert"><strong>Sent</strong></div>');
                        } else {
                            //Unsuccessful. Output error message
                            $('#user-message').html('<div class="alert alert-danger" role="alert"><strong>' +  data['message'] + '</strong></div>');
                            $('#user-message').show(10);
                        }
                    }
                },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Status: " + textStatus + "\n" + "Error: " + errorThrown);
        }
    });
    
    $('#user-message').prop('disabled', true);
    return false;
});

$(document).on('property-loaded',function() {
    if(property){
        populatePropertyImage();
        
        realtor = new Realtor(property.getAgentId());
    }
});

$(document).on('realtor-loaded',function() {
  
   $('#list-agent').html(realtor.getViewListAgent(false));
});


