/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var _GET = getQueryVars();
var _P;
var realtor;

function getQueryVars() {
    var vars = [], hash;
    var q = document.URL.split('?')[1];
    if(q !== undefined){
        q = q.split('&');
        for(var i = 0; i < q.length; i++){
            hash = q[i].split('=');
            vars.push(hash[1]);
            vars[hash[0]] = hash[1];
        }
    }
    return vars;
}

$(document).ready(function(){
    if( typeof(_GET.pid) !== 'undefined' ) {
        _P = new Property(_GET.pid);
    }
});


$(document).on('click','#contact-button', function(){
    
    window.location = window.location.href.substr(0, window.location.href.lastIndexOf('/') ) + '/contactRealtor.php?pid=' + _GET.pid;
    return false;
    
});

$(document).on('property-loaded',function( e, propertyId ) {
    $('#pe-addr').html(
            _P.getAddr1()
            + ( _P.getAddr2() ? ' ' + _P.getAddr2() : '')
            + ', ' + _P.getCity() + ', ' + _P.getState() + ' ' + _P.getZip());
    $("#pe-price").html( ' <h3><small>'  
            + ( _P.getSType() === 'sale' ? 'Asking Price' : 
                  ( _P.getSType() === 'rent' ? 'Monthly Rent' : 'Price') ) 
            + '</small><br>' + _P.formatCurrency(_P.getPrice()) + '</h3>' );
    $('#pe-price-per-sqft').html(
            '<h3><small>Price / Sq. Ft.</small><br>' 
            + _P.formatCurrency(_P.getPrice()/_P.getSize()) 
            + '</h3>');
    $('#pe-hoa-fees').html(
            '<h3><small>HOA Fees</small><br>'
            + ( _P.getHoa() ? _P.formatCurrency(_P.getHoa()) : '---' )
            + '</h3>' );
    
    // Populate the Stat Buttons
    $('#pe-hoa-bed').html(
            '<h3><small>Bed</small><br>' +     
            _P.getNumBeds() + '</h3>');
    $('#pe-hoa-bath').html(
            '<h3><small>Bath</small><br>' +     
            _P.getNumBaths() + '</h3>');
    $('#pe-hoa-sq-ft').html(
            '<h3><small>Sq. Ft.</small><br>' +     
            _P.getSize() + '</h3>');
    $('pe-hoa-acres').html(
            '<h3><small>Acres</small><br>' +     
            ( _P.getLand() ? _P.getLand() : '---' ) + '</h3>');
    $('#pe-hoa-year-built').html(
            '<h3><small>Year Built</small><br>' +     
            _P.getBuilt() + '</h3>');
    
    $('#pe-description').html(_P.getDescription());
    
    $('#pe-amenities').html('');
    for (index = 0; index < _P.getAmenities().length; ++index) {
        $('#pe-amenities').append('<li>' + _P.getAmenities()[index] + '</li>');
    }
    $('#pe-features').html('');
    for (index = 0; index < _P.getFeatures().length; ++index) {
        $('#pe-features').append('<li>' + _P.getFeatures()[index] + '</li>');
    }

    // Add images to the carousel
    if (_P.getImages() !== null) {
        if (_P.getImages().length >= 1) {
            $('#pe-images-carousel ol.carousel-indicators').html(
                    '<li data-target="#pe-images-carousel" data-slide-to="0" class="active"></li>'
                    );
            $('#pe-images-carousel div.carousel-inner').html(
                    '<div class="item active"><img src="'
                    + _P.getImages()[0] + '"></div>'
                    );
        }
        if (_P.getImages().length > 1) {
            for( index = 1; index < _P.getImages().length; ++index) {
                $('#pe-images-carousel ol.carousel-indicators').append(
                        '<li data-target="#pe-images-carousel" data-slide-to="' 
                        + index + '"></li>'
                        );
                $('#pe-images-carousel div.carousel-inner').append(
                        '<div class="item"><img src="'
                        + _P.getImages()[index] + '"></div>'
                        );
            }
        }
    }
    
    realtor = new Realtor(_P.getAgentId());
    
    // Lastly we unhide the container
    $('#property-container').removeClass('hidden');
});


$(document).on('realtor-loaded',function() {
  
   $('#list-agent').html(realtor.getViewListAgent(true));
   
});
