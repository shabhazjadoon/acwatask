import RenderHandlebars from '../../utils/handlebars/handlebars';
import * as $ from 'jquery';
import YammerAPI from '../../utils/microsoft/yammer';
var yammer = new YammerAPI();
export default class PeopleList{
    constructor(){
        if($('#people-list-template').length){
            yammer.getPeople().then((users)=>{
                console.log("users ", users);
                RenderHandlebars('#people-list-template',{
                    users:users
                })
                
                    
            })
        }
        if($('#people-widget-template').length){
                yammer.getPeople(5).then((people)=>{
                RenderHandlebars('#people-widget-template',{
                    people:people
                })
                
                    
            })
        }
        $('body').on('click','a.followUser',(e)=>{
            let id = $(e.target).attr('id') ;
            $(e.target).prev().show();
            $(e.target).hide();
            console.log(id);
            yammer.getSubscriptionStatus(id).then((res)=>{
                    $(e.target).prev().hide();
                    $(e.target).next().next().show();
            },()=>{
                yammer.subscribe(id,'user').then((res)=>{
                    $(e.target).prev().hide();
                    $(e.target).next().show();
                    
                    console.log("res", res);
                })
            })

            
        })
    }
} 