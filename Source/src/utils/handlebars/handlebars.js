import Handlebars from 'handlebars/dist/handlebars';
import * as $ from 'jquery';

export default function RenderHandlebars(tmp,ctx){
    if($(tmp).length){
        
        var template = $(tmp).html();
        //Compile the template data into a function
        var templateScript = Handlebars.compile(template);
        
        var html = templateScript(ctx);

         $(html).insertBefore(tmp);
    }
} 