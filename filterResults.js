function filterResults(items) {
    
    // Check if there are reviews - return object with text and link
    function getReviews(item) {
		const a = item.querySelector('div.na4ICd div.eWxN4b a')
		return a ? {text: a.innerText, link: a.href} : null
		
    }
    // title: product name, link: price comparison page or product page (if only one result)
    // price: lowest price, description: product description, reviews: link to reviews and amount
	return items.map( item => 
		({
				title: item.querySelector("div.eIuuYe a").innerText,
				link: item.querySelector("div.eIuuYe a").getAttribute('href'),
                price: item.querySelector("div.mQ35Be").innerText,
				description: item.querySelector('div.na4ICd:not(.TxCHDf)').innerText,
				thumbnail: item.querySelector('div.sh-dlr__thumbnail img').src,
				reviews: getReviews(item)
		})
);
}

module.exports = filterResults