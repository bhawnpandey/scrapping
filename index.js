const unirest = require('unirest');
const cheerio = require('cheerio');

const url = "https://www.imdb.com/title/tt7286456/?ref_=hm_fanfav_tt_2_pd_fp1";

unirest.get(url).then((data)=>{
   const $ = cheerio.load(data);
   let title = $('div[class="title_wrapper"]').html();
   console.log("title", title);
}).catch((error)=> {
   console.log("error", error);
});
