
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '大连金牌拓展训练俱乐部' });
};