const unirest = require('unirest');
const cheerio = require('cheerio');
const fs = require('fs');
const { Parser } = require('json2csv');
const fetch = require('node-fetch');


const urls = [{
              url: "https://www.imdb.com/title/tt7286456/?ref_=hm_fanfav_tt_2_pd_fp1",
              id: "joker"
            },{
              url: "https://www.imdb.com/title/tt4154796/?ref_=ttls_li_tt",
              id: "avengers_end_game"
           }];


(async() => {
  let moviesData = [];
  for(let url of urls){
  let response  = await unirest.get(url.url)
                .headers({
                  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                  'accept-encoding':'gzip, deflate, br',
                  'accept-language':'en-US,en;q=0.9',
                  'cache-control':'max-age=0',
                  'sec-fetch-dest': 'document',
                  'sec-fetch-mode': 'navigate',
                  'sec-fetch-site': 'same-origin',
                  'sec-fetch-user': '?1',
                  'upgrade-insecure-requests': 1,
                  'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
                });

            const $ = cheerio.load(response.body);
            let title = $('div[class="title_wrapper"] > h1').text().trim();
            let rating = $('span[itemprop="ratingValue"]').text();
            let image = $('div[class="poster"] > a > img').attr('src');
            let ratingCount = $('div[class="imdbRating"] > a > span').text();
            let releaseDate = $('a[title="See more release dates"]').text().trim();
            //selector by Chrome
            let popularity = $('#title-overview-widget > div.plot_summary_wrapper.localized > div.titleReviewBar > div:nth-child(5) > div.titleReviewBarSubItem > div:nth-child(2) > span').text().trim();
            console.log("popularity", popularity);
            let genres =[];
            $('div[class="title_wrapper"] a[href^="/search/title?genres"]').each((i, ele)=>{
              let data = $(ele).text();
               genres.push(data);
            });
            moviesData.push({title, rating, image, ratingCount, releaseDate, genres});
           let data = await new Promise(async(resolve, reject)=>{
              try{
                const res = await fetch(image);
                const buffer = await res.buffer();
                fs.writeFile(`./${url.id}.jpg`, buffer, () =>
                 resolve('finished downloading!'));
              }catch(err){
                reject(err);
              }
           });
           console.log("image data", data);

     }
    console.log("data", moviesData);
    // const json2csvParser = new Parser();
    // const csv = json2csvParser.parse(moviesData);
    //
    // fs.writeFileSync('./data.csv', csv, 'utf-8');

})();
