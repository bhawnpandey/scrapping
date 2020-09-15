const unirest = require('unirest');
const cheerio = require('cheerio');

(async()=>{
   let username = "willsmith";
   let base_url = `https://www.instagram.com/${username}`;
   let response = await unirest.get(base_url);
   const $ = cheerio.load(response.body);
   let script = $('script[type="text/javascript"]').eq(3).html();
   let script_exp = /window._sharedData = (.+);/g.exec(script);
   let { entry_data: {ProfilePage: {[0]: {graphql: {user} }} } } = JSON.parse(script_exp[1]);
   //console.log("user", user);

   let intagram_data = {
     followers: user.edge_followed_by.count,
     following: user.edge_follow.count,
     uploads: user.edge_owner_to_timeline_media.count,
     profile_name: user.full_name,
     profile_pic_url: user.profile_pic_url_hd
   }


     let { entry_data: {ProfilePage: {[0]: {graphql: { user: {edge_owner_to_timeline_media: { edges } } } }} } } = JSON.parse(script_exp[1]);
     let posts = [];
     for(let edge of edges){
       let { node } = edge;
       console.log("node ", node);
       posts.push({
         id: node.id,
         shortcode: node.shortcode,
         timestamp: node.taken_at_timestamp,
         likes: node.edge_liked_by.count,
         comments: node.edge_media_to_comment.count,
         video_views: node.video_view_count,
         caption: node.edge_media_to_caption.edges[0].node.text,
         image_url: node.display_url
       });
     }

     console.log("posts", posts);

})();
