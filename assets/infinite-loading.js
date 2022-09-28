function ScrollExecute() {       
      //if($(document).height() - 800 < ($(document).scrollTop() + $(window).height())) {
        if ($(window).scrollTop() >= $(
          '#product-list-foot').offset().top + $('#product-list-foot').
            outerHeight() - window.innerHeight) {
          scrollNode = $('a#more').last();    
          scrollURL = $('a#more').last().attr("href");
          //console.log(scrollURL);
          changeNode = $('a#more').last(); 
           pageNumber = $('a#more').last().attr("href");
          pagesEnd = $('.pagesEnd').text();
           pagesEnd = parseInt(pagesEnd);
           
          pageNumber =  parseInt(pageNumber.substring(pageNumber.indexOf("?") + 6));
          
          if(pagesEnd >= pageNumber){           	                   	
               if(scrollNode.length > 0 && scrollNode.css('display') != 'none') {
                   $.ajax({
                       type: 'GET',
                       url: scrollURL,
                       beforeSend: function() {
                           //scrollNode.clone().empty().insertAfter(scrollNode).append('<img src=\"https://cdn.shopify.com/s/files/1/0382/4185/files/loading.gif" />');
                           scrollNode.clone().empty().insertAfter(scrollNode).append('<div class="loading-spinner"></div>');
                           
                           //scrollNode.hide();
                       },
                       success: function(data) {   
                           $('a#more div.loading-spinner').hide();                     
                           // remove loading feedback
                           var filteredData = $(data).find(".section__container");
                           filteredData.insertBefore( $("#product-list-foot") );
                               pageNumber++;
                               changeNode.attr({href:'{{collection.url}}/?page='+pageNumber.toString(), id:'more'});
                           changeNode.insertBefore( $("#product-list-foot") );
                           //scrollNode.hide();
                       },
                       dataType: "html"
                   });
               }
          } 
      }
    }

    $(document).ready(function() {
      $(window).on('scroll',function(){
        if (checkVisible($('#more'))) {
              //alert("Visible!!!");
            } else {
            $.doTimeout( 'scroll', 100, ScrollExecute);
          }          
      });
    });
    function checkVisible( elm, eval ) {
    eval = eval || "object visible";
    var viewportHeight = $(window).height(), // Viewport Height
        scrolltop = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();   

    if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
    if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}
  