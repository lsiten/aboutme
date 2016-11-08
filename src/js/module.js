var app = angular.module("demoApp",["ionic","HomeMoudle","userMoudle"]);
app.run(function($rootScope,$state,$stateParams,$ionicPlatform){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.goToHome = function(){
    window.location.href="#/tabs/home";
  }
  $rootScope.GoTologin = function()
  {
    window.location.href="#/login";
  }
  $rootScope.redirectTo = function(url){
    window.location.href=url;
  }

/*
**实例
**$state.go("tab.backlog",{isCache:false});
*/
  $rootScope.refreshUrl = function(url)
  {
    $state.go(url,{isCache:false});
  }



  $ionicPlatform.ready(function(){
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

});
app.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise("/tabs/home");
  $stateProvider
  .state("tabs",{
    url:"/tabs",
    abstract:true,
    templateUrl:"tpls/tabs/tabsTpl.html"
  })
  .state('tabs.home', {
    url: "/home",
    views: {
        'home-tab': {
         templateUrl: "tpls/Home/HomeTpl.html",
         controller: 'HomeTabCtrl'
          }
        },
      cache:false,
      params:{isCache:true}
  })
  .state('tabs.user', {
    url: "/user",
    views: {
        'user-tab': {
            templateUrl: "tpls/user/UserTpl.html",
            controller: 'UserTabCtrl'
        }
      }
  })
  .state('home',{
    url:"/",
    templateUrl:"tpls/Home/HomeTpl.html"
  })
  .state("user",{
    url:"/user",
    templateUrl:"tpls/user/UserTpl.html"
  })
  .state("register",{
    url:"/register",
    templateUrl:"tpls/register/RegisterTpl.html"
  })
  .state("login",{
    url:"/login",
    templateUrl:"tpls/login/LoginPageTpl.html"
  });
});

app.controller("navCtr",["$scope","$ionicModal",function(scope,modal){
  modal.fromTemplateUrl('tpls/setting/settingTpl.html',
  {
    scope: scope,
    animation: 'slide-in-left'
  }).then(function(modalSetting){
    scope.modal = modalSetting;
  });
  scope.OpenSetting = function(){
    scope.modal.show();
  }
  scope.closeSetting = function() {
    scope.modal.hide();
  };
}]);
