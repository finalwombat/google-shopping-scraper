const puppeteer = require("puppeteer");
const filterResults = require("./filterResults");

const scrape = async options => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = `https://www.google.com.au/search?q=${options.query}&&tbm=shop`;

  await page.goto(url);

	// gets list of results as Array and passes it to filterResults()
	const results = await page.$$eval('div.sh-dlr__list-result', filterResults)

	console.log(results);

	await browser.close()
	return results
};
exports.scrape = scrape;