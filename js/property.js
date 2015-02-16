/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Property (id) {
    // Private Properties
    var id = id;
    var addr1, oldAddr1;
    var addr2, oldAddr2;
    var city, oldCity;
    var state, oldState;
    var zip, oldZip;
    var pType, oldPType;
    var sType, oldSType;
    var numBeds, oldNumBeds;
    var numBaths, oldNumBaths;
    var size, oldSize;
    var land, oldLand;
    var built, oldBuilt;
    var price, oldPrice;
    var hoa, oldHoa;
    var description, oldDescription;
    var lat, oldLat;
    var long, oldLong;
    var agentId;
    var amenities, oldAmenities;
    var features, oldFeatures;
    var sold, oldSold;
    var images;
    var thumbnails;
    var favorite;
    var featured, oldFeatured;
    var changed;
    
    // Constructor
    var constructor = function(data, textStatus, jqXHR) {
        //console.log(data);
        addr1       = oldAddr1       = data.addr1;
        addr2       = oldAddr2       = data.addr2;
        city        = oldCity        = data.city;
        state       = oldState       = data.state;
        zip         = oldZip         = data.zip;
        pType       = oldPType       = data.pType;
        sType       = oldSType       = data.sType;
        numBeds     = oldNumBeds     = data.bed;
        numBaths    = oldNumBaths    = data.bath;
        size        = oldSize        = data.sqFeet;
        land        = oldLand        = data.landAcres;
        built       = oldBuilt       = data.yearBuilt;
        price       = oldPrice       = data.price;
        hoa         = oldHoa         = data.hoaFees;
        description = oldDescription = data.description;
        lat         = oldLat         = data.locationLat;
        long        = oldLong        = data.locationLong;
        agentId                      = data.realtorId;
        amenities   = oldAmenities   = data.amenities;
        features    = oldFeatures    = data.features;
        sold        = oldSold        = data.status;
        favorite                     = data.favorite;
        featured    = oldFeatured    = data.featured;
        if( typeof(data.images) !== 'undefined' && data.images.length > 0 ) {
            images = [];
            thumbnails = [];
            var i;
            for (i = 0; i < data.images.length; i++) {
                images[i] = 'images/' + data.images[i];
                thumbnails[i] = 'thumbnails/' + data.images[i];
            }
        } else {
            images  = ['images/propPlaceholder.png'];
            thumbnails  = ['images/propPlaceholder.png'];
        }
        changed = false;
        
        // Lets the document know this is done loading
        $(document).trigger('property-loaded',id);
    };
    $.ajax({
        type:       "POST",
        async:      true,
        url:        "api.php",
        data:       $.param({action: "getPropertyDetails", propertyId: id}),
        success:    constructor, 
        dataType:   "json"
    });
    
    // Public Methods
    
    // getters
    this.getId          = function() {  return id;          };
    this.getAddr1       = function() {  return addr1 ? addr1 : null;       };
    this.getAddr2       = function() {  return addr2 ? addr2 : null;       };
    this.getCity        = function() {  return city ? city : null;        };
    this.getState       = function() {  return state ? state : null;       };
    this.getZip         = function() {  return zip ? zip : null;         };
    this.getPType       = function() {  return pType ? pType.charAt(0).toUpperCase() + pType.slice(1) : null;       };
    this.getSType       = function() {  return sType ? sType.charAt(0).toUpperCase() + sType.slice(1) : null;       };
    this.getNumBeds     = function() {  return numBeds ? numBeds : null;     };
    this.getNumBaths    = function() {  return numBaths ? numBaths : null    };
    this.getSize        = function() {  return size ? size : null        };
    this.getLand        = function() {  return land ? land : null;        };
    this.getBuilt       = function() {  return built ? built : null       };
    this.getPrice       = function() {  return price;       };
    this.getHoa         = function() {  return hoa ? hoa : null         };
    this.getDescription = function() {  return description ? description : null };
    this.getLat         = function() {  return lat;         };
    this.getLong        = function() {  return long;        };
    this.getAgentId     = function() {  return agentId;     };
    this.getAmenities   = function() {  return amenities;   };
    this.getFeatures    = function() {  return features;    };
    this.getImages      = function() {  return images;      };
    this.getThumbnails  = function() {  return thumbnails;  };
    this.isSold         = function() {  return sold === 'sold';   };
    this.isFavorite     = function() {  return favorite;    };
    this.isFeatured     = function() {  return featured;    };
    
    // this functions generates a list item (html: <li>) that contains the 
    // property preview
    this.getListItemHTML = function(withContact) {
        
        if(typeof(withContact)==='undefined') withContact = true;
        
        // Initialize the output string 
        var htmlOut = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 property-preview"><div class="thumbnail">';
        
        // Append the favorite icon
        htmlOut += '<div class="favicon"><img src="';
        htmlOut += ( this.isFavorite() ? 'images/star-gold.png' : 'images/star-gray.png');
        htmlOut += '" id="property-favicon-' + this.getId() + '"></div>';
        
        // Append the html to display the images
        htmlOut += '<div id="carousel-property-' + this.getId() + '" class="carousel slide" data-ride="carousel">';
        
        // Append the featured ribbon
        htmlOut += ( this.isFeatured() ? '<span class="ribbon">FEATURED</span>' : '');
        
        // Continue the images
        htmlOut += '<ol class="carousel-indicators">';
        for( i = 0; i < this.getThumbnails().length; i++ ) {
            htmlOut += '<li data-target="#carousel-property-' + this.getId() + '" data-slide-to="'
                     + i + '"' + ( i === 0 ? ' class="active"' : '' ) + '></li>';
        }
        htmlOut += '</ol><div class="carousel-inner" role="listbox">';
        for( i = 0; i < this.getThumbnails().length; i++ ) {
            htmlOut += '<div class="item' + ( i === 0 ? ' active' : '' ) + '">';
            htmlOut += '<img src="' + this.getThumbnails()[i] + '">';
            htmlOut += '</div>';
        }
        htmlOut += '</div>';
        htmlOut += '<a class="left carousel-control" href="#carousel-property-' + this.getId() + '" role="button" data-slide="prev">';
        htmlOut += '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span>';
        htmlOut += '</a>';
        htmlOut += '<a class="right carousel-control" href="#carousel-property-' + this.getId() + '" role="button" data-slide="next">';
        htmlOut += '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span>';
        htmlOut += '</a></div>';
        
        // Append the price header
        htmlOut += '<h3><strong>';
        htmlOut += this.formatCurrency(this.getPrice());
        htmlOut += '</strong>';
        htmlOut += (this.getSType() === 'Rent' ? ' <small>/mo.</small>' : '');
        // Append sale type (sale/rent)
        if( this.isSold() ) {
            htmlOut += '<span class="property-sold ">SOLD!</span>';
        } else if( this.getSType() === 'Rent' ) {
            htmlOut += '<span class="property-sale-type">FOR RENT</span>';
        } else if( this.getSType() === 'Sale' ) {
            htmlOut += '<span class="property-sale-type">FOR SALE</span>';
        }
        
        // Close price header
        htmlOut += '</h3>';
        
        // Append the address
        htmlOut += '<p>';
        htmlOut += this.getAddr1() + (this.getAddr2() !== '' ? ', ' + this.getAddr2() : this.getAddr2());
        htmlOut += '<br>' + this.getCity() + ', ' + this.getState() + ' ' + this.getZip();
        htmlOut += '</p>';
        
        // Append the details button
        htmlOut += '<div class="text-center"><button btn-md class="btn btn-md btn-primary" id="property-details-btn-' + this.getId() + '">View Details</button>';
        
        if(withContact){
            htmlOut += '&nbsp';
            // Append the contact realtor button
            htmlOut += '<button type="button" class="btn btn-md btn-success" id="property-contact-btn-'  + this.getId() + '"> <span class="glyphicon glyphicon-envelope"></span> Contact   </button></div> ';
        }
        
        // Append the feature badges
        htmlOut += '<hr style="margin: 1em;"><ul class="list-inline text-center text-nowrap">'
                + '<li><span>' + this.getNumBeds() + '</span><br><small>Bed</small></li>'
                + '<li><span>' + this.getNumBaths() + '</span><br><small>Bath</small></li>'
                + '<li><span>' + this.getSize() + '</span><br><small>Sq. Ft.</small></li>'
                + '<li><span>' + this.getLand() + '</span><br><small>Lot Size</small></li>'
                + '<li><span>' + this.getBuilt() + '</span><br><small>Built</small></li>'
                + '</ul>';
        
        
                
        // Close the html containers and return the output string
        htmlOut += '</div></div>';
        
        // Assuming this html is written to the page, there needs to be event
        // handlers for the buttons in in, so we create them here.
        
        $(document).on('click','#property-favicon-' + this.getId(), this.toggleFavorite);
        $(document).on('click','#property-details-btn-' + this.getId(), gotoPropertyDetails);
        $(document).on('click','#property-contact-btn-' + this.getId(), gotoPropertyContact);
        
        return htmlOut;
    };
    
    this.getTableRowView = function() {
        var htmlOut = '<tr id="property-tr-' + this.getId() + '">';
        
        //<th>ID</th>
        htmlOut += '<td>' + this.getId() + '</td>';
        //<th>Address</th>
        htmlOut += '<td>' + this.getAddr1() + '<br>'
                +  ( this.getAddr2() ? this.getAddr2() + '<br>' : '' )
                + this.getCity() + ', ' +  this.getState() + ' ' + this.getZip()
                + '</td>';
        //<th>Price</th>
        htmlOut += '<td>' + this.formatCurrency(this.getPrice()) 
                + (this.getSType() === 'Rent' ? ' <small>/mo.</small>' : '' ) 
                + '</td>';
        //<th># Bed / Bath</th>
        htmlOut += '<td>' + this.getNumBeds() + ' / ' + this.getNumBaths() + '</td>';
        //<th>Property Type</th>
        htmlOut += '<td>' + this.getPType()
                + ' for ' + this.getSType()
                + '</td>';
        //<th>Area</th>
        htmlOut += '<td>' + this.getSize()+ ' sq. ft.</td>';
        //<th>Lot</th>
        htmlOut += '<td>' + this.getLand() + '</td>';
        //<th>Built</th>
        htmlOut += '<td>' + this.getBuilt() + '</td>';
        //<th>Sold</th>
        htmlOut += '<td>' + (this.isSold() ? 'yes' : 'no') + '</td>';
        //<th># Images</th>
        htmlOut += '<td>' + this.getImages().length + '</td>';
        //<th># Fav.</th>
        htmlOut += '<td>---</td>';
        //<th>Featured</th>
        htmlOut += '<td>' + (this.isFeatured() ? 'yes' : 'no') + '</td>';
        
        htmlOut += '</tr>';
        
        return htmlOut;
    };
    
    // Setters
    this.setAddr1 = function( newAddr1 ) { 
        if( addr1 !== newAddr1 ) {
            addr1 = newAddr1;
            changed = true;
        }
    };
    this.setAddr2 = function( newAddr2 ) {
        if( addr1 !== newAddr2 ) {
            addr2 = newAddr2;
            changed = true;
        }
    };
    this.setCity  = function( newCity  ) { 
        if( city !== newCity ) {
            city = newCity;
            changed = true;
        }
    };
    this.setState = function( newState ) {
        if( state !== newState ) {
            state = newState;
            changed = true;
        }
    };
    this.setZip   = function( newZip   ) {
        if( zip !== newZip ) {
            zip = newZip;
            changed = true;
        }
    };
    this.setPType = function( newPType ) { 
        if( pType !== newPType ) {
            pType = newPType;
            changed = true;
        }
    };
    this.setSType = function( newSType ) { 
        if( sType !== newSType ) {
            sType = newSType;
            changed = true;
        }
    };
    this.setNumBeds = function( newNumBeds ) { 
        if( numBeds !== newNumBeds ) {
            numBeds = newNumBeds;
            changed = true;
        }
    };
    this.setNumBaths = function( newNumBaths ) { 
        if( numBaths !== newNumBaths ) {
            numBaths = newNumBaths;
            changed = true;
        }
    };
    this.setSize = function( newSize ) { 
        if( size !== newSize ) {
            size = newSize;
            changed = true;
        }
    };
    this.setLand = function( newLand ) { 
        if( land !== newLand ) {
            land = newLand;
            changed = true;
        }
    };
    this.setBuilt = function( newBuilt ) { 
        if( built !== newBuilt ) {
            built = newBuilt;
            changed = true;
        }
    };
    this.setPrice = function( newPrice ) { 
        if( price !== newPrice ) {
            price = newPrice;
            changed = true;
        }
    };
    this.setHoa = function( newHoa ) { 
        if( hoa !== newHoa ) {
            hoa = newHoa;
            changed = true;
        }
    };
    this.setDescription = function( newDescription ) { 
        if( description !== newDescription ) {
            description = newDescription;
            changed = true;
        }
    };
    this.setLat = function( newLat ) { 
        if( lat !== newLat ) {
            lat = newLat;
            changed = true;
        }
    };
    this.setLong = function( newLong ) { 
        if( long !== newLong ) {
            long = newLong;
            changed = true;
        }
    };
    this.setAmenities = function( newAmenities ) { 
        if( amenities !== newAmenities ) {
            amenities = newAmenities;
            changed = true;
        }
    };
    this.setFeatures = function( newFeatures ) { 
        if( features !== newFeatures ) {
            features = newFeatures;
            changed = true;
        }
    };
    this.setSold = function( newSold ) { 
        if (newSold) {
            newSold = 'sold';
        } else {
            newSold = 'available';
        }
        if( sold !== newSold ) {
            sold = newSold;
            changed = true;
        }
        console.log(sold);
    };
    this.setFeatured = function( newFeatured ) { 
        if( featured !== newFeatured ) {
            featured = newFeatured;
            changed = true;   
        }
    };
    
    // Mutators
    this.saveProperty = function() {
        if( changed ) {
            $.ajax({
                type:       "POST",
                async:      true,
                url:        "api.php",
                data:       $.param({
                    action: "editProperty",
                    propertyId:      id,
                    addr1:           addr1,
                    addr2:           addr2,
                    city:            city,
                    state:           state,
                    zip:             zip,
                    pType:           pType,
                    sType:           sType,
                    bed:             numBeds,
                    bath:            numBaths,
                    sqFeet:          size,
                    landAcres:       land,
                    yearBuilt:       built,
                    price:           price,
                    hoaFees:         hoa,
                    description:     description,
                    locationLat:     lat,
                    locationLong:    long,
                    amenities:       amenities.join('::'),
                    features:        features.join('::'),
                    status:          sold,
                    featured:        featured
                }),
                success:    saveSuccess,
                dataType:   "json"
            });
        } else {
            $(document).trigger('property-save-success');
        }
    };
    
    // Private Methods
    // This method formats a number to fit the American style currency format with
    // a leading "$" and commas every third digit left of the period. It was 
    // written by faino (http://stackoverflow.com/users/1232175/faino) and I made
    // a small modification to it to not include the cents (anything past the ".")
    this.formatCurrency = function(num){
    var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
    if(str.indexOf(".") > 0) {
        parts = str.split(".");
        str = parts[0];
    }
    str = str.split("").reverse();
    for(var j = 0, len = str.length; j < len; j++) {
        if(str[j] != ",") {
            output.push(str[j]);
            if(i%3 == 0 && j < (len - 1)) {
                output.push(",");
            }
            i++;
        }
    }
    formatted = output.reverse().join("");
    return("$" + formatted);// + ((parts) ? "." + parts[1].substr(0, 2) : ""));
    };
    
    this.toggleFavorite = function() {
        $.ajax({
            type:       "POST",
            async:      true,
            url:        "api.php",
            data:       $.param({action: "toggleUserFavorite", propertyId: id}),
            success:    function(data, textStatus, jqXHR) {
                            if( typeof(data.success) !== 'undefined' && data.success === true ) {
                                favorite = !favorite;
                                $('#property-favicon-' + data.propertyId).attr( 'src', data.favorite ? 'images/star-gold.png' : 'images/star-gray.png');
                            }
                        },
            dataType:   "json"
        });
    };
    
    var gotoPropertyDetails = function() {
        window.location = window.location.href.substr(0, window.location.href.lastIndexOf('/') ) + '/propertyDetails.php?pid=' + id;
        return false;
    };
    
    var gotoPropertyContact = function() {
        window.location = window.location.href.substr(0, window.location.href.lastIndexOf('/') ) + '/contactRealtor.php?pid=' + id;
        return false;
    };
    
    var saveSuccess = function(data, textStatus, jqXHR) {
        if( typeof(data.success) !== 'undefined' && data.success === true ) {
            
            oldAddr1 = addr1;
            oldAddr2 = addr2;
            oldCity  = city;
            oldState = state;
            oldZip   = zip;
            oldPType = pType;
            oldSType = sType;
            oldNumBeds = numBeds;
            oldNumBaths = numBaths;
            oldSize = size;
            oldLand = land;
            oldBuilt = built;
            oldPrice = price;
            oldHoa = hoa;
            oldDescription = description;
            oldLat = lat;
            oldLong = long;
            oldAmenities = amenities;
            oldFeatures = features;
            oldSold = sold;
            oldFeatured = featured;
            
            changed = false;
            $(document).trigger('property-save-success');
        } else {
            $(document).trigger('property-save-failure',typeof(data.message) !== 'undefined' ? data.message : false);
        }
    };
    
    this.reset = function() {
        addr1   = oldAddr1;
        addr2   = oldAddr2;
        city    = oldCity;
        state   = oldState;
        zip     = oldZip;
        pType = oldPType;
        sType = oldSType;
        numBeds = oldNumBeds;
        numBaths = oldNumBaths;
        size = oldSize;
        land = oldLand;
        built = oldBuilt;
        price = oldPrice;
        hoa = oldHoa;
        description = oldDescription;
        lat = oldLat;
        long = oldLong;
        amenities = oldAmenities;
        features = oldFeatures;
        sold = oldSold;
        featured = oldFeatured;
        changed = false;
    };
}

