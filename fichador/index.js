const puppeteer = require('puppeteer');
const cookies = require('./cookies').data;
const fs = require('fs');
const dir = './book';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    for(let cookie in cookies) {
        await page.setCookie(cookies[cookie]);
    }
    await page.goto('https://mcp.soprahronline.com/SopraGP4U/WAW05B02', {waitUntil: 'networkidle2'});
    await new Promise(resolve => setTimeout(resolve, 8000));
    await page.type('#COMENT', "username@blabla.com");
    await page.pdf({path: dir + '/' + 'page' + '.pdf', format: 'A4'});
    // await page.type('#username', "username@blabla.com");
    // await page.type('#user_pass', "password");
    // await new Promise(resolve => setTimeout(resolve, 8000));
    // const cookies = await page.cookies();
    // console.log(cookies);
    // await page.click('.button-danger.flex-row-center.standard-button.padding-button.default-button-width.register-button');
    await page.click('.button-success.flex-row-center.standard-button.padding-button.default-button-width.register-button');

    await new Promise(resolve => setTimeout(resolve, 1000));
    await browser.close();
})();


