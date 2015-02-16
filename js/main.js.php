<?php
header('Content-Type: text/javascript');

// This file loads the appropriate javascript files for each page. Please note 
// that the order may be important. For example: for profile.php, 
// customerProfile.js requires customer.js, which requires property.js and so on,
// therefore, the files must be loaded in the opposite order.
// Using this php construction method lowered the page load time ~450ms from 
// ~675ms with the AJAX js dependency loading method.

// Includes the javascript needed for header.php and footer.php (therefore 
// required by all pages on the site)
echo file_get_contents('./header.js');

// Contructs the javascript that is required by each individial page
if( isset($_GET['p']) ) {
    switch ($_GET['p']) {
        case "controlPanel.php":
            echo file_get_contents('./contact.js');
            echo file_get_contents('./customer.js');
            echo file_get_contents('./realtor.js');
            echo file_get_contents('./admin.js');
            echo file_get_contents('./controlPanel.js');
            break;
        case "profile.php":
            echo file_get_contents('./contact.js');
            echo file_get_contents('./property.js');
            echo file_get_contents('./customer.js');
            echo file_get_contents('./customerProfile.js');
            break;
        case "portal.php":
            echo file_get_contents('./contact.js');
            echo file_get_contents('./customer.js');
            echo file_get_contents('./newProperty.js');
            echo file_get_contents('./property.js');
            echo file_get_contents('./realtor.js');
            echo file_get_contents('./portal.js');
            break;
        case "index.php":
            echo file_get_contents('./property.js');
            echo file_get_contents("./index.js");
            break;
        case "propertyDetails.php":
            echo file_get_contents('./property.js');
            echo file_get_contents('./propertyDetails.js');
            echo file_get_contents('./realtor.js');
            break;
        case "searchResults.php":
            echo file_get_contents('./property.js');
            echo file_get_contents("./search.js");
            break;
        case "contactRealtor.php":
            echo file_get_contents('./contact.js');
            echo file_get_contents('./realtor.js');
            echo file_get_contents('./property.js');
            echo file_get_contents('./customer.js');
            echo file_get_contents("./customerContact.js");
            break;
        case "propertyImage.php":
            echo file_get_contents('./property.js');
            echo file_get_contents("./propertyImage.js");
            break;
//        default:
//            echo file_get_contents('./g20.js');
//            break;
    }
}
