$(function(){

      mHelper.render("menu.tmpl","menu.json",function(html){
          $("#m-menus").html(html);
      });

})