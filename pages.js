module.exports = {
    recursiveScrape: async function(url, callback){
        const page = await browser.newPage()
        await page.goto(url)
        return await page.$$eval('div.sh-dlr__list-result', callback)
    },

    getNextUrl: async function(page){
        const elem = await page.$('a.pn')
        const url = elem ? page.$eval('a.pn', e => e.href) : null
        return url
    }
}
