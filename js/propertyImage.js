


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
   
   var property = new Property(getQueryVars()["pid"]);
    
    $(document).on('property-loaded',function(){
        $('#property-container').html(property.getListItemHTML(false));
    });
   
});
