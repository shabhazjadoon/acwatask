import * as moment from 'moment/min/moment.min';
var yam = window.yam;
export default function YammerAPI() {
  var user_id;
  function _handleComments(data, yammerResponse) {
    let comments = data.messages;
    let replies = data.threaded_extended;
    let count = 0;
    let users = data.references.filter((item) => {
      return (item.type == 'user');
    })
    let groups = data.references.filter((item) => {
      return (item.type == 'group');
    })

    //linking references
    for (let comment in replies) {
      replies[comment].sort(function (a, b) {
        var c = new Date(a.created_at);
        var d = new Date(b.created_at);
        return c - d;
      });
      for (let i = 0; i < replies[comment].length; i++) {
        replies[comment][i].created_at = moment(replies[comment][i].created_at).format("MMM D, h:mm A")
        count++;
        for (let j = 0; j < users.length; j++) {
          if (users[j].id == replies[comment][i].sender_id) {
            replies[comment][i].user_name = users[j].full_name;
            replies[comment][i].image = users[j].mugshot_url;
            replies[comment][i].email = users[j].email;
            replies[comment][i].job_title = users[j].job_title;
            if (replies[comment][i].sender_id == user_id) {
              replies[comment][i].editable = true;
            }
          }

        }
      }
    }
    for (let i = 0; i < comments.length; i++) {
      count++;
      comments[i].created_at = moment(comments[i].created_at).format("MMM D, h:mm A")
      if (comments[i].sender_id == user_id) {
        comments[i].editable = true;
      }
      comments[i].group_name = "General"
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].id === comments[i].group_id) {
          comments[i].group_name = groups[i].full_name;
        }

      }
      //add load more functionality
      if (comments[i].body.rich.length > 140) {
        comments[i].body.original = comments[i].body.rich.substr(140, comments[i].body.rich.length - 140);
        comments[i].body.rich = comments[i].body.rich.substr(0, 140);
      }

      comments[i].replies = replies[comments[i].id]
      //If the current user apper in the liked_by list mark it liked.
      comments[i].liked_by_current_user = comments[i].liked_by.names.map((user) => {
        return user.user_id == user_id;
      }).length
      for (let j = 0; j < users.length; j++) {
        if (users[j].id == comments[i].sender_id) {
          comments[i].user_name = users[j].full_name;
          comments[i].image = users[j].mugshot_url;
          comments[i].email = users[j].email;
          comments[i].job_title = users[j].job_title;

        }

      }

    }

    // comments.sort(function(a,b){
    //   var c = new Date(a.created_at);
    //   var d = new Date(b.created_at);
    //   return c-d;
    // });






    // for (let i = 0; i < handled_comments.length; i++) {
    //   for(var j=0; j<handled_comments[i].replies.length;j+=5){
    //     console.log(handled_comments[i].replies.slice(j,j+5));
    //   }
    // }
    return { comments: comments, count: count };
  }
  function _handleReply(data, yammerResponse) {
    let comments = data.messages;

    let users = data.references.filter((item) => {
      return (item.type == 'user');
    })
    comments.sort(function (a, b) {
      var c = new Date(a.created_at);
      var d = new Date(b.created_at);
      return c - d;
    });
    //linking references
    for (let i = 0; i < comments.length; i++) {

      comments[i].created_at = moment(comments[i].created_at).format("MMM D, h:mm A")
      //If the owner of the comment is the current user make it editable.
      if (comments[i].sender_id == user_id) {
        comments[i].editable = true;
      }
      //If the current user apper in the liked_by list mark it liked.
      comments[i].liked_by_current_user = comments[i].liked_by.names.map((user) => {
        return user.user_id == user_id;
      }).length
      for (let j = 0; j < users.length; j++) {
        if (users[j].id == comments[i].sender_id) {
          comments[i].user_name = users[j].full_name;
          comments[i].image = users[j].mugshot_url;
          comments[i].email = users[j].email;
          comments[i].job_title = users[j].job_title;

        }

      }
      if (!comments[i].replied_to_id) {
        comments.splice(i, 1);
      }
    }
    console.log("comments before return", comments);

    return comments;
  }
  function _handleNotifications(data) {
    let refs = data.references;
    let notfs = data.notifications;
    let usersObj = {};
    let groupsObj = {};
    for (let i = 0; i < refs.length; i++) {
      if (refs[i].type == "user") {
        usersObj[refs[i].id] = refs[i];
      } else if (refs[i].type == "group") {
        groupsObj[refs[i].id] = refs[i];

      }

    }
    for (let i = 0; i < notfs.length; i++) {
      let msg = notfs[i].message;
      if (notfs[i].message.indexOf('[[user') > -1) {
        let toReplace = msg.slice(msg.indexOf("[[user"), msg.indexOf("]]") + 2);
        let id = toReplace.slice(toReplace.indexOf(":") + 1, toReplace.indexOf("]]"))

        msg = msg.replace(toReplace, usersObj[id].full_name)

      }
      if (notfs[i].message.indexOf('[[group') > -1) {
        let toReplace = msg.slice(msg.indexOf("[[group"), msg.indexOf("]]") + 2);
        let id = toReplace.slice(toReplace.indexOf(":") + 1, toReplace.indexOf("]]"))
        msg = msg.replace(toReplace, groupsObj[id].full_name)


      }
      notfs[i].message = msg;


    }
    return notfs;
  }
  function _auth() {
    if (localStorage.getItem('yammerResponse')) {
      yam.platform.setAuthToken(JSON.parse(localStorage.getItem('yammerResponse')).access_token.token);
      user_id = JSON.parse(localStorage.getItem('yammerResponse')).access_token.user_id;
    }
    return new Promise((resolve, reject) => {
      yam.getLoginStatus(
        function (response) {

          if (response.authResponse) {
            resolve(response)
          } else {
            var that = this;
            yam.platform.login(function (response) { //prompt user to login and authorize your app, as necessary
              if (response.authResponse) {
                setTimeout(() => {
                  localStorage.setItem('yammerResponse', JSON.stringify(response));
                  user_id = response.access_token.user_id
                  resolve(response)
                }, 0)
              }
            });
          }
        });
    })
  }
  return {
    auth: _auth,
    getPublicMessages: function () {

      return new Promise((resolve, reject) => {
        _auth().then((response) => {

          yam.platform.request({
            url: "messages.json?threaded=extended",     //this is one of many REST endpoints that are available
            method: "GET",
            success: function (res) { //print message response information to the console
              var result = _handleComments(res, response);;
              if (result.comments.length > 2) {
                result.comments.splice(2);
              }
              if (result.comments[0].replies &&
                result.comments[0].replies.length == 2 &&
                result.comments[1].replies) {
                result.comments[1].replies = []
              }
              if (result.comments[0].replies &&
                result.comments[0].replies.length == 1 &&
                result.comments[1].replies &&
                result.comments[1].replies.length == 2) {
                result.comments[1].replies.splice(1);
              }
              let length = 48;
              for (let i = 0; i < result.comments.length; i++) {

                if (result.comments[i].body.parsed.length > length) {
                  result.comments[i].body.parsed = result.comments[i].body.parsed.substr(0, length) + '...'
                }
                if (result.comments[i].replies) {
                  for (let j = 0; j < result.comments[i].replies.length; j++) {
                    if (result.comments[i].replies[j].body.parsed.length > length) {
                      result.comments[i].replies[j].body.parsed = result.comments[i].replies[j].body.parsed.substr(0, length) + '...'
                    }

                  }
                }
              }
              resolve(result.comments)
            },
            error: function (error) {
              reject(error)

            }
          });

        });
      })
    },
    getGroups: function (limit, isMine) {

      return new Promise((resolve, reject) => {
        _auth().then((response) => {
          if (isMine) {
            var url = "groups.json?mine=1";
          } else {
            var url = "groups.json";

          }
          yam.platform.request({
            url: url,     //this is one of many REST endpoints that are available
            method: "GET",
            success: function (res) { //print message response information to the console
              if (limit) {
                res.splice(limit)
              }
              resolve(res)
            },
            error: function (error) {
              reject(error)

            }
          });

        });
      })
    },
    postOGObject: function (url) {

      return new Promise((resolve, reject) => {
        _auth().then((res) => {
          yam.platform.request({
            url: "open_graph_objects",
            method: "POST",
            data: { url: url },
            success: function (res) {
              //360452639424512
              resolve(res.id)
            },
            error: function (error) {
              reject(error)
            }
          });

        })
      })
    },
    getCommentsOnOGObject: function (id) {

      return new Promise((resolve, reject) => {
        _auth().then((response) => {
          yam.platform.request({
            url: "messages/open_graph_objects/" + id + ".json?threaded=extended",
            method: "GET",
            success: function (res) {
              var result = _handleComments(res, response);

              resolve(result)
            },
            error: function (error) {
              reject(error)
            }
          });

        })
      })
    },
    postCommentOnOGObject: function (comment, is_reply) {

      return new Promise((resolve, reject) => {
        _auth().then((response) => {

          yam.platform.request({
            url: "messages.json",
            method: "POST",
            data: comment,
            success: function (res) {
              if (!is_reply) {
                resolve(_handleComments(res, response).comments);
              } else {
                resolve(_handleReply(res, response));
              }
            },
            error: function (error) {
              reject(error)
            }
          });

        })
      })
    },
    deleteCommentOnOGObject: function (id) {

      return new Promise((resolve, reject) => {
        _auth().then((response) => {


          yam.platform.request({
            url: "messages/" + id,
            method: "DELETE",
            success: function (res) {
              resolve(res)
            },
            error: function (error) {
              reject(error)
            }
          });


        })
      })
    },
    getImageUrlByEmail: function (email) {

      return new Promise((resolve, reject) => {
        _auth().then((response) => {


          yam.platform.request({
            url: "users/by_email.json?email=" + email,
            method: "GET",
            success: function (res) {
              resolve(res[0].mugshot_url.split("48/")[1])
            },
            error: function (error) {
              resolve("no_photo.png")
            }
          });


        })
      })
    },
    getMoreReplies: function (id, older_than) {

      return new Promise((resolve, reject) => {
        _auth().then((response) => {


          yam.platform.request({
            url: "messages/in_thread/" + id + ".json?older_than=" + older_than,
            method: "GET",
            success: function (res) {
              resolve(_handleReply(res, response))
            },
            error: function (error) {
              resolve(error)
            }
          });


        })
      })
    },
    //like/unlike
    likeMessage: function (msg_id, action) {

      return new Promise((resolve, reject) => {
        _auth().then((response) => {


          yam.platform.request({
            url: "messages/liked_by/current.json?message_id=" + msg_id,
            method: action == "like" ? "POST" : "DELETE",
            success: function (res) {
              resolve(res)
            },
            error: function (error) {
              resolve(error)
            }
          });


        })
      })
    },
    //get people
    getPeople: function (limit) {
      return new Promise((resolve, reject) => {
        _auth().then((response) => {
          yam.platform.request({
            url: "users.json",
            method: "GET",
            success: function (users) {
              for (let i = 0; i < users.length; i++) {
                users[i].mugshot_url = users[i].mugshot_url.replace("48x48", "100x100");

              }
              if (limit) {
                users.splice(limit)
              }
              resolve(users)
            },
            error: function (error) {
              resolve(error)
            }
          });
        })
      })
    },
    //get subscription status
    getSubscriptionStatus: function (id) {
      return new Promise((resolve, reject) => {
        _auth().then((response) => {

          yam.platform.request({
            url: "subscriptions/to_user/" + id + ".json",
            method: "GET",
            success: function (status) {

              resolve(status)
            },
            error: function (error) {

              reject(error)
            }
          });
        })
      })
    },
    //subscription to user by user id
    subscribe: function (id, type) {
      return new Promise((resolve, reject) => {
        _auth().then((response) => {

          yam.platform.request({
            url: "subscriptions",
            data: { target_id: id, target_type: type },
            method: "POST",
            success: function (status) {

              resolve(status)
            },
            error: function (error) {

              reject(error)
            }
          });
        })
      })
    },
    //subscription to user by user id
    getNotifications: function () {
      return new Promise((resolve, reject) => {
        _auth().then((response) => {
          yam.platform.request({
            url: "notifications.json",
            method: "GET",
            success: function (notifications) {
              var results = _handleNotifications(notifications);
              resolve(results)
            },
            error: function (error) {
              reject(error)
            }
          });
        })
      })
    },
    //subscription to group by group id
    joinGroup: function (id) {
      return new Promise((resolve, reject) => {
        _auth().then((response) => {

          yam.platform.request({
            url: "group_memberships.json",
            method: "POST",
            data: { group_id: id },
            success: function (res) {
              resolve(res)

            },
            error: function (error) {

              reject(error)
            }
          });
        })
      })
    },

    getDiscoveryFeed: function () {
      return new Promise((resolve, reject) => {
        _auth().then((response) => {
          yam.platform.request({
            url: 'messages/my_feed.json?threaded=extended&limit=5',
            method: "GET",
            success: function (feed) {
              resolve(_handleComments(feed));
            },
            error: function (error) {
              reject(error);
            }
          });
        })
      });
    },
    getFollowingFeed: function () {
      return new Promise((resolve, reject) => {
        _auth().then((response) => {
          yam.platform.request({
            url: 'messages/following.json?threaded=extended&limit=5',
            method: "GET",
            success: function (feed) {
              resolve(_handleComments(feed));
            },
            error: function (error) {
              reject(error);
            }
          });
        })
      });
    },
    getCurrentUser: function () {
      return new Promise((resolve, reject) => {
        _auth().then((response) => {
          yam.platform.request({
            url: 'users/current.json',
            method: "GET",
            success: function (user) {
              resolve(user);
            },
            error: function (error) {
              reject(error);
            }
          });
        })
      });
    },
    postFeed: function (val) {
      return new Promise((resolve, reject) => {
        _auth().then((response) => {
          yam.platform.request({
            url: 'users/current.json',
            method: "GET",
            success: function (user) {
              yam.platform.request({
                url: 'messages.json',
                method: 'POST',
                data: {body: val, network_id: user.network_id},
                success: function (res) {
                  resolve(Object.assign({},user,res));

                },
                error: function (err) {
                  reject(err);
                }
              });
            },
            error: function (error) {
              reject(error);
            }
          });
        })
      });
    },
    search: function(q){
      return new Promise((resolve,reject)=>{
        _auth().then((response)=>{
          yam.platform.request({
            url:'search.json?threaded=extended',
            data:{search:q}
          }).then((response)=>{
            if(response.messages){
              response.comments =  _handleComments(response.messages);
            }
            resolve(response);
          },(error)=>{
            reject(reject);
          })
        })
      })
    }
  }
}
