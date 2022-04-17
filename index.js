const puppeteer = require('puppeteer');
const express = require('express');
const cors= require('cors');

const app = express();

app.use(express.static('public/index.html'));
app.use(cors());

let data;

(async () => {  

    let ynet = "https://www.ynet.co.il/home/0,7340,L-8,00.html";

    const browser = await puppeteer.launch({
        "headless": false
    });
    const page = await browser.newPage();
    await page.goto(ynet, {waitUntil: 'networkidle2'});

    data = await page.evaluate(() => {
        let titleArr = [];
        let titles = document.querySelectorAll(".slotTitle.small")
        
        titles.forEach((title) => titleArr.push(title.attributes.class.ownerElement.innerText))
        // console.log(titles);
        return {titleArr}

    });
    // console.log(data);
    await browser.close();
})();

(async ()=> {
    await app.get('/',(req, res) => {
        res.json(data)
   })
})()

app.listen(8000, ()=>{
    console.log('listening on 8000')
})