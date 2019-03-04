const puppeteer = require("puppeteer");
const filterResults = require("./filterResults");
const filterResultsGrid = require("./filterResults");

const scrape = async options => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = `https://www.google.com.au/search?q=${options.query}&&tbm=shop`;

  await page.goto(url);

  // Need to make sure results are presented in list view
  const listRef = await page.$eval('div.sh-dtt__top-tools div.NmsQ6b a', a => a.title === "List" ? a.href : null)
  listRef ? await page.goto(listRef) : null

	// gets list of results as Array and passes it to filterResults()
	const results = await page.$$eval('div.sh-dlr__list-result', filterResults)

	console.log(results);

	await browser.close()
	return results
};
exports.scrape = scrape;