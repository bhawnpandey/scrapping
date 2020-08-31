const unirest = require('unirest');
const cheerio = require('cheerio');

const url = "https://www.imdb.com/title/tt7286456/?ref_=hm_fanfav_tt_2_pd_fp1";

unirest.get(url).then((response)=>{

    const $ = cheerio.load(response.body);
    let title = $('div[class="title_wrapper"] > h1').text();
    let rating = $('span[itemprop="ratingValue"]').text();
    console.log(title, rating);

}).catch((error)=> {
   console.log("error", error);
});
