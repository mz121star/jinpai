$(function () {
    var viewPlaceHolder = $("#view");
    var SetPage=function(url,data){
        mHelper.render(url, data, function (html) {
            viewPlaceHolder.html(html);

        });
    } ;
    var SetContentPage=function(data){
        SetPage("content-page.tmpl", data );
    }
    hashRouter({
         '':function(){
             SetPage("index.tmpl", {});
         },
        'company-intro': function () {
            SetContentPage("company-intro.json" );
        },
        'management-consulting':function(){
            SetContentPage("management-consulting.json" );
        },
        'vocational-training' :function(){
            SetContentPage("vocational-training.json" );
        }

    })

    mHelper.render("menu.tmpl", "menu.json", function (html) {
        $("#m-menus").html(html);
    });

})