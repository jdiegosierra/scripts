const puppeteer = require('puppeteer');
const cookies = require('./cookies').data;
const fs = require('fs');
const dir = './book';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for(let cookie in cookies) {
        await page.setCookie(cookies[cookie]);
    }
    await page.goto('https://learning.oreilly.com/library/view/mastering-typescript-3/9781789536706/46fca2cc-f4f0-410b-abec-aa330b501b13.xhtml', {waitUntil: 'networkidle2'});
    await new Promise(resolve => setTimeout(resolve, 8000));
    // await page.type('#username', "username@blabla.com");
    // await page.type('#user_pass', "password");
    // await new Promise(resolve => setTimeout(resolve, 8000));
    // const cookies = await page.cookies();
    // console.log(cookies);
    let notFinish = true;
    let counter = 0;

    await page.evaluate(async () => {
        let elements = document.querySelectorAll(".interface-controls.interface-controls-top");
        elements[0].parentNode.removeChild(elements[0]);
    });

    while (notFinish) {
        console.log('page-' + counter);
        await page.click('.pagination-title.t-next-title');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.evaluate(async () => {
            if (document.querySelector('.pagination-title.t-next-title')[0] === undefined) {
                notFinish = false;
            }
        });
        await page.pdf({path: dir + '/' + 'page-' + counter + '.pdf', format: 'A4'});
        counter++;
    }
    await browser.close();
})();


