
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '大连金牌企业管理咨询有限公司' });
};