import RenderHandlebars from '../../utils/handlebars/handlebars';
import * as $ from 'jquery';
import YammerAPI from '../../utils/microsoft/yammer';
export default class Groups{
    constructor(){
        
        if($('#groups-sidebar-template').length){
            let yammer = new YammerAPI();
            
            yammer.getGroups(5,true).then((res)=>{
                console.log("groups", res);
                
                RenderHandlebars('#groups-sidebar-template',{groups:res})
                
            })
        }
        if($('#popular-groups-sidebar-template').length){
            let yammer = new YammerAPI();
            
            yammer.getGroups(6).then((res)=>{
                console.log("groups", res);
                
                RenderHandlebars('#popular-groups-sidebar-template',{groups:res})
                
            })
        }
        if($('#my-groups-list-template').length){
            let yammer = new YammerAPI();
            
            yammer.getGroups(null,true).then((res)=>{
                console.log("groups", res);
                
                RenderHandlebars('#my-groups-list-template',{groups:res})
                $('[my-groups-counter]').text(res.length);
            })
        }
        if($('#all-groups-list-template').length){
            let yammer = new YammerAPI();
            
            yammer.getGroups().then((res)=>{
                console.log("groups", res);
                
                RenderHandlebars('#all-groups-list-template',{groups:res})
                $('[all-groups-counter]').text(res.length);
            });
            $('body').on('click','a.join',(e)=>{
                let id = $(e.target).attr('id') ;
                $(e.target).prev().show();
                $(e.target).hide();
                yammer.joinGroup(id).then((res)=>{
                    $(e.target).prev().hide();
                    $(e.target).next().show();
                    
                })
    
                
            })
        }
        
    }
} 