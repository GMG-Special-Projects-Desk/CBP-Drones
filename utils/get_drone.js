const puppeteer = require('puppeteer');
const aircrafts = [""]


var fs  = require('fs');
async function run() {
	const browser = await puppeteer.launch({
  		headless: false
  	});

	const page = await browser.newPage();

	for (let n of aircrafts) {
		drone_n=n.split('/')[5]
		flight=n.split('/')[6]
		await page.goto(n);
	  	const data = await page.evaluate(() => {
	    	return document.querySelector('table').innerHTML
	  	});
	  	await page.waitFor(5000)
		fs.writeFileSync("data/"+drone_n+"-"+flight+".html", data, 'utf-8'); 	
	};
	await browser.close()

}


run()