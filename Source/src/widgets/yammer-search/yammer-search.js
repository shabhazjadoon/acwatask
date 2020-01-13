import RenderHandlebars from '../../utils/handlebars/handlebars';
import * as moment from 'moment/min/moment.min';

import * as $ from 'jquery';
import YammerAPI from '../../utils/microsoft/yammer';
import MyFeed from '../yammer-feed/yammer-feed';

// import MultiClamp from 'multi-clamp';

let feed = new MyFeed();
var user = {};
export default class SearchResults {
    constructor() {
        let yammer = new YammerAPI();
        yammer.getCurrentUser().then((user) => {
            user = user;
            console.log('user is ready ', user);
            
        });
        $('[yeammer-search-input]').on('keyup', (e) => {
            
            if (e.keyCode === 13 && $(e.target).val()) {
                this.doSearch($(e.target).val());
            }
            
        })
        var urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has('q')){
            this.doSearch(urlParams.get('q'))
        }
        
    }
    doSearch(query) {
        let yammer = new YammerAPI();
        $('.loader-container').show();
        yammer.search(query).then((res) => {
            console.log(res);
            if (res.comments) {
                feed.addLikerText(res.comments);
                
                setTimeout(() => {
                    console.log('user image', user);
                    $('.widget-yammer-search .yammer-messages-container > ul').html('');
                    RenderHandlebars('.widget-yammer-search #search-messages-template', { feed: res.comments, user: user });
                    $('.widget-yammer-search .yammer-users-container > section').html('');
                    RenderHandlebars('.widget-yammer-search #search-people-list-template', { users: res.users, user: user });
                    $('.widget-yammer-search .yammer-groups-container > div').html('');
                    RenderHandlebars('.widget-yammer-search #search-groups-list-template', { groups: res.groups, user: user });
                    // $('[current-user-image]').attr('src',user.mugshot_url)
                    
                    $('.loader-container').hide();
                });

            }
        });

    }
}