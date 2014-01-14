$(function () {
    var viewPlaceHolder = $("#view");
    var SetPage=function(url,data){
        mHelper.render(url, data, function (html) {
            viewPlaceHolder.html(html);
        });
    }
    hashRouter({
         '':function(){
             SetPage("index.tmpl", {});
         },
        'companyintro': function () {

            SetPage("content-page.tmpl", "company-intro.json" );
        },
        'management-consulting':function(){
            SetPage("content-page.tmpl", "management-consulting.json" );
        }
    })

    mHelper.render("menu.tmpl", "menu.json", function (html) {
        $("#m-menus").html(html);
    });

})