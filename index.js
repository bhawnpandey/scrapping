let twitter = require('./twitter.js');
(async ()=>{

   const username = "xxxxxxxxxxxxx";
   const password = "xxxxxxxxxxxxx";

   await twitter.initialize();
   await twitter.login(username, password);
   await twitter.postTweet("Hello everyone, this message for testing");
   await twitter.end();


})();
