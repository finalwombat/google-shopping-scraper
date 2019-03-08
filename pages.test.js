const pages = require('./pages.js')
const puppeteer = require("puppeteer");
const fs = require('fs')
const html = fs.readFile('./googleShoppingSamplePage.html')
jest.setTimeout(30000);
test('pages.getNextUrl() should return the next url', done => {

    getPage().then( page => {
        pages.getNextUrl(page).then(url => {
            
            const expected = 'file:///search?q=laptop&tbs=vw:l,ss:44&tbm=shop&ei=uBx3XKPAAcWMvQS6yanAAw&start=20&sa=N&ved=0ahUKEwij_NuPiN3gAhVFRo8KHbpkCjgQ8NMDCKkE'
            expect(url).toBe(expected)
            done()
        })
        
    })
})


async function getPage(){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage()
    await page.goto('file:///home/jay/Documents/2019/projects/shopping-scraper/googleShoppingSamplePage.html')
    // await page.setContent(html, {load: true})
    return page
}