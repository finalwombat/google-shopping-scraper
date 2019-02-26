const puppeteer = require("puppeteer");
const filter = require("./filterResults");

const scrape = async () => {

    const options = {
        query: 'laptop'
    }

    const getReviews = (item) => {
        return item.querySelector("div.eWxN4b a")
    }
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
	
  const url = `https://www.google.com.au/search?q=${options.query}&&tbm=shop`;

  await page.goto(url);

	const results = await page.$$eval('div.sh-dlr__list-result', getResults)
	console.log(results)
};
exports.scrape = scrape;

function getResults(items){
	function getReviews(item) {
		const a = item.querySelector('div.na4ICd div.eWxN4b a')
		return a ? {text: a.innerText, link: a.href} : null
		
	}
	return items.map( item => 
		({
				title: item.querySelector("div.eIuuYe a").innerText,
				link: item.querySelector("div.eIuuYe a").getAttribute('href'),
				price: item.querySelector("div.mQ35Be").innerText,
				reviews: getReviews(item)
		})
);
}
function getReviews(item) {
	return item.querySelector("div.eWxN4b a")
}

scrape()