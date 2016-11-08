app.service("myHttpService",["$http",function(http){
  var host = "http://www.lsiten.cn/lsiten/index.php?s=";
  var urlTest = "data/test.json";
  //var urlactivityInfo = "data/activityInfo";
  var urlactivityInfo = "/Home/Activityapi/activityInfo/activity_id/3";
  //var urlactivity = "data/activity";
  var urlactivity = "/Home/Activityapi/activity";

  var urlactivityInfoNote = "/Home/Activityapi/newDataCount";
  var urlactivityInfoNote = "/Home/Activityapi/checkUserByid";


  var loginUrl="/Home/Activityapi/login";
  var registerUrl="/Home/Activityapi/register";
  var loginOutUrl = "/Home/Activityapi/loginOut";
  this.getTest=function(){
    return http.get(urlTest);
  }
  this.getActivityinfo=function(pageNum=0,pageSize=5,refresh=0,activityId=3){
    var url=host+urlactivityInfo+"/pageNum/"+pageNum+"/refresh/"+refresh+"/activity_id/"+activityId+".html";
    return http.get(url);
  }
  this.getActivity=function(pageNum=0,pageSize=5,refresh=0){
    var url=host+urlactivity+"/pageNum/"+pageNum+"/refresh/"+refresh+".html";
    return http.get(url);
  }

  this.getActivityinfoNote = function(){
    var url=host+urlactivityInfoNote+".html";
    return http.get(url);
  }
  this.checkeLogin = function(userId)
  {
    var url=host+urlactivityInfoNote+"/id/"+userId+".html";
    return http.get(url);
  }

  this.login = function(username,password)
  {
    var dataParams = {"username":username,"password":password};
    var url=host+loginUrl+".html";
    return http.post(url,dataParams,
                    {
                      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
  }
  this.register = function(username,password,repassword,usermail)
  {
    var dataParams = {"username":username,"password":password,"repassword":repassword,"usermail":usermail};
    var url=host+registerUrl+".html";
    return http.post(url,dataParams,
                    {
                      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
  }
  this.loginOut = function(userid)
  {
    var dataParams = {"userid":userid};
    var url=host+loginOutUrl+".html";
    return http.post(url,dataParams,
                    {
                      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
  }

}]);
