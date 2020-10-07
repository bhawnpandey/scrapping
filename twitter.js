const puppeteer = require('puppeteer');
const base_url = "https://twitter.com/";
const login_url = "https://twitter.com/login";
let browser = null;
let page = null;

const twitter = {
     initialize: async()=> {
       console.log("hiii");
       browser = await puppeteer.launch({headless: false});
       page = await browser.newPage();
       await page.goto(base_url);
     },

     login: async(username, password) =>{
       await page.goto(login_url);
       await page.waitForSelector('input[name="session[username_or_email]"]');
       await page.type('input[name="session[username_or_email]"]', username);
       await page.type('input[name="session[password]"]', password);
       await page.click('#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div > div:nth-child(8) > div');
     },

     end: async() =>{
        await browser.close();
     }

};

module.exports = twitter;
