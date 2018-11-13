$(document).ready(function(){
    sendBookRequest = function(id) {
        $.ajax({
            type: 'GET',
            url: '/books/'+id,
            success: function(resHTML) {
                html = $.parseHTML(resHTML, true);
                $('#booksGrid').html(html);    
            }
        })
    }
    
    $('.item-pagination').on('click', function(){
        pageId = $(this).html();
        console.log(pageId);
        $(".item-pagination").removeClass("active-pagination");
        $(this).addClass("active-pagination");
        sendBookRequest(pageId);
    });
    sendBookRequest(1);
});