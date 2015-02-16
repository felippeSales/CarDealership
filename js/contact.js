/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Contact (id) {
    // Private Properties
    var id = id;
    var propertyId, oldPropertyId;
    var customerId, oldCustomerId;
    var realtorId, oldRealtorId;
    var subject, oldSubject;
    var message, oldMessage;
    var seen;
    var changed;
    var fName;
    var lName;
    var email;
    var phone;
    var addr1;
    var addr2;
    var city;
    var state;
    var zip;
    
    // PRIVATE METHODS
    
    // Constructor
    var constructor = function(data, textStatus, jqXHR) {
        propertyId = oldPropertyId = data.propertyId;
        customerId = oldCustomerId = data.customerId;
        realtorId = oldRealtorId = data.realtorId;
        subject = oldSubject = data.subject;
        message = oldMessage = data.message;
        seen = data.seen;
        changed = false;
        
        fName  = data.fName;
        lName  = data.lName;
        email  = data.email;
        phone  = data.phone;
        addr1  = data.addr1;
        addr2  = data.addr2;
        city   = data.city;
        state  = data.state;
        zip    = data.zip;
        
        $(document).trigger('contact-loaded');
    };
    $.ajax({
        type:       "POST",
        async:      true,
        url:        "api.php",
        data:       $.param({action: "getContact",
                             contactId: id}),
        success:    constructor, 
        dataType:   "json"
    });
    
    var setRealtorSuccess = function(data, textStatus, jqXHR) {
        if( typeof(data.success) !== undefined && data.success === true ) {
            oldRealtorId = realtorId;
            $(document).trigger('set-realtor-success');
        } else {
            $(document).trigger('set-realtor-failure',typeof(data.message) !== 'undefined' ? data.message : false);
        }
    };
    
    var saveSuccess = function(data, textStatus, jqXHR) {
        if( typeof(data.success) !== undefined && data.success === true ) {
            oldPropertyId = propertyId;
            oldCustomerId = customerId;
            oldRealtorId = realtorId;
            oldSubject = subject;
            oldMessage = message; 
            changed = false;
            $(document).trigger('contact-save-success');
        } else {
            $(document).trigger('contact-save-failure',typeof(data.message) !== 'undefined' ? data.message : false);
        }
    };
    
    var toggleSeenSuccess = function(data, textStatus, jqXHR) {
        if( typeof(data.success) !== undefined && data.success === true ) {
            seen = !seen;
            $(document).trigger('toggle-seen-success');
        } else {
            $(document).trigger('toggle-seen-failure',typeof(data.message) !== 'undefined' ? data.message : false);
        }
    };
    
    // Public Methods
    // GETTERS
    this.getId   = function() { return id;    };
    this.getPropertyId   = function() { return propertyId;    };
    this.getCustomerId   = function() { return customerId;    };
    this.getRealtorId  = function() { return realtorId;    };
    this.getSubject  = function() { return subject;   };
    this.getMessage  = function() { return message;   };
    this.isSeen  = function() { return seen;   };
    this.isChanged = function() { return changed;   };
    
    this.getFName  = function() { return fName ? fName : '---';   };
    this.getLName  = function() { return lName ? lName : '---';   };
    this.getEmail  = function() { return email ? email : '---';   };
    this.getPhone  = function() { return phone ? phone : '---';   };
    this.getAddr1  = function() { return addr1 ? addr1 : '---';   };
    this.getAddr2  = function() { return addr2 ? addr2 : '---';   };
    this.getCity   = function() { return city ? city : '---';    };
    this.getState  = function() { return state ? state : '---';   };
    this.getZip    = function() { return zip ? zip : '---';     };
    
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
        //<th>Message</th>
        htmlOut += '<td>' + this.getMessage() + '</td>';
        
        htmlOut += '</tr>';
        
        return htmlOut;
    };

    // SETTERS
    this.setRealtorId  = function( newRealtorId  ) {
        if( realtorId !== newRealtorId ) {
            realtorId = newRealtorId;
            $.ajax({
                type:       "POST",
                async:      true,
                url:        "api.php",
                data:       $.param({
                    action: "setContactRealtor",
                    contactId:     id,
                    realtorId: realtorId
                }),
                success:    setRealtorSuccess,
                dataType:   "json"
            });
        }
    };
    this.setMessage  = function( newMessage  ) {
        if( message !== newMessage ) {
            message = newMessage;
            changed = true;
        }
    };
    
    // MUTATORS
    this.toggleSeen  = function( ) {
        $.ajax({
            type:       "POST",
            async:      true,
            url:        "api.php",
            data:       $.param({
                action: "toggleSeenContact",
                contactId:     id
            }),
            success:    toggleSeenSuccess,
            dataType:   "json"
        });
    };
    
    this.saveContact = function() {
        if( changed ) {
            $.ajax({
                type:       "POST",
                async:      true,
                url:        "api.php",
                data:       $.param({
                    action: "editContactMessage",
                    contactId:     id,
                    message:       message
                }),
                success:    saveSuccess,
                dataType:   "json"
            });
        } else {
            $(document).trigger('contact-save-success');
        }
    };
    
    this.reset = function() {
        propertyId = oldPropertyId;
        customerId = oldCustomerId;
        realtorId = oldRealtorId;
        subject = oldSubject;
        message = oldMessage;
        changed = false;
    };
}
