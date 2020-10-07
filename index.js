let twitter = require('./twitter.js');
(async ()=>{

   const username = "xxxxxxxxxxxxxx";
   const password = "xxxxxxxxxxxxxx";

   await twitter.initialize();
   await twitter.login(username, password);
   await twitter.end();


})();
