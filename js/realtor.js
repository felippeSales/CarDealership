/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Realtor(userId) {
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
    var image;
    var managedProperties;
    var changed;
    var contacts;
    var _propsReady;
    var _contactsReady;
    
    // Private Methods
    
    var constructor = function(data, textStatus, jqXHR) {
        id    = oldId     = data.id;
        fName = oldFName  = data.fName;
        lName = oldLName  = data.lName;
        email = oldEmail  = data.email;
        phone = oldPhone  = data.phone;
        addr1 = oldAddr1  = data.addr1;
        addr2 = oldAddr2  = data.addr2;
        city  = oldCity   = data.city;
        state = oldState  = data.state;
        zip   = oldZip    = data.zip;
        image             = data.photo;
        managedProperties = data.managedProperties;
        contacts          = data.contacts;
        console.log(data);
        changed = false;
        _propsReady = 0;
        _contactsReady = 0;
        
        $(document).trigger('realtor-loaded');
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
        if( _propsReady === managedProperties.length ) {
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
            $(document).trigger('realtor-save-success');
        } else {
            $(document).trigger('realtor-save-failure',typeof(data.message) !== 'undefined' ? data.message : false);
        }
    };
    
    // Public Methods
    // Getters
    this.getId     = function() { return id;   };
    this.getFName  = function() { return fName ? fName : '---';   };
    this.getLName  = function() { return lName ? lName : '---';   };
    this.getEmail  = function() { return email ? email : '---';   };
    this.getPhone  = function() { return phone ? phone : '---';   };
    this.getAddr1  = function() { return addr1 ? addr1 : '---';   };
    this.getAddr2  = function() { return addr2 ? addr2 : '---';   };
    this.getCity   = function() { return city ? city : '---';    };
    this.getState  = function() { return state ? state : '---';   };
    this.getZip    = function() { return zip ? zip : '---';     };
    this.getImage  = function() { return image;   };
    this.isChanged = function() { return changed;   };
    this.getManagedProperties = function() { 
        if( typeof(managedProperties) !== 'undefined' 
                && _propsReady !== managedProperties.length ) {
            managedProperties.forEach(function(element, index, array){
                array[index] = new Property(element);
            });
        }
        return managedProperties; 
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
    
    this.getPropertyById = function(propId){
        var result;
        managedProperties.forEach(function(prop) {
            
            if(prop.getId() === propId){
                console.log("found");
                result = prop;
            }
        });
        
        return result;
    };
    
     this.getViewListAgent = function(withButton) {
        
        var htmlOut =  '<div class="row">';
        htmlOut +=     ' <div class="col-xs-12"><h3>Listing Agent</h3></div>';
        htmlOut +=        '<div class="col-xs-5">';
        htmlOut +=            '<img src="images/user.jpg" class="img-responsive img-rounded">';         
        htmlOut +=            '<h4>'+ fName + ' ' + lName + '</h4>';
        htmlOut +=            '<strong>City:</strong><p>' + city + ' </p>';
        htmlOut +=           ' <strong>State:</strong><p>' + state + '</p>';
        
        if(withButton){
            htmlOut +=      ' <button type="button" class="btn btn-sm btn-success" id="contact-button">';
            htmlOut +=           ' <span class="glyphicon glyphicon-envelope"></span> Contact';
            htmlOut +=      ' </button>';
        }
        
        htmlOut +=        '</div>';
        htmlOut +=    '</div>';
        
        return htmlOut;
    };
    
    this.getTableRowView = function() {
        var htmlOut = '<tr id="contact-tr-' + this.getId() + '">';
        
        //<th>ID</th>
        htmlOut += '<td>' + this.getId() + '</td>';
        //<th>Name</th>
        htmlOut += '<td>' + this.getFName() + ' ' + this.getLName() + '</td>';
        //<th>Email</th>
        htmlOut += '<td>' + this.getEmail() + '</td>';
        //<th>Phone</th>
        htmlOut += '<td>' + this.getPhone() + '</td>';
        //<th>City</th>
        htmlOut += '<td>' + this.getCity() + '</td>';
        //<th>State</th>
        htmlOut += '<td>' + this.getState() + '</td>';
        //<th>Zip</th>
        htmlOut += '<td>' + this.getZip() + '</td>';
        
        htmlOut += '</tr>';
        
        return htmlOut;
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
    
    // Mutators
    this.saveRealtor = function() {
        if( changed ) {
            $.ajax({
                type:       "POST",
                async:      true,
                url:        "api.php",
                data:       $.param({
                    action: "editUserDetails",
                    id:     id,
                    fName:  fName,
                    lName:  lName,
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
            $(document).trigger('realtor-save-success');
        }
    };
    
    this.reset = function() {
        fName   = oldFName;
        lName   = oldLName;
        email   = oldEmail;
        phone   = oldPhone;
        addr1   = oldAddr1;
        addr2   = oldAddr2;
        city    = oldCity;
        state   = oldState;
        zip     = oldZip;
        changed = false;
    };
}
