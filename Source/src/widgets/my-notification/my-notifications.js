import RenderHandlebars from '../../utils/handlebars/handlebars';
import * as $ from 'jquery';
import YammerAPI from '../../utils/microsoft/yammer';
export default class MyNotifications{
    constructor(){
        if($('#my-notifications-template').length){
            let yammer = new YammerAPI();
            console.log(yammer.getNotifications());
            yammer.getNotifications().then((res)=>{
                setTimeout(()=>{
                    console.log('Notification: ', res); 
                    RenderHandlebars('#my-notifications-template',{notifications:res})
                })
            })
        }
    }
} 