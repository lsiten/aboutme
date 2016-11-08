var HomeMoudle =angular.module("HomeMoudle",[]);
HomeMoudle.controller("HomeTabCtrl",["$scope","$ionicSideMenuDelegate","$interval","$timeout","myHttpService",function(scope,sideMenu,interval,timeout,myhttp){
  //初始化localStorage
 localStorage.setItem("activityinfo.PageNum",0);
 localStorage.setItem("activityinfo.count",0);
 localStorage.setItem("activity.PageNum",0);
 localStorage.setItem("activity.count",0);
 localStorage.setItem("activityinfo.infiniteErrNum","0");
 localStorage.setItem("activityinfo.infiniteErrNumEnd",false);
 localStorage.setItem("activity.infiniteErrNum",0);
 localStorage.setItem("activity.infiniteErrNumEnd",false);

 localStorage.setItem("activityinfo.ActivityId",3);
//初始化加載變量
scope.activityinfo = {
  "haveNewData":false,
  "NewDatacount":0,
};
scope.activities = [];


    //活動信息列表下拉刷新，上拉加載
    scope.activityinfoRefresh = function(){
      var activityId =parseInt(localStorage.getItem("activityinfo.ActivityId"));
        myhttp.getActivityinfo(0,5,1,activityId)
              .success(function(response){
                if("success" == response.status)
                {
                  scope.activityinfo = {
                    "haveNewData":false,
                    "NewDatacount":0,
                  };
                  scope.activities =[];
                  localStorage.setItem("activityinfo.PageNum",0);
                  localStorage.setItem("activityinfo.count",response.obj.count);
                  scope.activities=response.list;
                  scope.activityHost = response.obj.host;
                }
            })
            .finally(function(){
              scope.$broadcast('scroll.refreshComplete');
            });
    }
    scope.activityinfoloadMore = function(){
      var infiniteErrNum = localStorage.getItem("activityinfo.infiniteErrNum");
      if(infiniteErrNum)
      {
        infiniteErrNum = parseInt(infiniteErrNum)+1;
      }
      else{
        infiniteErrNum=0;
      }
      //如果持續訪問錯誤5次，則暫停2秒鐘
      if(infiniteErrNum>5)
      {
        //如果有過一次定時任務，則退出
        var infiniteErrNumEnd = localStorage.getItem("activityinfo.infiniteErrNumEnd");
        if(infiniteErrNumEnd && "false"==infiniteErrNumEnd)
        {
          localStorage.setItem("activityinfo.infiniteErrNumEnd",true);
          timeout(function(){
            scope.activityloadMore();
            localStorage.setItem("activityinfo.infiniteErrNum","0");
            localStorage.setItem("activityinfo.infiniteErrNumEnd",false);
          },2000)
        }
        scope.$broadcast('scroll.infiniteScrollComplete');
        return false;
      }

      var activityId =parseInt(localStorage.getItem("activityinfo.ActivityId"));
      var pageNum = parseInt(localStorage.getItem("activityinfo.PageNum"));
      var nextPage = ++pageNum;
      myhttp.getActivityinfo(nextPage,5,0,activityId)
            .success(function(response){
              if("success" == response.status)
              {
                scope.activityinfo = {
                  "haveNewData":false,
                  "NewDatacount":0,
                };
                if(response.list && response.list.length>0){
                  localStorage.setItem("activityinfo.PageNum",nextPage);
                  localStorage.setItem("activityinfo.count",response.obj.count);
                  for(i in response.list)
                    scope.activities.push(response.list[i]);
                }else {
                  localStorage.setItem("activityinfo.infiniteErrNum",infiniteErrNum);
                }
              }
            }).error(function(){
              localStorage.setItem("activityinfo.infiniteErrNum",infiniteErrNum);
            }).finally(function(){
              scope.$broadcast('scroll.infiniteScrollComplete');
            });
    }


    //活動下拉刷新，上拉加載
    scope.activityRefresh = function(){
        myhttp.getActivity()
              .success(function(response){
                if("success" == response.status)
                {
                  scope.activityItems =[];
                  localStorage.setItem("activity.PageNum",0);
                  localStorage.setItem("activity.count",response.obj.count);
                  scope.activityItems=response.list;
                }
            })
            .finally(function(){
              scope.$broadcast('scroll.refreshComplete');
            });
    }
    scope.activityloadMore = function(){
      var infiniteErrNum = localStorage.getItem("activity.infiniteErrNum");
      if(infiniteErrNum && !isNaN(infiniteErrNum))
      {
        infiniteErrNum = infiniteErrNum+1;
      }
      else{
        infiniteErrNum=0;
      }
      //如果持續訪問錯誤5次，則暫停2秒鐘
      if(infiniteErrNum>5)
      {
        //如果有過一次定時任務，則退出
        var infiniteErrNumEnd = localStorage.getItem("activity.infiniteErrNumEnd");
        if(infiniteErrNumEnd && "false"==infiniteErrNumEnd)
        {
          localStorage.setItem("activity.infiniteErrNumEnd",true);
          timeout(function(){
            scope.activityloadMore();
            localStorage.setItem("activity.infiniteErrNum",0);
            localStorage.setItem("activity.infiniteErrNumEnd",false);
          },2000)
        }
        scope.$broadcast('scroll.infiniteScrollComplete');
        return false;
      }

      var pageNum = parseInt(localStorage.getItem("activity.PageNum"));
      var nextPage = ++pageNum;
      myhttp.getActivity(nextPage)
            .success(function(response){
              if("success" == response.status)
              {
                if(response.list && response.list.length>0){
                  localStorage.setItem("activity.PageNum",nextPage);
                  localStorage.setItem("activity.count",response.obj.count);
                  localStorage.setItem("activity.infiniteErrNum",0);
                  for(i in response.list)
                    scope.activityItems.push(response.list[i]);
                }
                else {
                  localStorage.setItem("activity.infiniteErrNum",infiniteErrNum);
                }
              }
            }).error(function(){
              localStorage.setItem("activity.infiniteErrNum",infiniteErrNum);
            }).finally(function(){
              scope.$broadcast('scroll.infiniteScrollComplete');
            });
    }

scope.$on('$ionicView.afterEnter', function() {
var userid = parseInt(localStorage.getItem("userinfo.userid"));
if(userid && userid>0)
    scope.isLogin = true;
else
    scope.isLogin = false;
if(scope.isLogin)
{
  initDate();
}
//初始化數據
  function initDate(){
    //獲取活動詳情
      myhttp.getActivityinfo()
            .success(function(response){
              if("success" == response.status)
              {
                scope.activities =[];
                localStorage.setItem("activityinfo.PageNum",0);
                localStorage.setItem("activityinfo.count",response.obj.count);
                scope.activities=response.list;
                scope.activityHost = response.obj.host;
              }
            });
    //獲取活動
      myhttp.getActivity()
            .success(function(response){
                if("success" == response.status)
                {
                  scope.activityItems =[];
                  localStorage.setItem("activity.PageNum",0);
                  localStorage.setItem("activity.count",response.obj.count);
                  scope.activityItems=response.list;
                }
            });

            //定時獲取通知
             scope.timeNoter = interval(function(){
              myhttp.getActivityinfoNote()
                    .success(function(response){
                        if("succuss" == response.status)
                        {
                          var countoldData = parseInt(localStorage.getItem("activityinfo.count"));
                          var diff =response.obj.newDataCount - countoldData;
                          if(diff && diff>0)
                          scope.activityinfo = {
                            "haveNewData":true,
                            "NewDatacount":response.obj.newDataCount,
                          };
                        }
                      })
            },5000);
    }


});
scope.$on('$ionicView.afterLeave', function() {
  interval.cancel( scope.timeNoter );
});
//通過activityID獲取活動信息
    scope.getActivityinfoByActivityId = function(id){
      //獲取活動詳情
        myhttp.getActivityinfo(0,5,0,id)
              .success(function(response){
                if("success" == response.status)
                {
                  scope.activities =[];
                  localStorage.setItem("activityinfo.ActivityId",id);
                  localStorage.setItem("activityinfo.PageNum",0);
                  localStorage.setItem("activityinfo.count",response.obj.count);
                  scope.activities=response.list;
                  scope.activityHost = response.obj.host;
                }
              })
              .finally(function(){
                sideMenu.toggleLeft();
              });

    }

    scope.toggleLeft = function(){
      sideMenu.toggleLeft();
    }
}]);
