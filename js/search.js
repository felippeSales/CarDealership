
function printFormDisclaimerMessage() {

    if (property) {
        $('#user-message').html('<div class="alert alert-info" role="alert">Be sure that we have all the necessary contact information, you can check this in your <a href="portal.php">profile</a>.  </div>');
    } else {
        $('#user-message').html('<div class="alert alert-info" role="alert">Tell us about your property that you would like to sell/rent with us. <br> Be sure that we have all the necessary contact information, you can check this on your <a href="portal.php">profile</a>.  </div>');
    }
}
;

$(document).ready(function () {
    var featProps;

    $.ajax({
        type: "POST",
        async: true,
        url: "api.php",
        data: $.param({action: "simpleSearch",
            keywords: $("#search-input").val()}),
        success: function (data, textStatus, jqXHR) {
            if (typeof (data.success) !== 'undefined' && data.success === true) {
                featProps = data.properties;
                for (i = 0; i < featProps.length; i++) {
                    featProps[i] = new Property(featProps[i]);
                }

                $(document).trigger('search-loaded');
            } else {
                // Lookup didnt work... handle this error   <-- <-- <-- <-- <-- TODO: Figure out how to handle this error
            }
        },
        dataType: "json"
    });

    $(document).on('search-loaded', function () {
        
        console.log("finish");
        console.log(featProps);
        if (featProps.length === 0) {
            $.ajax({
                type: "POST",
                async: true,
                url: "api.php",
                data: $.param({action: "getFeaturedProperties",
                    numProperties: 4}),
                success: function (data, textStatus, jqXHR) {
                    if (typeof (data.success) !== 'undefined' && data.success === true) {
                        featProps = data.properties;
                        for (i = 0; i < featProps.length; i++) {
                            featProps[i] = new Property(featProps[i]);
                        }

                    } else {
                        // Lookup didnt work... handle this error   <-- <-- <-- <-- <-- TODO: Figure out how to handle this error
                    }
                },
                dataType: "json"
            });
        }
    });

    $(document).on('property-loaded', function (e, propertyId) {
        for (i = 0; i < featProps.length; i++) {
            if (featProps[i].getId() === propertyId) {
                $('#result-list').append(featProps[i].getListItemHTML());
                return;
            }
        }
    });
});

