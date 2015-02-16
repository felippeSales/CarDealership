/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// GLOBAL VARS
var PAGE = getPage();
var _GET = getQueryVars();

// GLOBAL FUNCTIONS
function getPage() {
    var pathname = window.location.pathname;
    return pathname.substr(pathname.lastIndexOf('/')+1);
}

function loadDependencies (page) {
    if (page === "profile.php") {
        $.getScript('js/customer.js'/*,function(data,textStatus,jqxhr){
            console.log("Load customer.js : " + textStatus + " (" + jqxhr.status + ")");
        }*/);
        $.getScript('js/customerProfile.js'/*,function(data,textStatus,jqxhr){
            console.log("Load customerProfile.js : " + textStatus + " (" + jqxhr.status + ")");
        }*/);
    }
}

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

$(document).ready(function() {
    _PAGE = getPage();
    _GET = getQueryVars();
    loadDependencies(_PAGE);
});