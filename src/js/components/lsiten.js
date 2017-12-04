// 内容管理组件
var lsiten = function(){
    this.id = ("lsiten_"+Math.random()).replace('.','_');
    this.el = $('<div class="lsiten" id="'+this.id+'">').hide();
    this.page = [];
    $('body').append(this.el);
    /**新增一个页面 
     * @param {string} name 组件的名称 会加入到ClassName
     * @param {string} text 页内的默认文本
     * @return {lsiten} 组件本身，用于链式操作
    */

    this.addPage = function(name,text){
        var page = $('<div class="lsiten_page section">');

        if( name !== undefined )
        {
            page.addClass("lsiten_page_"+name);
        }
        if( text !== undefined )
        {
            page.text(text);
        }

        this.el.append(page);
        
        this.page.push(page);
        return this;
    }

    this.addComponent = function(name ,config){
        var config = config || {};
        config = $.extend({
                            type:'base'
                        },config);
        var component;
        var page = this.page.slice(-1)[0];
        switch(config.type){
            case "base":
                component = new componentBase(name,config);
            break;
            case "point":
                component = new componentPoint(name,config);
            break;
            case "hobby":
                component = new componentHobby(name,config);
            break;
             case "timelist":
                component = new componentTimelist(name,config);
            break;
            default:
            break;
        }
        page.append(component);
        return this;
    }

    /**
     * 页面呈现
     */
    this.loaderHandler = function(images){

        var id =this.id;
        if(this._images === undefined)
        {
            //第一次加载页面
            this._images = (images || []).length;
            this._loaded = 0;
            window[id] = this;
            for(s in images){
                var item = images[s];
                var img = new Image;
                img.onload = function(){
                    window[id].loaderHandler(images);
                }
                img.src = item;
            }
            $(".progress").css("width",0);
            return this;
        }
        else
        {
            this._loaded++; 
            var rate = ((this._loaded/this._images)*100)>>0;
            $(".progress").css("width",rate+"%");
            if(this._loaded<this._images){
                return this;
            }
            else{
                $("#loading").hide();
            }
        }

        window[id] = null;


        this.el.fullpage({
                //Navigation
                menu: '#menu',
                lockAnchors: false,
                anchors:['Home', 'skill','project', 'job','contact'],
                navigation: true,
                navigationPosition: 'right',
                navigationTooltips: ['我是谁', '专业技能','项目经验','工作经历','联系我'],
                showActiveTooltip: true,
                slidesNavigation: true,
                slidesNavPosition: 'bottom',
                lazyLoading: true,
                onLeave:function(index,nextindex,direction){
                    $(this).find(".lsiten_component").trigger("onLeave");
                },
                afterLoad:function(anchorLink,index){                 
                    $(this).find(".lsiten_component").trigger("onLoad");                    
                }
            });
        this.el.show();
    }

}