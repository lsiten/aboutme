var HomeMoudle=angular.module("HomeMoudle",[]);HomeMoudle.controller("HomeTabCtrl",["$scope","$ionicSideMenuDelegate","$interval","$timeout","myHttpService",function(t,e,o,a,c){localStorage.setItem("activityinfo.PageNum",0),localStorage.setItem("activityinfo.count",0),localStorage.setItem("activity.PageNum",0),localStorage.setItem("activity.count",0),localStorage.setItem("activityinfo.infiniteErrNum","0"),localStorage.setItem("activityinfo.infiniteErrNumEnd",!1),localStorage.setItem("activity.infiniteErrNum",0),localStorage.setItem("activity.infiniteErrNumEnd",!1),localStorage.setItem("activityinfo.ActivityId",3),t.activityinfo={haveNewData:!1,NewDatacount:0},t.activities=[],t.activityinfoRefresh=function(){var i=parseInt(localStorage.getItem("activityinfo.ActivityId"));c.getActivityinfo(0,5,1,i).success(function(i){"success"==i.status&&(t.activityinfo={haveNewData:!1,NewDatacount:0},t.activities=[],localStorage.setItem("activityinfo.PageNum",0),localStorage.setItem("activityinfo.count",i.obj.count),t.activities=i.list,t.activityHost=i.obj.host)}).finally(function(){t.$broadcast("scroll.refreshComplete")})},t.activityinfoloadMore=function(){var e=localStorage.getItem("activityinfo.infiniteErrNum");if(e=e?parseInt(e)+1:0,e>5){var o=localStorage.getItem("activityinfo.infiniteErrNumEnd");return o&&"false"==o&&(localStorage.setItem("activityinfo.infiniteErrNumEnd",!0),a(function(){t.activityloadMore(),localStorage.setItem("activityinfo.infiniteErrNum","0"),localStorage.setItem("activityinfo.infiniteErrNumEnd",!1)},2e3)),t.$broadcast("scroll.infiniteScrollComplete"),!1}var n=parseInt(localStorage.getItem("activityinfo.ActivityId")),s=parseInt(localStorage.getItem("activityinfo.PageNum")),l=++s;c.getActivityinfo(l,5,0,n).success(function(o){if("success"==o.status)if(t.activityinfo={haveNewData:!1,NewDatacount:0},o.list&&o.list.length>0){localStorage.setItem("activityinfo.PageNum",l),localStorage.setItem("activityinfo.count",o.obj.count);for(i in o.list)t.activities.push(o.list[i])}else localStorage.setItem("activityinfo.infiniteErrNum",e)}).error(function(){localStorage.setItem("activityinfo.infiniteErrNum",e)}).finally(function(){t.$broadcast("scroll.infiniteScrollComplete")})},t.activityRefresh=function(){c.getActivity().success(function(i){"success"==i.status&&(t.activityItems=[],localStorage.setItem("activity.PageNum",0),localStorage.setItem("activity.count",i.obj.count),t.activityItems=i.list)}).finally(function(){t.$broadcast("scroll.refreshComplete")})},t.activityloadMore=function(){var e=localStorage.getItem("activity.infiniteErrNum");if(e&&!isNaN(e)?e+=1:e=0,e>5){var o=localStorage.getItem("activity.infiniteErrNumEnd");return o&&"false"==o&&(localStorage.setItem("activity.infiniteErrNumEnd",!0),a(function(){t.activityloadMore(),localStorage.setItem("activity.infiniteErrNum",0),localStorage.setItem("activity.infiniteErrNumEnd",!1)},2e3)),t.$broadcast("scroll.infiniteScrollComplete"),!1}var n=parseInt(localStorage.getItem("activity.PageNum")),s=++n;c.getActivity(s).success(function(o){if("success"==o.status)if(o.list&&o.list.length>0){localStorage.setItem("activity.PageNum",s),localStorage.setItem("activity.count",o.obj.count),localStorage.setItem("activity.infiniteErrNum",0);for(i in o.list)t.activityItems.push(o.list[i])}else localStorage.setItem("activity.infiniteErrNum",e)}).error(function(){localStorage.setItem("activity.infiniteErrNum",e)}).finally(function(){t.$broadcast("scroll.infiniteScrollComplete")})},t.$on("$ionicView.afterEnter",function(){function i(){c.getActivityinfo().success(function(i){"success"==i.status&&(t.activities=[],localStorage.setItem("activityinfo.PageNum",0),localStorage.setItem("activityinfo.count",i.obj.count),t.activities=i.list,t.activityHost=i.obj.host)}),c.getActivity().success(function(i){"success"==i.status&&(t.activityItems=[],localStorage.setItem("activity.PageNum",0),localStorage.setItem("activity.count",i.obj.count),t.activityItems=i.list)}),t.timeNoter=o(function(){c.getActivityinfoNote().success(function(i){if("succuss"==i.status){var e=parseInt(localStorage.getItem("activityinfo.count")),o=i.obj.newDataCount-e;o&&o>0&&(t.activityinfo={haveNewData:!0,NewDatacount:i.obj.newDataCount})}})},5e3)}var e=parseInt(localStorage.getItem("userinfo.userid"));e&&e>0?t.isLogin=!0:t.isLogin=!1,t.isLogin&&i()}),t.$on("$ionicView.afterLeave",function(){o.cancel(t.timeNoter)}),t.getActivityinfoByActivityId=function(i){c.getActivityinfo(0,5,0,i).success(function(e){"success"==e.status&&(t.activities=[],localStorage.setItem("activityinfo.ActivityId",i),localStorage.setItem("activityinfo.PageNum",0),localStorage.setItem("activityinfo.count",e.obj.count),t.activities=e.list,t.activityHost=e.obj.host)}).finally(function(){e.toggleLeft()})},t.toggleLeft=function(){e.toggleLeft()}}]);