/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function NewProperty () {
    // Private Properties
    this.addr1;
    this.addr2;
    this.city;
    this.state;
    this.zip;
    this.pType;
    this.sType;
    this.bed;
    this.bath;
    this.sqFeet;
    this.landAcres;
    this.yearBuilt;
    this.price;
    this.hoaFees;
    this.description;
    this.locationLat;
    this.locationLong;
    this.realtorId;
    this.amenities;
    this.features;
    this.status;
    this.favorite;
    this.featured;
    
    this.saveProperty = function() {
        var data = {
            action:         'addProperty',
            photo:          'images/1.jpg',
            addr1:          this.addr1,
            addr2:          this.addr2,
            city:           this.city,
            state:          this.state,
            zip:            this.zip,
            pType:          this.pType,
            sType:          this.sType,
            bed:            this.bed,
            bath:           this.bath,
            sqFeet:         this.sqFeet,
            landAcres:      this.landAcres,
            yearBuilt:      this.yearBuilt,
            price:          this.price,
            hoaFees:        this.hoaFees,
            description:    this.description,
            locationLat:    this.locationLat,
            locationLong:   this.locationLong,
            realtorId:      this.realtorId,
            amenities:      this.amenities.join('::'),
            features:       this.features.join('::'),
            status:         this.status,
            favorite:       this.favorite,
            featured:       this.featured
        };
        $.ajax({
            type:       "POST",
            async:      true,
            url:        "api.php",
            data:       $.param(data),
            success:    saveSuccess,
            dataType:   "json"
        });
    };
    
    var saveSuccess = function(data, textStatus, jqXHR) {
        if( typeof(data.success) !== undefined && data.success === true ) {
            $(document).trigger('new-prop-save-success');
        } else {
            $(document).trigger('new-prop-save-failure',(typeof(data.message) !== 'undefined' ? data.message : false));
        }
    };
    
    
}