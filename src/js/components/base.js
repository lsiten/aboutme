var componentBase = function(name,config){
    var config = config || {};
    var id = ('lsiten_'+Math.random()).replace('.','_');
    var cls = "lsite_component_"+config.type;
    var component = $("<div class='lsiten_component "+cls+" lsiten_component_name_"+name+"' id='"+id+"'></div>");
    this.options = {
         duration:1000,//执行animate的时间，默认设置成1s
        // step：每次属性调整的回掉函数
        // queue：function队列
        // complete：完成动画的回掉函数
        // start：动画开始的时候调用
        // always：动画被终止或者意外发生没有执行完时发生
    }
    //如果有text，将text写入component
    config.text && component.text(config.text);
    config.html && component.html(config.html);
    
    //如果有width，设置component宽度   
    config.width && component.width(config.width);
    //如果有height，设置component高度    
    config.height && component.height(config.height);
    //如果有css，设置component 的css  
    config.css && component.css(config.css);
    //如果有bg，设置component的背景图片
    config.bg && component.css("backgroundImage",'url('+config.bg+')');
    //如果有animateOption，设置animate option  
    if(config.animateOption)
    {
        this.options = config.animateOption;
    }
    
    //水平剧中设置
    if(config.center === true)
    {
        component.css({
            marginLeft: (config.width/2 * -1) + "px",
            left: "50%"
        });
    }

    //定义更多参数
    

    //监听事件
    // 常用options有
    // duration：动画时间//执行animate的时间
    // queue：function队列
    // step：每次属性调整的回掉函数
    // complete：完成动画的回掉函数
    // start：动画开始的时候调用
    // always：动画被终止或者意外发生没有执行完时发生
    component.on("onLoad",function(){
        component.addClass(cls+"_load")
                 .removeClass(cls+"_leave");
        if(config.startTime)
        {
            var that = this;
            setTimeout(function(){
                config.animateIn && component.animate(config.animateIn,that.options);
            },config.startTime)
        }
        else{
            config.animateIn && component.animate(config.animateIn,this.options);            
        }
        return false;
    })
    component.on("onLeave",function(){
        component.addClass(cls+"_leave")
                .removeClass(cls+"_load");
        config.animateIn && component.animate(config.animateOut,this.options);        
        return false;
    })
    return component;
}