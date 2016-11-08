var userMoudle =angular.module("userMoudle",[]);
userMoudle.controller("UserTabCtrl",["$scope","$ionicModal","myHttpService",function(scope,modal,myHttp){
  modal.fromTemplateUrl('tpls/login/LoginTpl.html',
  {
    scope: scope,
    animation: 'slide-in-left'
  }).then(function(modalSetting){
    scope.LoginModal = modalSetting;
  });
  function checkeLogin()
  {
    scope.isLogin = true;
    var userId = localStorage.getItem("userinfo.userid")?localStorage.getItem("userinfo.userid"):false;
    if(userId && !isNaN(userId)){
      myHttp.checkeLogin(userId)
           .success(function(response){
             if("error" == response.status)
             {
                scope.LoginModal.show();
                scope.isLogin = false;
             }
           });
    }
    else{
      scope.LoginModal.show();
      scope.isLogin = false;
    }

  }
  scope.GoTologin = function()
  {
    scope.redirectTo("#/login");
  }
  //checkeLogin();
  scope.$on('$ionicView.afterEnter', function() {
    checkeLogin();
  });

}]);

userMoudle.controller("settingCtr",["$scope","$ionicModal","myHttpService",function(scope,modal,myHttp){
  var userid = parseInt(localStorage.getItem("userinfo.userid"));
  if(userid && userid>0)
    scope.isLogin = true;
  else
    scope.isLogin = false;
  scope.likeButton={checked: false};
  scope.likeButtonChange=function(){
    console.log(scope.likeButton);
  };
  scope.login=function(){
    scope.modal.hide();
    scope.redirectTo("#/login");
  }
  scope.loginOut=function(){
    userid = localStorage.getItem("userinfo.userid");
    scope.modal.hide();
    clearlocalUserInfo();
    myHttp.loginOut(userid);
    scope.refreshUrl("tabs.home");
  };
  /*
  **function 設置登錄狀態
  **@param uid 用戶id
  **@param uname 用戶姓名
  **author Eric
  **date 20160908
  */
 clearlocalUserInfo=function(uid,uname){
  localStorage.setItem("userinfo.userid",null);
  localStorage.setItem("userinfo.username",null);
  localStorage.setItem("userinfo.loginTime",null);
}
  scope.$on('$destroy', function() {
    scope.modal.remove();
  });
}]);


userMoudle.controller("LoginCtr",["$scope","$ionicLoading","$ionicPopup","$timeout","myHttpService",function(scope,loading,Popup,timeout,myHttp){
scope.user={
  "username":"",
  "password":""
  };
  scope.usererror={
    "username":false,
    "password":false
    };
/*
**function 顯示加載信息框
**@param message 顯示內容
**author Eric
**date 20160908
*/
  function showLoading(message)
  {
         loading.show({
          content: message,
          animation: 'fade-in',
          showDelay: 0
        });
  }

  /*
  **function 顯示對話框
  **@param message 顯示內容
  **author Eric
  **date 20160908
  */
    function showPopup(title,message,status="succuss",duration=3000)
    {
        var showPopupPopup=Popup.alert({
                       title: title,
                       template: message,
                       buttons:[]
          });
          return timeout(function() {
              showPopupPopup.close();
              if("succuss"==status && scope.LoginModal)
                  scope.LoginModal.hide();
              else if("succuss"==status){
                scope.refreshUrl("tabs.home");
              }
           }, duration);
    }
    /*
    **function 設置登錄狀態
    **@param uid 用戶id
    **@param uname 用戶姓名
    **author Eric
    **date 20160908
    */
   localUserInfo=function(uid,uname){
    localStorage.setItem("userinfo.userid",uid);
    localStorage.setItem("userinfo.username",uname);
    localStorage.setItem("userinfo.loginTime",(new Date()).valueOf());
  }
scope.vailfieldrequire = function(value)
  {
    if("username"==value)
      valuefield = scope.user.username;
    else
      valuefield = scope.user.password;
    if(valuefield && valuefield.length>0)
      return true;
    else
      return false;
  }
/*
**function 檢測值得正確性
**@param field 檢測字段
**author Eric
**date 20160908
*/
scope.CheckValue=function(field,vailMothend="require",callback)
{
    switch (vailMothend) {
      case "require":
          if(scope.vailfieldrequire(field))
          {
            if("username"==field)
              scope.usererror.username=false;
            else
              scope.usererror.password=false;
          }
          else {
            if("username"==field)
              scope.usererror.username=true;
            else
              scope.usererror.password=true;
          }
      break;
      case "callback":
          if (typeof callback === "function"){
               if(callback(field))
               {
                 if("username"==field)
                   scope.usererror.username=false;
                 else
                   scope.usererror.password=false;
               }
               else {
                 if("username"==field)
                   scope.usererror.username=true;
                 else
                   scope.usererror.password=true;
               }
           }
      break;
    default:
    if(scope.vailfieldrequire(field))
    {
      if("username"==field)
        scope.usererror.username=false;
      else
        scope.usererror.password=false;
    }
    else {
      if("username"==field)
        scope.usererror.username=true;
      else
        scope.usererror.password=true;
    }
    break;
  }
}
  //登錄處理
  scope.login = function(){
    var username = scope.user.username;
    var password = scope.user.password;
    if(!username || username.length<=0)
    {
      scope.usererror.username=true;
      return false;
    }
    if(!password || password.length<=0)
    {
      scope.usererror.password=true;
      return false;
    }
    showLoading("正在登錄...");
    myHttp.login(username,password)
          .success(function(response){
            if("succuss" == response.status)
            {
              localUserInfo(response.obj.id,response.obj.username);
              loading.hide();
              showPopup("登錄提示",response.message);
            }
            else {
              loading.hide();
              showPopup("登錄提示",response.message,"error");
            }
          })
          .error(function()
            {
              loading.hide();
              showPopup("登錄提示","登錄失敗，請檢查您的網絡","error");
            });
  }
//註冊跳轉
  scope.register = function(){
    if(scope.LoginModal)
      scope.LoginModal.hide();
    scope.redirectTo("#/register");
  }

  scope.$on('$destroy', function() {
    scope.LoginModal.remove();
  });
}]);



userMoudle.controller("RegisterCtr",["$scope","$ionicLoading","$ionicPopup","$timeout","myHttpService",function(scope,loading,Popup,timeout,myHttp){
scope.userRegist={
  "username":"",
  "password":"",
  "repassword":"",
  "usermail":""
  };
  scope.userRegisterror = {
    "username":false,
    "password":false,
    "repassword":false,
    "usermail":false
    }
    scope.userRegisterrorMessage = {
      "username":"用户名不能為空。",
      "password":"密碼不能為空。",
      "repassword":"確認密碼不能為空。",
      "usermail":"郵箱不能為空。"
      }
/*
**function 顯示加載信息框
**@param message 顯示內容
**author Eric
**date 20160908
*/
  function showLoading(message)
  {
         loading.show({
          content: message,
          animation: 'fade-in',
          showDelay: 0
        });
  }

  /*
  **function 顯示對話框
  **@param message 顯示內容
  **author Eric
  **date 20160908
  */
    function showPopup(title,message,status="success",duration=3000)
    {
        var showPopupPopup=Popup.alert({
                       title: title,
                       template: message,
                       buttons:[]
          });
          timeout(function() {
              showPopupPopup.close();
              if("success"==status)
                  scope.LoginModal.hide();
           }, duration);
    }


  //登錄跳轉
  scope.login = function(){
    window.location.href="#/login"
  }
  scope.CheckValue = function(field)
  {
    switch (field) {
      case "username":
        checkUsername();
      break;
      case "usermail":
        checkUsermail();
      break;
      case "password":
        checkPassword();
      break;
      case "repassword":
        checkRepassword();
      break;
      default:
        checkAllField();
        break;
    }
  }
  function checkUsername()
  {
    username = scope.userRegist.username;
    if(!username || username.length<=0)
    {
      scope.userRegisterror.username=true;
      scope.userRegisterrorMessage.username ="用戶名不能為空！";
      return false;
    }
    else {
      scope.userRegisterror.username=false;
      return true;
    }
  }
function checkUsermail()
  {
    usermail = scope.userRegist.usermail;
    if(!usermail || usermail.length<=0)
    {
      scope.userRegisterror.usermail=true;
      scope.userRegisterrorMessage.usermail ="用戶郵箱不能為空！";
      return false;
    }
    else {
      var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!filter.test(usermail))
      {
        scope.userRegisterror.usermail=true;
        scope.userRegisterrorMessage.usermail ="郵箱格式不正確！";
        return false;
      } else {
        scope.userRegisterror.usermail=false;
        return true;
      }
    }
  }
  function checkPassword()
  {
    password = scope.userRegist.password;
    if(!password || password.length<=0)
    {
      scope.userRegisterror.password=true;
      scope.userRegisterrorMessage.password ="密碼不能為空！";
      return false;
    }
    else {
      scope.userRegisterror.password=false;
      return true;
    }
  }
  function checkRepassword()
  {
    repassword = scope.userRegist.repassword;
    password = scope.userRegist.password;
    if(!repassword || repassword.length<=0)
    {
      scope.userRegisterror.repassword=true;
      scope.userRegisterrorMessage.repassword ="確認密碼不能為空！";
      return false;
    }
    else {
      if(repassword == password){
        scope.userRegisterror.repassword=false;
        return true;
      }
      else {
        scope.userRegisterror.repassword=true;
        scope.userRegisterrorMessage.repassword ="兩次輸入的密碼不相同！";
        return false;
      }

    }
  }
  function checkAllField()
  {
    if(!checkUsername())
      return false;
    if(!checkUsermail())
      return false;
    if(!checkPassword())
      return false;
    if(!checkRepassword())
      return false;
    return true;
  }
//註冊處理
  scope.register = function(){
    var username = scope.userRegist.username;
    var password = scope.userRegist.password;
    var repassword = scope.userRegist.repassword;
    var usermail = scope.userRegist.usermail;
    if(!checkAllField())
      return false;
    showLoading("正在註冊...");
    myHttp.register(username,password,repassword,usermail)
          .success(function(response){
            console.log(response);
            if("succuss" == response.status)
            {
              localUserInfo(userid,userName);
              loading.hide();
              showPopup("登錄提示",response.message);
              scope.redirectTo("#/login");
            }
            else {
              loading.hide();
              showPopup("登錄提示",response.message,"error");
            }
          }).error(function()
            {
              loading.hide();
              showPopup("登錄提示","註冊失敗，請檢查您的網絡","error");
            });
  }

}]);
