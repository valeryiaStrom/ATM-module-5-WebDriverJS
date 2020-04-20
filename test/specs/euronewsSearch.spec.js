const {Builder, By, Key, until} = require('selenium-webdriver');

let driver;

async function createDriver() {
    driver = await new Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();
    return driver;
}

function openBrowser() {
    driver.get('https://www.euronews.com/');
}

async function closeCookieBanner() {
    let closeButton = await driver.wait(until.elementLocated(By.id('didomi-notice-agree-button')), 10000);
    await closeButton.click();
}

async function performSearch() {
    await driver.findElement(By.xpath('(//input[@type="search"])[1]')).sendKeys('football');
    await driver.findElement(By.css('button.c-search__button')).click();
}

async function getLatestArticleAboutBelarus() {
    let latestArticleAboutBelarus = await driver.wait(until.elementLocated(By.xpath('(//*[contains(text(),"Belarus")]//../../*/following-sibling::h3/a)[1]')), 1000);
    await latestArticleAboutBelarus.click();
} 

function closeBrowser() {
    driver.quit();
}

async function main() {
  driver = await createDriver();
  await driver.manage().setTimeouts({ implicit: 0, pageLoad: 3000, script: 3000 });
  await openBrowser();
  await closeCookieBanner();
  await performSearch();
  await getLatestArticleAboutBelarus();
  await closeBrowser();
}

main();
