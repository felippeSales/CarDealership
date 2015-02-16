/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

realtor = new Realtor();

populateRealtorProfileForm = function () {
    $('#name').html(realtor.getFName() + ' ' + realtor.getLName());
    $('#realtor-fname-p').html(realtor.getFName());
    $('#realtor-fname-in').val(realtor.getFName());
    $('#realtor-lname-p').html(realtor.getLName());
    $('#realtor-lname-in').val(realtor.getLName());
//    $('#realtor-email-p').html(realtor.getEmail());
//    $('#realtor-email-in').val(realtor.getEmail());
    $('#realtor-phone-p').html(realtor.getPhone());
    $('#realtor-phone-in').val(realtor.getPhone());
    $('#realtor-addr1-p').html(realtor.getAddr1());
    $('#realtor-addr1-in').val(realtor.getAddr1());
    $('#realtor-addr2-p').html(realtor.getAddr2());
    $('#realtor-addr2-in').val(realtor.getAddr2());
    $('#realtor-city-p').html(realtor.getCity());
    $('#realtor-city-in').val(realtor.getCity());
    $('#realtor-state-p').html(realtor.getState());
    $('#realtor-state-in').val(realtor.getState());
    $('#realtor-zip-p').html(realtor.getZip());
    $('#realtor-zip-in').val(realtor.getZip());
    //$('#realtor-image').attr('src',realtor.getImage());
};


populateEditPropertyForm = function (property) {


    //Clean the fields
    $('#edit-prop-amenities-target').html('');
    $('#edit-prop-features-target').html('');
    $('#edit-prop-message-target').html('');

    // ID
    $('#edit-prop-id').val(property.getId());

    // Address line 1
    $('#edit-prop-addr1').val(property.getAddr1());

    //Address line 2
    $('#edit-prop-addr2').val(property.getAddr2());

    //City
    $('#edit-prop-city').val(property.getCity());

    //State   
    $('#edit-prop-state').val(property.getState());

    //change the zip
    $('#edit-prop-zip').val(property.getZip());

    //Change the property type
    $('#edit-prop-ptype').val(property.getPType().toLowerCase());

    type = property.getPType().toLowerCase();

    if (type === 'house') {
        $('#edit-prop-ptype').selectedIndex = 0;
    } else {
        $('#edit-prop-ptype').selectedIndex = 1;
    }

    //Change the sale type

    $('#edit-prop-stype').val(property.getSType().toLowerCase());

    type = property.getSType().toLowerCase();

    if (type === 'sale') {
        $('#edit-prop-stype').selectedIndex = 0;
    } else {
        $('#edit-prop-stype').selectedIndex = 1;
    }

    //Change the bedrooms

    $('#edit-prop-bed').val(property.getNumBeds());

    //Change the bathrooms

    $('#edit-prop-bath').val(property.getNumBaths());

    //Change the SQFT

    $('#edit-prop-size').val(property.getSize());

    //Change the ACRES

    $('#edit-prop-lot').val(property.getLand());

    //Change the Year

    $('#edit-prop-built').val(property.getBuilt());

    //Change the Price

    $('#edit-prop-price').val(property.getPrice());

    //Change the HOA

    $('#edit-prop-hoa').val(property.getHoa());

    //Change description

    $('#edit-prop-desc').val(property.getDescription());

    //Amenities

    amenities = property.getAmenities();

    if (amenities[0] !== "") {
        amenities.forEach(function (ame) {
            console.log(ame);
            $('#edit-prop-amenities-target').append(
                    '<li><span class="badge">' + ame
                    + ' <span class="glyphicon glyphicon-remove tag-list-remove"></span></span></li>');

        });
    }

    //Features

    features = property.getFeatures();

    if (features[0] !== "") {
        features.forEach(function (feat) {
            console.log(feat);
            $('#edit-prop-features-target').append(
                    '<li><span class="badge">' + feat
                    + ' <span class="glyphicon glyphicon-remove tag-list-remove"></span></span></li>');

        });
    }


    console.log(property.isFeatured());
    //Featured Property
    if (property.isFeatured()) {
        $('#edit-prop-featbool').prop('checked', true);
    } else {
        $('#edit-prop-featbool').prop('checked', false);
    }

    //Sold? Property
    if (property.isSold()) {
        $('#edit-prop-soldbool').prop('checked', true);
    } else {
        $('#edit-prop-soldbool').prop('checked', false);
    }
    
    
    $('#edit-prop-image').attr("href", "propertyImage.php?pid=" + property.getId());
    

};

updateRealtorFromForm = function () {
    realtor.setFName($('#realtor-fname-in').val());
    realtor.setLName($('#realtor-lname-in').val());
//    realtor.setEmail( $('#realtor-email-in').val() );
    realtor.setPhone($('#realtor-phone-in').val());
    realtor.setAddr1($('#realtor-addr1-in').val());
    realtor.setAddr2($('#realtor-addr2-in').val());
    realtor.setCity($('#realtor-city-in').val());
    realtor.setState($('#realtor-state-in').val());
    realtor.setZip($('#realtor-zip-in').val());
};


updatePropertyFromForm = function (editProp) {

    editProp.setAddr1($('#edit-prop-addr1').val());
    editProp.setAddr2($('#edit-prop-addr2').val());
    editProp.setCity($('#edit-prop-city').val());
    editProp.setState($('#edit-prop-state').val());
    editProp.setZip($('#edit-prop-zip').val());
    editProp.setPType($('#edit-prop-ptype').val());
    editProp.setSType($('#edit-prop-stype').val());
    editProp.setNumBeds($('#edit-prop-bed').val());
    editProp.setNumBaths($('#edit-prop-bath').val());
    editProp.setSize($('#edit-prop-size').val());
    editProp.setLand($('#edit-prop-lot').val());
    editProp.setBuilt($('#edit-prop-built').val());
    editProp.setPrice($('#edit-prop-price').val());
    editProp.setHoa($('#edit-prop-hoa').val());
    editProp.setDescription($('#edit-prop-desc').val());
    console.log(($('#edit-prop-featbool:checked').length > 0 ? true : false));
    editProp.setFeatured(($('#edit-prop-featbool:checked').length > 0 ? true : false));
    editProp.setSold(($('#edit-prop-soldbool:checked').length > 0 ? true : false));
    var amenities = [];
    $('#edit-prop-amenities-target').children().children().each(function () {
        amenities.push($(this).html());
    });
    for (i = 0; i < amenities.length; i++) {
        amenities[i] = amenities[i].substr(0, amenities[i].indexOf(' <span'));
    }
    editProp.setAmenities(amenities);
    var features = [];

    $('#edit-prop-features-target').children().children().each(function () {
        features.push($(this).html());
    });
    for (i = 0; i < features.length; i++) {
        features[i] = features[i].substr(0, features[i].indexOf(' <span'));
    }
    editProp.setFeatures(features);
};

$(document).ready(function () {
    $("[id^='realtor-']*[id$='-in'],#realtor-cancel,#realtor-submit").hide();

    $('#realtor-image-container').mouseenter(function () {
        $('#realtor-image-edit').stop();
        $('#realtor-image-edit').animate({bottom: '-4px'}, 150);
    });
    $('#realtor-image-container').mouseleave(function () {
        $('#realtor-image-edit').stop();
        $('#realtor-image-edit').animate({bottom: '-44px'}, 150);
    });

    $('#realtor-image-edit').css('left', ($('#realtor-image-container').outerWidth() - $('#realtor-image-edit').outerWidth()) / 2);
});

$(window).resize(function () {
    $('#realtor-image-edit').css('left', ($('#realtor-image-container').outerWidth() - $('#realtor-image-edit').outerWidth()) / 2);
});

$(document).on('click', '#realtor-edit', function () {
    $("[id^='realtor-']*[id$='-in'],#realtor-cancel,#realtor-submit").show();
    $("[id^='realtor-']*[id$='-p'],#realtor-edit").hide();
    return false;
});

$(document).on('click', '#realtor-cancel', function () {
    $("[id^='realtor-']*[id$='-in'],#realtor-cancel,#realtor-submit").hide();
    $("[id^='realtor-']*[id$='-p'],#realtor-edit").show();
    realtor.reset();
    populateRealtorProfileForm();
    return false;
});

$(document).on('click', '#realtor-submit', function () {
    $("[id^='realtor-']*[id$='-in'],#realtor-cancel,#realtor-submit").prop('disabled', true);
    updateRealtorFromForm();
    realtor.saveRealtor();
    $('#realtor-message').html('<div class="alert alert-info" role="alert"><strong>Wait.</strong> Saving Profile...</div>');
    return false;
});

$(document).on('click', '#edit-prop-submit', function () {
    $("[id^='edit-prop-']*[id$='-in'],#edit-prop-cancel,#edit-prop-submit").prop('disabled', true);
    var editProp = realtor.getPropertyById($('#edit-prop-id').val());
    console.log(editProp);
    updatePropertyFromForm(editProp);
    editProp.saveProperty();
    $('#edit-prop-message-target').html('<div class="alert alert-info" role="alert"><strong>Wait.</strong> Saving Property...</div>');
    return false;
});

$(document).on('realtor-loaded', function () {
    populateRealtorProfileForm();
    realtor.getManagedProperties();
});

$(document).on('realtor-save-success', function () {
    populateRealtorProfileForm();
    $("[id^='realtor-']*[id$='-in'],#realtor-cancel,#realtor-submit").prop('disabled', false);
    $('#realtor-message').html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Success!</strong> Your profile has been successfully saved.</div>');
    $("[id^='realtor-']*[id$='-in'],#realtor-cancel,#realtor-submit").hide();
    $("[id^='realtor-']*[id$='-p'],#realtor-edit").show();
});

$(document).on('realtor-save-failure', function (e, message) {
    $('#realtor-message').html(
            '<div class="alert alert-danger" role="alert"><strong>Failure!</strong> '
            + (message ? message : 'Your profile did not successfully save. Please try again.')
            + '</div>');
    $("[id^='realtor-']*[id$='-in'],#realtor-cancel,#realtor-submit").prop('disabled', false);

});

$(document).on('property-save-success', function () {
    location.reload();
});

$(document).on('property-save-failure', function (e, message) {
    $('#edit-prop-message-target').html(
            '<div class="alert alert-danger" role="alert"><strong>Failure!</strong> '
            + (message ? message : 'Your property did not successfully save. Please try again.')
            + '</div>');
    $("[id^='edit-prop-']*[id$='-in'],#edit-prop-cancel,#edit-prop-submit").prop('disabled', false);

});


$(document).on('contacts-loaded', function () {
    $('#realtor-contacts-table-body').html('');
    realtor.getContacts().forEach(function (element, index, array) {
        $('#realtor-contacts-table-body').append(element.getTableRowView());
    });
    $("[id^='contact-tr-']").children().mouseenter(function () {
        $(this).parent().addClass('info');
    });
    $("[id^='contact-tr-']").children().mouseout(function () {
        $(this).parent().removeClass('info');
    });
    $("[id^='contact-tr-']").children().click(function () {
        var id = $(this).parent().attr('id');
        id = Number(id.substr(id.lastIndexOf('-') + 1));
        alert('ID: ' + id + ' (' + typeof (id) + ')');
    });
});

$(document).on('properties-loaded', function () {
    $('#realtor-properties-table-body').html('');
    realtor.getManagedProperties().forEach(function (element, index, array) {
        $('#realtor-properties-table-body').append(element.getTableRowView());
    });
    $("[id^='property-tr-']").children().mouseenter(function () {
        $(this).parent().addClass('info');
    });
    $("[id^='property-tr-']").children().mouseout(function () {
        $(this).parent().removeClass('info');
    });
    $("[id^='property-tr-']").children().click(function () {
        var id = $(this).parent().attr('id');
        id = id.substr(id.lastIndexOf('-') + 1);
        $('#edit-property-modal').modal();
        editProperty = realtor.getPropertyById(id);
        populateEditPropertyForm(editProperty);

    });
    
    realtor.getContacts();
});

$(document).ready(function () {

    $('#edit-prop-amenities').keypress(function (event) {
        if (event.which === 13) {
            $('#edit-prop-amenities-btn').click();
        }
    });
    $('#edit-prop-features').keypress(function (event) {
        if (event.which === 13) {
            $('#edit-prop-features-btn').click();
        }
    });

    $('#edit-prop-amenities-btn').click(function () {
        if ($('#edit-prop-amenities').val() !== '') {
            $('#edit-prop-amenities-target').append(
                    '<li><span class="badge">' + $('#edit-prop-amenities').val()
                    + ' <span class="glyphicon glyphicon-remove tag-list-remove"></span></span></li>');
        }
        $('#edit-prop-amenities').val('');
    });
    $('#edit-prop-features-btn').click(function () {
        if ($('#edit-prop-features').val() !== '') {
            $('#edit-prop-features-target').append(
                    '<li><span class="badge">' + $('#edit-prop-features').val()
                    + ' <span class="glyphicon glyphicon-remove tag-list-remove"></span></span></li>');
        }
        $('#edit-prop-features').val('');
    });
//    
    $('#new-prop-amenities').keypress(function (event) {
        if (event.which === 13) {
            $('#new-prop-amenities-btn').click();
        }
    });
    $('#new-prop-features').keypress(function (event) {
        if (event.which === 13) {
            $('#new-prop-features-btn').click();
        }
    });

    $('#new-prop-amenities-btn').click(function () {
        if ($('#new-prop-amenities').val() !== '') {
            $('#new-prop-amenities-target').append(
                    '<li><span class="badge">' + $('#new-prop-amenities').val()
                    + ' <span class="glyphicon glyphicon-remove tag-list-remove"></span></span></li>');
        }
        $('#new-prop-amenities').val('');
    });
    $('#new-prop-features-btn').click(function () {
        if ($('#new-prop-features').val() !== '') {
            $('#new-prop-features-target').append(
                    '<li><span class="badge">' + $('#new-prop-features').val()
                    + ' <span class="glyphicon glyphicon-remove tag-list-remove"></span></span></li>');
        }
        $('#new-prop-features').val('');
    });
    $('#new-prop-submit').click(function () {
        var newProp = new NewProperty();

        newProp.addr1 = $('#new-prop-addr1').val();
        newProp.addr2 = $('#new-prop-addr2').val();
        newProp.city = $('#new-prop-city').val();
        newProp.state = $('#new-prop-state').val();
        newProp.zip = $('#new-prop-zip').val();
        newProp.pType = $('#new-prop-ptype').val();
        newProp.sType = $('#new-prop-stype').val();
        newProp.bed = $('#new-prop-bed').val();
        newProp.bath = $('#new-prop-bath').val();
        newProp.sqFeet = $('#new-prop-size').val();
        newProp.landAcres = $('#new-prop-lot').val();
        newProp.yearBuilt = $('#new-prop-built').val();
        newProp.price = $('#new-prop-price').val();
        newProp.hoaFees = $('#new-prop-hoa').val();
        newProp.description = $('#new-prop-desc').val();
        newProp.featured = ($('#new-prop-featbool:checked').length > 0 ? true : false);
        newProp.amenities = [];
        $('#new-prop-amenities-target').children().children().each(function () {
            newProp.amenities.push($(this).html());
        });
        for (i = 0; i < newProp.amenities.length; i++) {
            newProp.amenities[i] = newProp.amenities[i].substr(0, newProp.amenities[i].indexOf(' <span'));
        }
        newProp.features = [];
        $('#new-prop-features-target').children().children().each(function () {
            newProp.features.push($(this).html());
        });
        for (i = 0; i < newProp.features.length; i++) {
            newProp.features[i] = newProp.features[i].substr(0, newProp.features[i].indexOf(' <span'));
        }

        newProp.saveProperty();
        $("[id^='new-prop-']").attr('disabled', true);
    });
});

$(document).on('click', '.tag-list-remove', function ( ) {
    $(this).parent().parent().remove();
});

$(document).on('new-prop-save-success', function () {
    $("[id^='new-prop-']").attr('disabled', false);
    $('#new-property-modal').modal('hide');
    $('#new-prop-addr1').val('');
    $('#new-prop-addr2').val('');
    $('#new-prop-city').val('');
    $('#new-prop-state').val('');
    $('#new-prop-zip').val('');
    $('#new-prop-ptype').val();
    $('#new-prop-stype').val();
    $('#new-prop-bed').val('');
    $('#new-prop-bath').val('');
    $('#new-prop-size').val('');
    $('#new-prop-lot').val('');
    $('#new-prop-built').val('');
    $('#new-prop-price').val('');
    $('#new-prop-hoa').val('');
    $('#new-prop-desc').val('');
    $('#new-prop-amenities-target').html('');
    $('#new-prop-features-target').html('');
    $('#new-prop-message-target').html('');
    realtor = new Realtor();
});

$(document).on('new-prop-save-failure', function (e, message) {
    $("[id^='new-prop-']").attr('disabled', false);
    $('#new-prop-message-target').html('');
    $('#new-prop-message-target').html(
            '<div class="alert alert-danger" role="alert"><strong>Failure!</strong> '
            + (message ? message : 'Your property did not successfully save. Please try again.')
            + '</div>');
});

$('#edit-property-modal').on('hidden.bs.modal', function (e) {
    $(this)
            .find("input,textarea,select")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();

});