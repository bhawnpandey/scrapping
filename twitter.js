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

     postTweet: async(message)=> {
        let url = await page.url();
        if(url != base_url){
          await page.goto(base_url);
        }
        await page.waitForSelector('div[data-testid="tweetTextarea_0"]');
        await page.click('div[data-testid="tweetTextarea_0"]');
        await page.waitForTimeout(500);
        await page.keyboard.type(message, {delay: 50});
        await page.click("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-1tlfku8.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div.css-1dbjc4n.r-14lw9ot.r-184en5c > div > div.css-1dbjc4n.r-14lw9ot.r-atwnbb > div:nth-child(1) > div > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-glunga.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div:nth-child(4) > div > div > div:nth-child(2) > div.css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-1w2pmg.r-1n0xq6e.r-1vuscfd.r-1dhvaqw.r-1ny4l3l.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr > div");
     },

     end: async() =>{
        await browser.close();
     }

};

module.exports = twitter;
