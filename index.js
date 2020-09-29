const puppeteer = require('puppeteer');
const galaxy = puppeteer.devices['Galaxy Note 3'];
(async () => {
  /*Simple example of puppeteer */

  // const browser = await puppeteer.launch({
  //   headless: false
  // });
  // const page = await browser.newPage();
  // await page.goto('https://www.google.com/');
  // await page.type('.gLFyf', 'Data structure', {delay: 100});
  // await page.screenshot({path: 'example.png'});
  //
  // await browser.close();

  /* Example Generating pdf */
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto('https://www.udemy.com/');
    // await page.pdf({
    //   path: './page.pdf',
    //   format: 'A4'
    // });
    // await browser.close();

    /*Get the url or title of the page */
    // const browser = await puppeteer.launch({ headless: false});
    // const page = await browser.newPage();
    // await page.goto('https://www.udemy.com/');
    // let title = await page.title();
    // console.log("the title of the page", title);
    // let url = await page.url();
    // console.log("the url of the page", url);
    // await browser.close();

    /*Emulate a phone view*/
   // const browser = await puppeteer.launch({headless: false});
   // const page = await browser.newPage();
   // await page.emulate(galaxy);
   // await page.goto('https://www.udemy.com/');
   // await browser.close();

   /*setRequestInterception of page*/
   const browser = await puppeteer.launch({headless: false});
   const page = await browser.newPage();
   await page.setRequestInterception(true);
   page.on('request', interceptedRequest => {
     if(["image","stylesheet","font"].includes(interceptedRequest.resourceType())){
       interceptedRequest.abort();
     }else{
       interceptedRequest.continue();
     }
   });
   await page.goto('https://www.amazon.in/');
   await browser.close();
})();
