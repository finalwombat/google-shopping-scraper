const puppeteer = require("puppeteer");
const filterResults = require("./filterResults");
const getNextUrl = require('./pages').getNextUrl

const scrape = async options => {

	async function recursiveScrape(url, callback){
        console.log('scrape')
        const page = await browser.newPage()
        await page.goto(url)
        const nextUrl = await getNextUrl(page)
        console.log('nextUrl' + nextUrl)
        const results = nextUrl ? await recursiveScrape(nextUrl, callback) : []
        const result = await page.$$eval('div.sh-dlr__list-result', callback)
        results.push(result)
        return results
    }
  const browser = await puppeteer.launch({ headless: true });
  // const page = await browser.newPage();

  const url = `https://www.google.com.au/search?q=${options.query}&&tbm=shop`;

  // await page.goto(url);

	// // gets list of results as Array and passes it to filterResults()
	// const results = await page.$$eval('div.sh-dlr__list-result', filterResults)

  recursiveScrape(url, filterResults).then(results => {
    const set = new Set
    console.log(results)
    results.map(result => {
      result.map(product => {
        console.log(product)
      })
    })
    console.log(set)
  })
  
	

	
	// return results
};
exports.scrape = scrape;