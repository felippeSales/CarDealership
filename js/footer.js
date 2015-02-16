
function checkScroll(){
    var body = document.body,
    html = document.documentElement;

    documentHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
                       
    windowSize = getWindowSize().height;
    documentHeight += 10;
    
    console.log(windowSize);
    console.log(documentHeight);
    
    
    if (documentHeight > windowSize){
        return true;
    }else{
        return false;
    }
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

$(document).on('footer-loaded',function(){
    
    var footerStyle =  document.getElementById('footer');
    
   var body = document.body,
    html = document.documentElement;

   documentHeight = Math.max( body.height);
   
   console.log(getPosition(footerStyle).y);
   console.log(documentHeight);
   //footerStyle.top = documentHeight;
   
    //Change the footer
//    if(checkScroll()){
//      
//      console.log("relative");
//      footerStyle.position = "relative";  
//    }else{  
//      console.log("absolute");
//      footerStyle.position = "absolute";
//    }
    
   
});
