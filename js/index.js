$(function () {
    var viewPlaceHolder = $("#view");
    var SetPage = function (url, data) {
        mHelper.render(url, data, function (html) {
            viewPlaceHolder.html(html);

        });
    };
    var SetContentPage = function (data) {
        SetPage("content-page.tmpl", data);
    }
    hashRouter({
        '': function () {
            SetPage("index.tmpl", {});
        },
         'people-group': function () {
             mHelper.render("people-group.tmpl", "data-people.json", function (html) {
                 viewPlaceHolder.html(html);
             });
         },
        'company-intro': function () {
            SetContentPage("company-intro.json");
        },
        'management-consulting': function () {
            SetContentPage("management-consulting.json");
        },
        'vocational-training': function () {
            SetContentPage("vocational-training.json");
        },
        'new-employee': function () {
            SetContentPage("new-employee.json");
        },
        'barracks-life': function () {
            SetContentPage("barracks-life.json");
        }

        , 'hiking': function () { SetContentPage("hiking.json");}
        , 'cs-fighting': function () { SetContentPage("cs-fighting.json");}
        , 'fun-games': function () { SetContentPage("fun-games.json");}
        , 'summer-and-winter-camp': function () { SetContentPage("summer-and-winter-camp.json");}
        , 'quality-training': function () { SetContentPage("quality-training.json");}
        , 'eighteen-adult-ceremony': function () { SetContentPage("eighteen-adult-ceremony.json");}
        , 'barracks-life-young': function () { SetContentPage("barracks-life-young.json");}
        , 'wild-live-young': function () { SetContentPage("wild-live-young.json");}
        , 'fun-games-young': function () { SetContentPage("fun-games-young.json");}
        , 'people-ljl': function () { SetContentPage("people-ljl.json");}
        , 'people-ck': function () { SetContentPage("people-ck.json");}
        , 'people-wl': function () { SetContentPage("people-wl.json");}
        , 'people-wzy': function () { SetContentPage("people-wzy.json");}
        , 'people-zl': function () { SetContentPage("people-zl.json");}

        , 'wild-live': function () { SetContentPage("wild-live.json");}

    })

    mHelper.render("menu.tmpl", "menu.json", function (html) {
        $("#m-menus").html(html);
    });

})