const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones';

rp(url)
  .then(function(html){
    //success!
    const $ = cheerio.load(html);
    const scrapedData = [];
    $("table").eq(0).find('tbody > tr').each(function(index, element){

        // empty row first
        if (index == 0) {return true;}

        const tds = $(element).find('td');
        // const countryCode = $(tds[0]).text();
        const tz = $(tds[1]).text().trim();
        const offset = $(tds[4]).text().trim();

        const tableRow = { tz, offset };
        scrapedData.push(tableRow);
    });

    console.log(JSON.stringify(scrapedData));


  })
  .catch(function(err){
    //handle error
    console.error(err)
  });