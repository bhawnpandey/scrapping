const puppeteer = require('puppeteer');
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
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.udemy.com/');
    let title = await page.title();
    console.log("the title of the page", title);
    let url = await page.url();
    console.log("the url of the page", url);
    await browser.close();
})();
