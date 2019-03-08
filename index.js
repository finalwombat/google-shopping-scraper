
import puppeteer from "puppeteer"
import filterResults from "./filterResults"

const scrape = async options => {

	async function recursiveScrape(page, callback){
        console.log('scrape')
        // return empty if no more pages
        try {
          await page.waitForSelector('tbody > tr > .navend > #pnnext > span:nth-child(2)')
        } catch(e) {
          return []
        }
        // scrape the page
        const result = await page.$$eval('div.sh-dlr__list-result', callback)
        // navigate to the next page
        await page.click('tbody > tr > .navend > #pnnext > span:nth-child(2)')
        // recursive call fro results
        const results = await recursiveScrape(page, callback)
        results.push(result)
        return results
    }
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const url = `https://www.google.com.au/search?q=${options.query}&&tbm=shop`;

  await page.goto(url);

  // Need to make sure results are presented in list view
  const listRef = await page.$eval('div.sh-dtt__top-tools div.NmsQ6b a', a => a.title === "List" ? a.href : null)
  listRef ? await page.goto(listRef) : null

  recursiveScrape(page, filterResults).then(results => {
    const set = new Set
    // console.log(results)
    results.map(result => {
      result.map(product => {
        set.add(product)
      })
    })
    console.log(set)
    console.log(set.size)
  })
  
	

	
	// return results
};
exports.scrape = scrape;