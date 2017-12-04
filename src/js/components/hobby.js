var componentHobby = function(name,config){
    var hobby = new componentBase(name,config);
    var hobbys = [];
    $.each(config.data,function(idx,itm){
        var box = $("<div class='hobby hobby_"+idx+"'>");
        var back = $("<div class='back'><p>"+itm.content+"</p></div>");
        var front = $("<div class='front'><div class='mask'></div></div>");
        var blur = $("<div class='blur'>")
        //如果有bg，设置component的背景图片
        itm.bg && blur.css("backgroundImage",'url('+itm.bg+')');
        var title = $("<div class='title'>"+itm.title+"</div>");
        var des = $("<div class='des'>"+itm.des+"</div>");
        title.append(des);
        front.append(title)
             .append(blur); 
        itm.bgcolor &&  back.css("backgroundColor",itm.bgcolor);
        itm.left &&  box.data("left",itm.left);
        box.append(front);
        box.append(back);
        hobby.append(box);
        hobbys.push(box);
        box.on("mouseenter",function(){
            front.animate({
                opacity:0
            });
            back.animate({
                opacity:1,
                top:0
            })
        });
        box.on("mouseleave",function(){
            front.animate({
                opacity:1
            });
            back.animate({
                opacity:0,
                top:"100%"
            })
        });
    })



    hobby.on("onLoad",function(){
        $.each(hobbys,function(idx,itm){
            if(itm.data("left") !==undefined)
            {
                itm.animate({
                    opacity:1,
                    left:itm.data("left")
                })
            }
            else{
                itm.css("opacity",1);
            } 
        })
    })
    hobby.on("onLeave",function(){
        $.each(hobbys,function(idx,itm){
            itm.animate({
                opacity:0,
                left:0
             })   
        })
    })
    return hobby;
}