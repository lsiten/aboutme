var componentPoint = function(name,config){
    var point = new componentBase(name,config);
    var base = config.data[0][1]; //基于该项做计算
    //点的集合
    var pointDoms = [];
    $.each(config.data,function(index,item){
        var pointDom = $('<div class="point point_'+index+'">');

        var per = item[1]/base * 100 + "%";

        pointDom.width(per).height(per);
        var name = $('<div class="name">'+item[0]+'</div>');
        var pre = $('<div class="pre">'+item[1]*100+'%</div>');
        name.append(pre);
        pointDom.append(name);
        if(item[2])
        {
            pointDom.css("backgroundColor",item[2]);
        }
        if(item[3] !== undefined && item[4] !== undefined)
        {
            pointDom.data("left",item[3]);
            pointDom.data("top",item[4]);
        }
        pointDoms.push(pointDom);
        point.append(pointDom);
    })
    point.on("onLoad",function(){
        $.each(pointDoms,function(idx,itm){
            if(itm.data("left") !==undefined && itm.data("top") !== undefined)
            {
                itm.animate({
                    opacity:1,
                    left:itm.data("left"),
                    top: itm.data("top")
                })
            }
            else{
                itm.css("opacity",1);
            }
            
        })
    })
    point.on("onLeave",function(){
        $.each(pointDoms,function(idx,itm){
            itm.animate({
                opacity:0,
                left:0,
                top: 0
             })   
        })
    })
    return point;
}