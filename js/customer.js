/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Customer (userId) {
    // Private Properties
    var id, oldId;
    var fName, oldFName;
    var lName, oldLName;
    var email, oldEmail;
    var phone, oldPhone;
    var addr1, oldAddr1;
    var addr2, oldAddr2;
    var city, oldCity;
    var state, oldState;
    var zip, oldZip;
    var savedProperties;
    var contacts;
    var changed;
    var _propsReady;
    var _contactsReady;
    
    // PRIVATE METHODS
    
    // Constructor
    var constructor = function(data, textStatus, jqXHR) {
        id    = oldId    = data.id;
        fName  = oldFName  = data.fName;
        lName  = oldLName  = data.lName;
        email = oldEmail = data.email;
        phone = oldPhone = data.phone;
        addr1 = oldAddr1 = data.addr1;
        addr2 = oldAddr2 = data.addr2;
        city  = oldCity  = data.city;
        state = oldState = data.state;
        zip   = oldZip   = data.zip;
        savedProperties = data.savedProperties;
        contacts = data.contacts;
        changed = false;
        _propsReady = 0;
        _contactsReady = 0;
        
        $(document).trigger('customer-loaded');
    };
    $.ajax({
        type:       "POST",
        async:      true,
        url:        "api.php",
        data:       $.param(userId ? {action: "getUserDetails",
                                      userId: userId} 
                                   : {action: "getUserDetails"}),
        success:    constructor, 
        dataType:   "json"
    });
    
    $(document).on('property-loaded',function(){
        _propsReady++;
        if( _propsReady === savedProperties.length ) {
            $(document).trigger('properties-loaded');
        }
    });
    $(document).on('contact-loaded',function(){
        _contactsReady++;
        if( _contactsReady === contacts.length ) {
            $(document).trigger('contacts-loaded');
        }
    });
    
    var saveSuccess = function(data, textStatus, jqXHR) {
        if( typeof(data.success) !== 'undefined' && data.success === true ) {
            oldId    = id;
            oldFName = fName;
            oldLName = lName;
            oldEmail = email;
            oldPhone = phone;
            oldAddr1 = addr1;
            oldAddr2 = addr2;
            oldCity  = city;
            oldState = state;
            oldZip   = zip;
            changed = false;
            $(document).trigger('customer-save-success');
        } else {
            $(document).trigger('customer-save-failure',typeof(data.message) !== 'undefined' ? data.message : false);
        }
    };
    
    // Public Methods
    // GETTERS
    this.getId   = function() { return id;    };
    this.getFName  = function() { return fName ? fName : '---';   };
    this.getLName  = function() { return lName ? lName : '---';   };
    this.getEmail  = function() { return email ? email : '---';   };
    this.getPhone  = function() { return phone ? phone : '---';   };
    this.getAddr1  = function() { return addr1 ? addr1 : '---';   };
    this.getAddr2  = function() { return addr2 ? addr2 : '---';   };
    this.getCity   = function() { return city ? city : '---';    };
    this.getState  = function() { return state ? state : '---';   };
    this.getZip    = function() { return zip ? zip : '---';     };
    this.isChanged = function() { return changed; };
    // Returns the saved property with the id provided if it exists, otherwise,
    //   returns false.
    this.getSavedProperty = function(id) {
        this.getSavedProperties();
        for( i = 0; i < savedProperties.length; i++ ) {
            if( savedProperties[i].getId() === id ) {
                return savedProperties[i];
            }
        }
        return false;
    };
    this.getSavedProperties = function() {
        if( typeof(savedProperties) !== 'undefined' 
                && _propsReady !== savedProperties.length ) {
            savedProperties.forEach(function(element, index, array){
                array[index] = new Property(element);
            });
        }
        return savedProperties;
    };
    this.getContacts = function() { 
        if( typeof(contacts) !== 'undefined' 
                && _contactsReady !== contacts.length ) {
            contacts.forEach(function(element, index, array){
                array[index] = new Contact(element);
            });
        }
        return contacts; 
    };
    // SETTERS
    this.setFName  = function( newFName  ) {
        if( fName !== newFName ) {
            fName = newFName;
            changed = true;
        }
    };
    this.setLName  = function( newLName  ) {
        if( lName !== newLName ) {
            lName = newLName;
            changed = true;
        }
    };
//    this.setEmail = function( newEmail ) { 
//        if( email !== newEmail ) {
//            email = newEmail;
//            changed = true;
//        }
//    };
    this.setPhone = function( newPhone ) { 
        if( phone !== newPhone ) {
            phone = newPhone;
            changed = true; 
        }
    };
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
    
    // MUTATORS
    this.saveCustomer = function() {
        if( changed ) {
            $.ajax({
                type:       "POST",
                async:      true,
                url:        "api.php",
                data:       $.param({
                    action: "editUserDetails",
                    id:     id,
                    fName:   fName,
                    lName:   lName,
//                    email:  email,
                    phone:  phone,
                    addr1:  addr1,
                    addr2:  addr2,
                    city:   city,
                    state:  state,
                    zip:    zip
                }),
                success:    saveSuccess,
                dataType:   "json"
            });
        } else {
            $(document).trigger('customer-save-success');
        }
    };
    this.reset = function() {
        id    = oldId;
        fName  = oldFName;
        lName  = oldLName;
//        email = oldEmail;
        phone = oldPhone;
        addr1 = oldAddr1;
        addr2 = oldAddr2;
        city  = oldCity;
        state = oldState;
        zip   = oldZip;
        changed = false;
    };
}
