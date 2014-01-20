var page = require("webpage").create()
    ,   system = require("system")
    ;

page_dir = "pages";

/*if (system.args.length != 2) {
    throw new Error("[ERROR] : Arguments error");
    phantom.exit(1);
}else {*/
    //page_name = system.args[1];
    url="http://localhost:9999/#!company-intro";

    page.open(url, function (status) {
        if (status !== "success") {
            console.log("[ERROR] : Failed to load page");
            phantom.exit(1);
        }else{
            console.log(page.content)
            phantom.exit(0);
        }
    });
/*
}*/
