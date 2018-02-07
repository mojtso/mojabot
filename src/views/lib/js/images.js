function resetScreenVars() {
    screenWidth = $(window).width();
    screenHeight = $(window).height();
}

function srcSetToBg() {
    resetScreenVars();

    $('img.bg').each(function() {

        var p = $(this).parent();
        p.addClass("cover"); 

        if (Modernizr.srcset) {
            // supported
            var srcset = $(this).attr('srcset');
            // split srcset attribute values
            var srcsetSplit = srcset.split(", ");
            var largeSet = srcsetSplit[0];
            var mediumSet = srcsetSplit[1];
            var smallSet = srcsetSplit[2];

            // split url and width
            var large = largeSet.split(" ");
            var medium = mediumSet.split(" ");
            var small = smallSet.split(" ");

            // get img
            var largeImg = large[0];
            var mediumImg = medium[0];
            var smallImg = small[0];
            
            // get size
            var largeW = large[1];
            var largeSize = largeW.replace('w', '');
            var mediumW = medium[1];
            var mediumSize = mediumW.replace('w', '');
                
            if (screenWidth >= largeSize) { 
                p.css('background-image', "url(" + largeImg + ")");
            } else if (screenWidth >= mediumSize) {
                p.css('background-image', "url(" + mediumImg + ")");
            } else {
                p.css('background-image', "url(" + smallImg + ")");
            }
        } else {
            // not-supported
            var src = $(this).attr('src');
            p.css('background-image', "url(" + src + ")"); 
        }
        
    }); 

}