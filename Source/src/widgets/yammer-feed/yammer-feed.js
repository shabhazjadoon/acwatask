import RenderHandlebars from '../../utils/handlebars/handlebars';
import * as moment from 'moment/min/moment.min';

import * as $ from 'jquery';
import YammerAPI from '../../utils/microsoft/yammer'; 
// import MultiClamp from 'multi-clamp';


export default class MyFeed{
    constructor(){
        let yammer = new YammerAPI();
        yammer.getCurrentUser().then((user)=>{
            
            if($('#following-feed-template').length){
                yammer.getFollowingFeed().then((res) => {
                    this.addLikerText(res.comments);
                    console.log(res.comments); 
                    setTimeout(()=>{
                        RenderHandlebars('#following-feed-template', {feed: res,user:user});
                        $('[current-user-image]').attr('src',user.mugshot_url)

                    }); 
                }); 
                
            }
            if($('#discovery-feed-template').length){
                yammer.getDiscoveryFeed().then((res) => {
                    this.addLikerText(res.comments);
                    console.log(res.comments); 
                    setTimeout(()=>{
                        RenderHandlebars('#discovery-feed-template', {feed: res,user:user});
                        $('[current-user-image]').attr('src',user.mugshot_url)
                        
                    }); 
                }); 
                
            }
        })

        // DOM Manipulation
        $('body').on('click','.feed-item-container .reply',(e)=>{
            var textarea = $(e.target).closest('.feed-item-container').find('.comment-reply-item textarea');
            $('html,body').animate({
              scrollTop: textarea.offset().top - 200
            }, 500);
            textarea.focus();
        });

        //Post Reply
        $('body').on('click','.feed-item-container .postReply',(e)=>{
            var btn = $(e.target);
            var loader = $(e.target).find('[uk-spinner]');
            loader.show();
            var textarea = $(e.target).closest('.comment-replies-list').find('textarea');
            yammer.postCommentOnOGObject({body:textarea.val(),replied_to_id:btn.attr('id')},true).then((res)=>{
             
                  
                  textarea.val("");
                  console.log('container ', textarea.closest('.yammer-replies-list').prev());
                  
                  textarea.closest('.yammer-replies-list').prev().append(`
                  <li class="feed-item-comment">
                    <div class="comment-author uk-flex uk-flex-middle uk-margin-bottom">
                        <img src="${res[0].image}" alt="comment author profile">
                        <div class="author-info uk-margin-left">
                            <h5 class="comment-author-name uk-margin-remove">
                                <!-- Robin Hood -->
                                ${res[0].user_name}
                            </h5>
                            <span class="comment-date-time">
                                <!-- November 12, 2019 at 10:43 PM -->
                                ${res[0].created_at}
                            </span>
                        </div>
                    </div>
                    <div class="comment-body uk-margin-bottom">
                        <p class="comment-content uk-margin-remove">
                            <!-- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text... -->
                            ${res[0].body.rich}
                        </p>
                    </div>
                    <div class="comment-actions uk-flex uk-flex-middle uk-margin-bottom">
                        <a href="javascript:void(0);" class="comment-action comment-action-like">Like</a>
                        <a href="javascript:void(0);" class="comment-action comment-action-comment uk-margin-left">Comment</a>
                        <span class="comment-action comment-period-time uk-margin-left">2 days ago</span>
                    </div>
                </li>
                `);
                loader.hide();
      
            })
        
        })
        //like/unlike
        $('body').on('click','[like-id]',(e)=>{
            let btn = $(e.target);
            let id = btn.attr('like-id');
            // let count = btn.text().substring(btn.text().indexOf("(")+1,btn.text().indexOf(")"))
            btn.next().show();
            yammer.likeMessage(id,"unlike").then((res)=>{
                
                btn.toggleClass("active");
                btn.next().hide();
                
            },(err)=>{
                if(err.status == 200){
                    btn.toggleClass("active");
                    btn.next().hide();
    
                }
            })
        })
        //Read More
        $('body').on('click','[yammer-read-more]',(e)=>{
            $(e.target).prev().toggle();
            if($(e.target).text() == '... Read More'){
                $(e.target).text('... Read Less')
            }else{
                $(e.target).text('... Read More')
            }
        })
        //post feed
        $('body').on('keyup','[post-feed]',(e)=>{
            let value = $(e.target).val();
            if(e.keyCode == 13 && value.length >0){
                yammer.postFeed(value).then((res)=>{
                    console.log(res);
                    
                    $(e.target).val('');
                    let template = `
                    <li class="feed-item-container">
                        <div class="feed-item-head">
                            <span uk-icon="icon: users" class="uk-icon"></span>
                            <span class="feed-item-categ">General</span>
                        </div>
                        <div class="feed-item-author uk-flex uk-flex-middle uk-margin uk-remove-margin-horizontal">
                            <img src="${res.mugshot_url}" alt="item author profile" class>
                            <div class="author-info uk-margin-left">
                                <h5 class="item-author-name uk-margin-remove">
                                    <!-- Robin Hood -->
                                    ${res.full_name}
                                </h5>
                                <span class="item-date-time">
                                    <!-- November 12, 2019 at 10:43 PM -->
                                    ${moment(res.messages[0].created_at).format("MMM D, h:mm A")}
                                </span>
                            </div>
                        </div>
                        <div class="feed-item-body uk-margin-bottom">
                            <p class="uk-margin-remove" clamp-text>
                                <!-- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. -->
                                ${res.messages[0].body.rich}
                            </p>
                            
                        </div>
                        
                        <div class="feed-item-stats uk-margin-bottom">
                            No Likes
                        </div>
                        <div class="feed-item-actions uk-flex uk-flex-middle">
                            <a href="javascript:void(0);" class="feed-item-action-like" like-id="${res.messages[0].id}">Like</a>
                            <div uk-spinner style="display: none;"></div> 
                            <a href="javascript:void(0);" class="feed-item-action-comment uk-margin-left reply">Comment</a>
                        </div>
                        <ul class="feed-item-comments-list">
                            <!-- Each reply start -->
                            
                        </ul>
                        <ul class="comment-replies-list yammer-replies-list">
                            <li >
                                <div class="comment-reply-item uk-flex uk-flex-middle">
                                    <img src="${res.mugshot_url}" current-user-image alt="comment reply profile">
                                    <textarea placeholder="Write a reply"></textarea>
                                </div>
                                <div class="uk-width-extend uk-grid-margin uk-first-column">
                                    <button class="uk-button btn-brand postReply" id="${res.messages[0].id}"><div uk-spinner style="display: none;"></div> Post</button>
                                </div>
                            </li>
                            
                        </ul>
                        <!-- Each reply end -->
                        
                    </li>
                    `;
                    $('.yammer-following-container, .yammer-discover-container').prepend(template)
                })
                
            }
        })
    }


    addLikerText(feed){
        console.log('FEED FROM THE FUCNTION', feed);
        for(let i=0; i<feed.length; i++){
            let _curr = feed[i].liked_by;
            let likers_info = ''; 
            if(_curr.count === 0){
                likers_info = 'No Likes'; 
            }else if(_curr.count === 1){
                likers_info = `${_curr.names[0].full_name} liked this post`; 
            }else if(_curr.count === 2){
                likers_info = `${_curr.names[0].full_name} and ${_curr.names[1].full_name} liked this post`; 
            }else if(_curr.count > 2){
                likers_info = `${_curr.names[0].full_name} and ${_curr.count - 1} others liked this post`;
            }
            feed[i].likers_info = likers_info; 
        }
    }


}
