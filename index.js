const puppeteer = require('puppeteer');
(async ()=>{
   const base_url = "https://twitter.com/";
   const login_url = "https://twitter.com/login";
   const username = "xxxxxxxxx";
   const password = "xxxxxxxxxx";
   const browser = await puppeteer.launch({headless: false});
   const page = await browser.newPage();
   await page.goto(login_url);
   await page.waitForSelector('input[name="session[username_or_email]"]');
   await page.type('input[name="session[username_or_email]"]', username);
   await page.type('input[name="session[password]"]', password);
   await page.click('#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div.css-1dbjc4n.r-13qz1uu > form > div > div:nth-child(8) > div');
  await browser.close();
})();
