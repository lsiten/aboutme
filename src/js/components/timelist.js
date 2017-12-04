var componentTimelist =function(name,config){

    var timeList = new componentBase(name,config);
    var timeLists = [];
    $.each(config.data,function(idx,itm){
        var box = $('<div class="timelist timelist_'+idx+'">');
        var title = $('<div class="title">'+itm.title+'</div>')
        var content = $('<div class="content">'+itm.content+'</div>')
        box.append(title)
           .append(content);
        box.css("opacity",0);
        itm.startTime && box.data("start",itm.startTime)
        timeLists.push(box);
        timeList.append(box);
    })
    
    timeList.on("onLoad",function(){
        $.each(timeLists,function(idx,itm){
            if(itm.data("start") !== undefined)
            {
                setTimeout(function(){
                    itm.animate({
                        top:idx*70+"px",
                        opacity:1
                    },1000);
                },itm.data('start'))
            }
            else
            {
                itm.animate({
                    top:idx*70+"px",
                    opacity:1
                });
            }
        })
    })
    timeList.on("onLeave",function(){
        $.each(timeLists,function(idx,itm){
            itm.animate({
                top:0,
                opacity:0
            });
        })
    })
    return timeList;
}