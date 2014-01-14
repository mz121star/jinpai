$(function () {
    var viewPlaceHolder = $("#view");
    var SetPage = function (url, data) {
        mHelper.render(url, data, function (html) {
            viewPlaceHolder.html(html);
            var duoshuoQuery = {short_name: "dalianjinpai"};
           console.log("change!!!")
            var ds = document.createElement('script');
            ds.type = 'text/javascript';
            ds.async = true;
            ds.src = 'http://static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0]
                || document.getElementsByTagName('body')[0]).appendChild(ds);

        });
    }
    hashRouter({
        '': function () {
            SetPage("index.tmpl", {});
        },
        'companyintro': function () {

            SetPage("content-page.tmpl", "company-intro.json");
        },
        'management-consulting': function () {
            SetPage("content-page.tmpl", "management-consulting.json");
        }
    })

    mHelper.render("menu.tmpl", "menu.json", function (html) {
        $("#m-menus").html(html);
    });

})