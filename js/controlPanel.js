/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

admin = new Admin();

populateAdminProfileForm = function() {
    $('#name').html(admin.getFName() + ' ' + admin.getLName());
    $('#admin-fname-p').html(admin.getFName());
    $('#admin-fname-in').val(admin.getFName());
    $('#admin-lname-p').html(admin.getLName());
    $('#admin-lname-in').val(admin.getLName());
//    $('#admin-email-p').html(admin.getEmail());
//    $('#admin-email-in').val(admin.getEmail());
    $('#admin-phone-p').html(admin.getPhone());
    $('#admin-phone-in').val(admin.getPhone());
    $('#admin-addr1-p').html(admin.getAddr1());
    $('#admin-addr1-in').val(admin.getAddr1());
    $('#admin-addr2-p').html(admin.getAddr2());
    $('#admin-addr2-in').val(admin.getAddr2());
    $('#admin-city-p').html(admin.getCity());
    $('#admin-city-in').val(admin.getCity());
    $('#admin-state-p').html(admin.getState());
    $('#admin-state-in').val(admin.getState());
    $('#admin-zip-p').html(admin.getZip());
    $('#admin-zip-in').val(admin.getZip());
    //$('#admin-image').attr('src',admin.getImage());
};

updateAdminFromForm = function() {
    admin.setFName( $('#admin-fname-in').val() );
    admin.setLName( $('#admin-lname-in').val() );
//    admin.setEmail( $('#admin-email-in').val() );
    admin.setPhone( $('#admin-phone-in').val() );
    admin.setAddr1( $('#admin-addr1-in').val() );
    admin.setAddr2( $('#admin-addr2-in').val() );
    admin.setCity(  $('#admin-city-in').val()  );
    admin.setState( $('#admin-state-in').val() );
    admin.setZip(   $('#admin-zip-in').val()   );
};

$(document).ready(function(){
    $("[id^='admin-']*[id$='-in'],#admin-cancel,#admin-submit").hide();

    $('#admin-image-container').mouseenter(function(){
        $('#admin-image-edit').stop();
        $('#admin-image-edit').animate({bottom: '-4px'},150);
    });
    $('#admin-image-container').mouseleave(function(){
        $('#admin-image-edit').stop();
        $('#admin-image-edit').animate({bottom: '-44px'},150);
    });
    
    $('#admin-image-edit').css('left', ($('#admin-image-container').outerWidth() - $('#admin-image-edit').outerWidth())/2);

    $('#assign-contact-realtor-modal').on('hidden.bs.modal', function (e) {
        $('#admin-contact-modal-table-body').html('');
        $('#admin-contact-modal-input').val('');
        $('#admin-realtor-modal-input').val('');
        $('#admin-realtor-modal-table-body').html('');
    });
    
    $('#admin-contact-modal-input').on('change',function(){
        var contact;
        admin.getContacts().forEach(function(element, index, array){
            if (element.getId() === $('#admin-contact-modal-input').val()) {
                contact = element;
            }
        });
        if (typeof(contact) !== 'undefined') {
            $('#admin-contact-modal-table-body').html(contact.getTableRowView());
        } else {
            $('#admin-contact-modal-table-body').html('');
        }
    });

    $('#admin-realtor-modal-input').on('change',function(){
        var realtor;
        admin.getRealtors().forEach(function(element, index, array){
            if (element.getId() === $('#admin-realtor-modal-input').val()) {
                realtor = element;
            }
        });
        if (typeof(realtor) !== 'undefined') {
            $('#admin-realtor-modal-table-body').html(realtor.getTableRowView());
        } else {
            $('#admin-realtor-modal-table-body').html('');
        }
    });
    
    // Assign Contact Realtor modal form handler
    $("#assign-contact-realtor-form").submit(function(){
        var data = {
            action: "setContactRealtor",
            contactId:   $('#admin-contact-modal-input').val(),
            realtorId:   $('#admin-realtor-modal-input').val()
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
                        $('#assign-contact-realtor-modal').modal('hide');
                    } else {
                        $('#assign-contact-realtor-modal-error').html('<p>'+data['message']+'</p>');
                        $('#assign-contact-realtor-modal-error').show(200);
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log("status: " + textStatus + "\n" + "Error: " + errorThrown);
            }
        });
        return false;
    });
});



$(document).on('click', '#assign-contact-realtor-modal-submit-btn', function(){
    var data = {
        action: "setContactRealtor",
        contactId:   $('#admin-contact-modal-input').val(),
        realtorId:   $('#admin-realtor-modal-input').val()
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
                    $('#assign-contact-realtor-modal').modal('hide');
                } else {
                    $('#assign-contact-realtor-modal-error').html('<p>'+data['message']+'</p>');
                    $('#assign-contact-realtor-modal-error').show(200);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("status: " + textStatus + "\n" + "Error: " + errorThrown);
        }
    });
    return false;
});

$(window).resize(function(){
    $('#admin-image-edit').css('left', ($('#admin-image-container').outerWidth() - $('#admin-image-edit').outerWidth())/2);
});

$(document).on('click', '#admin-edit', function() {
    $("[id^='admin-']*[id$='-in'],#admin-cancel,#admin-submit").show();
    $("[id^='admin-']*[id$='-p'],#admin-edit").hide();
    return false;
});

$(document).on('click', '#admin-cancel', function() {
    $("[id^='admin-']*[id$='-in'],#admin-cancel,#admin-submit").hide();
    $("[id^='admin-']*[id$='-p'],#admin-edit").show();
    admin.reset();
    populateAdminProfileForm();
    return false;
});

$(document).on('click', '#admin-submit', function() {
    $("[id^='admin-']*[id$='-in'],#admin-cancel,#admin-submit").prop('disabled', true);
    updateAdminFromForm();
    admin.saveAdmin();
    $('#admin-message').html('<div class="alert alert-info" role="alert"><strong>Wait.</strong> Saving Profile...</div>');
    return false;
});

$(document).on('admin-loaded',function(){
    populateAdminProfileForm();
    admin.getContacts();
});

$(document).on('admin-save-success',function(){
    populateAdminProfileForm();
    $("[id^='admin-']*[id$='-in'],#admin-cancel,#admin-submit").prop('disabled', false);
    $('#admin-message').html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Success!</strong> Your profile has been successfully saved.</div>');
    $("[id^='admin-']*[id$='-in'],#admin-cancel,#admin-submit").hide();
    $("[id^='admin-']*[id$='-p'],#admin-edit").show();
});

$(document).on('admin-save-failure',function(e,message){
    $('#admin-message').html(
            '<div class="alert alert-danger" role="alert"><strong>Failure!</strong> '
            + ( message ? message : 'Your profile did not successfully save. Please try again.' ) 
            + '</div>');
    $("[id^='admin-']*[id$='-in'],#admin-cancel,#admin-submit").prop('disabled', false);

});

$(document).on('realtors-loaded',function(){
    console.log('Realtors Loaded');
    $('#admin-realtors-table-body').html('');
    admin.getRealtors().forEach(function(element, index, array){
        $('#admin-realtors-table-body').append(element.getTableRowView());
    });
    $("[id^='realtor-tr-']").children().mouseenter(function(){
        $(this).parent().addClass('info');
    });
    $("[id^='realtor-tr-']").children().mouseout(function(){
        $(this).parent().removeClass('info');
    });
    $("[id^='realtor-tr-']").children().click(function(){
        var id = $(this).parent().attr('id');
        id = Number(id.substr(id.lastIndexOf('-')+1));
        alert('ID: ' + id + ' (' + typeof(id) + ')');
    });
});

$(document).on('contacts-loaded',function(){
    console.log('Contacts Loaded');
    $('#admin-contacts-table-body').html('');
    admin.getContacts().forEach(function(element, index, array){
        $('#admin-contacts-table-body').append(element.getTableRowView());
    });
    $("[id^='contact-tr-']").children().mouseenter(function(){
        $(this).parent().addClass('info');
    });
    $("[id^='contact-tr-']").children().mouseout(function(){
        $(this).parent().removeClass('info');
    });
    $("[id^='contact-tr-']").children().click(function(){
        var id = $(this).parent().attr('id');
        id = Number(id.substr(id.lastIndexOf('-')+1));
        alert('ID: ' + id + ' (' + typeof(id) + ')');
    });
    
    admin.getRealtors();
});


$(document).on('click', '.tag-list-remove', function( ) {
    $(this).parent().parent().remove();
});
