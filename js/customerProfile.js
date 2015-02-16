/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var customer = new Customer();

populateUserProfileForm = function() {
    $('#name').html( customer.getFName() + ' ' + customer.getLName());
    $('#user-fname-p').html(  customer.getFName()  );
    $('#user-fname-in').val(  customer.getFName()  );
    $('#user-lname-p').html(  customer.getLName()  );
    $('#user-lname-in').val(  customer.getLName()  );
//    $('#user-email-p').html( customer.getEmail() );
//    $('#user-email-in').val( customer.getEmail() );
    $('#user-phone-p').html( customer.getPhone() );
    $('#user-phone-in').val( customer.getPhone() );
    $('#user-addr1-p').html( customer.getAddr1() );
    $('#user-addr1-in').val( customer.getAddr1() );
    $('#user-addr2-p').html( customer.getAddr2() );
    $('#user-addr2-in').val( customer.getAddr2() );
    $('#user-city-p').html(  customer.getCity()  );
    $('#user-city-in').val(  customer.getCity()  );
    $('#user-state-p').html( customer.getState() );
    $('#user-state-in').val( customer.getState() );
    $('#user-zip-p').html(   customer.getZip()   );
    $('#user-zip-in').val(   customer.getZip()   );
};

updateCustomerFromForm = function() {
    customer.setFName(  $('#user-fname-in').val()  );
    customer.setLName(  $('#user-lname-in').val()  );
//    customer.setEmail( $('#user-email-in').val() );
    customer.setPhone( $('#user-phone-in').val() );
    customer.setAddr1( $('#user-addr1-in').val() );
    customer.setAddr2( $('#user-addr2-in').val() );
    customer.setCity(  $('#user-city-in').val()  );
    customer.setState( $('#user-state-in').val() );
    customer.setZip(   $('#user-zip-in').val()   );
};

$(document).on('click', '#user-edit', function() {
    $('#user-contact-form').find('p.form-control-static').hide();
    $('#user-contact-form').find('input.form-control').show();
    $('#user-contact-form').data('editting', true);
    $('#user-edit').parent().hide();
    $('#user-submit').parent().show();
    return false;
});

$(document).on('click', '#user-cancel', function() {
    $('#user-contact-form').find('p.form-control-static').show();
    $('#user-contact-form').find('input.form-control').hide();
    $('#user-contact-form').data('editting', false);
    $('#user-edit').parent().show();
    $('#user-submit').parent().hide();
    $('#user-message').html('');
    customer.reset();
    populateUserProfileForm();
    return false;
});

$(document).on('click', '#user-submit', function() {
    updateCustomerFromForm();
    customer.saveCustomer();
    $('#user-message').html('<div class="alert alert-info" role="alert"><strong>Wait.</strong> Saving Profile...</div>');
    $('#user-fname-in').prop('disabled', true);
    $('#user-lname-in').prop('disabled', true);
//    $('#user-email-in').prop('disabled', true);
    $('#user-phone-in').prop('disabled', true);
    $('#user-addr1-in').prop('disabled', true);
    $('#user-addr2-in').prop('disabled', true);
    $('#user-city-in').prop('disabled', true);
    $('#user-state-in').prop('disabled', true);
    $('#user-zip-in').prop('disabled', true);
    $('#user-submit').prop('disabled', true);
    $('#user-submit').prop('disabled', true);
    return false;
});

$(document).ready(function() {
    $('#user-contact-form').data('editting',false);
    $('#user-contact-form').find('input.form-control').hide();
    $('#user-submit').parent().hide();
});

$(document).on('customer-loaded',function() {
    populateUserProfileForm();
    customer.getSavedProperties();
});

$(document).on('customer-save-success',function() {
    populateUserProfileForm();
    $('#user-message').html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Success!</strong> Your profile has been successfully saved.</div>');
    $('#user-fname-in').prop('disabled', false);
    $('#user-lname-in').prop('disabled', false);
//    $('#user-email-in').prop('disabled', false);
    $('#user-phone-in').prop('disabled', false);
    $('#user-addr1-in').prop('disabled', false);
    $('#user-addr2-in').prop('disabled', false);
    $('#user-city-in').prop('disabled', false);
    $('#user-state-in').prop('disabled', false);
    $('#user-zip-in').prop('disabled', false);
    $('#user-submit').prop('disabled', false);
    $('#user-cancel').prop('disabled', false);
    $('#user-contact-form').find('p.form-control-static').show();
    $('#user-contact-form').find('input.form-control').hide();
    $('#user-contact-form').data('editting', false);
    $('#user-edit').parent().show();
    $('#user-submit').parent().hide();
});

$(document).on('customer-save-failure',function( e, message ) {
    if( message ) {
        $('#user-message').html('<div class="alert alert-danger" role="alert"><strong>Failure!</strong> ' + message + '</div>');
    } else {
        $('#user-message').html('<div class="alert alert-danger" role="alert"><strong>Failure!</strong> Your profile did not successfully save. Please try again.</div>');
    }
    $('#user-fname-in').prop('disabled', false);
    $('#user-lname-in').prop('disabled', false);
//    $('#user-email-in').prop('disabled', false);
    $('#user-phone-in').prop('disabled', false);
    $('#user-addr1-in').prop('disabled', false);
    $('#user-addr2-in').prop('disabled', false);
    $('#user-city-in').prop('disabled', false);
    $('#user-state-in').prop('disabled', false);
    $('#user-zip-in').prop('disabled', false);
    $('#user-submit').prop('disabled', false);
    $('#user-cancel').prop('disabled', false);
});

$(document).on('properties-loaded',function() {
    $('#favorites-list').html('');
    customer.getSavedProperties().forEach(function(element, index, array){
        $('#favorites-list').append(element.getListItemHTML());     
    });
    $("[id^='property-tr-']").children().mouseenter(function(){
        $(this).parent().addClass('info');
    });
    $("[id^='property-tr-']").children().mouseout(function(){
        $(this).parent().removeClass('info');
    });
    $("[id^='property-tr-']").children().click(function(){
        var id = $(this).parent().attr('id');
        id = Number(id.substr(id.lastIndexOf('-')+1));
        alert('ID: ' + id + ' (' + typeof(id) + ')');
    });
    customer.getContacts();
});

$(document).on('contacts-loaded',function() {
    $('#customer-contacts-table-body').html('');
    customer.getContacts().forEach(function(element, index, array){
        $('#customer-contacts-table-body').append(element.getTableRowView());     
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
});
