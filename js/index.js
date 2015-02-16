
$(document).ready(function(){
    $("#mainpageSearchBtnImg").css("left", ((window.innerWidth - 125)/2) + "px");
});

$(window).resize(function(){
    $("#mainpageSearchBtnImg").css("left", ((window.innerWidth - 125)/2) + "px");
});

$(document).on('click','#mainpageSearchBtnImg',function(){
    var height = window.innerHeight + "px";
    $("html, body").animate({ scrollTop: height });
});

$(document).ready(function() {
    var featProps;
    
    $.ajax({
        type:       "POST",
        async:      true,
        url:        "api.php",
        data:       $.param({action: "getFeaturedProperties", numProperties: 4}),
        success:    function(data, textStatus, jqXHR){
            if( typeof(data.success) !== 'undefined' && data.success === true ) {
                featProps = data.properties;
                for( i = 0; i < featProps.length; i++ ) {
                    featProps[i] = new Property(featProps[i]);
                }
            } else {
                // Lookup didnt work... handle this error   <-- <-- <-- <-- <-- TODO: Figure out how to handle this error
            }
        }, 
        dataType:   "json"
    });
    
    $(document).on('property-loaded',function(e, propertyId) {
        for( i = 0; i < featProps.length; i++ ) {
            if( featProps[i].getId() === propertyId ) {
                $('#featured-list').append( featProps[i].getListItemHTML() );
                return;
            }
        }
    });
});