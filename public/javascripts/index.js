// header buttion is activated when user clicked
$(document).ready(function () {
    $(function () {
        $('div a').click(function (e) {
            e.preventDefault();
            $('a').removeClass('active');
            var href = $(this).attr('href');
            window.location.href = href;
           //  $(this).addClass('active');

        });
    });
});

// when you click the delete button

function alertDel(){
    return confirm('Do you want to delete this movie infomation?');
}