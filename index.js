"use strict";

const puppeteer = require("puppeteer");
const select = require("puppeteer-select");
require("dotenv").config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    await page.goto("http://amazon.in");
    await page.click("#a-autoid-0-announce");
    // Converting a 'drag' step has to be done manually at this time
    // Converting a 'drag' step has to be done manually at this time
    await page.waitForSelector("#ap_email");
    await page.click("#ap_email");
    await page.type("#ap_email", email);
    await sendSpecialCharacter(page, "#ap_email", "Enter");
    // Converting a 'drag' step has to be done manually at this time
    await page.waitForSelector("#ap_password");
    await page.type("#ap_password", password);
    await sendSpecialCharacter(page, "#ap_password", "Enter");
    await page.waitForSelector("#twotabsearchtextbox");
    await page.click("#twotabsearchtextbox");
    await page.type(
      "#twotabsearchtextbox",
      "Data Structures and Algorithms Made Easy: Data Structures and Algorithmic Puzzles"
    );
    await sendSpecialCharacter(page, "#twotabsearchtextbox", "Enter");
    await page.waitForNavigation();
    console.log("SEARCH-RESULTS PAGE LOADED");
    // await page.click(
    //   '[href="/Data-Structures-Algorithms-Made-Easy/dp/819324527X/ref=sr_1_2?dchild=1&keywords=Data+Structures+and+Algorithms+Made+Easy%3A+Data+Structures+and+Algorithmic+Puzzles&qid=1592292386&sr=8-2"]'
    // );
    // const product = await select(page).getElement(
    //   "span.a-size-medium:contains(Data Structures and Algorithms Made Easy: Data Structures and Algorithmic Puzzles)"
    // );
    // await product.click();
    const pageTarget = page.target();
    await page.click("[data-asin='819324527X'] .a-size-medium");
    const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
    page = await newTarget.page();
    // const newTarget = await browser.waitForTarget(
    //   (target) => target.opener() === page
    // );
    // //check that you opened this page, rather than just checking the url
    // const newPage = await newTarget.page(); //get the page object
    // //wait till page is loaded
    // await newPage.waitForNavigation();
    //await page.waitForSelector("#add-to-cart-button");
    // await page.click("#add-to-cart-button");

    // const button = await select(page).getElement(
    //   "span.a-button-text:contains(Add to Cart)"
    // );
    // await button.click();

    //await scrollToElement(page, "#add-to-cart-button");
    // await page.waitForNavigation();
    // page = browser.pages[browser.pages.length - 1];
    await page.waitForSelector("#add-to-cart-button");
    await page.click("#add-to-cart-button");
  } finally {
    // if (browser) {
    //   await browser.close();
    // }
  }
})();

// move to utils.js

async function scrollTo(page, x, y) {
  await page.evaluate(
    (x, y) => {
      window.scroll(x, y);
    },
    x,
    y
  );
}

async function sendSpecialCharacter(page, selector, key) {
  const elementHandle = await page.$(selector);
  await elementHandle.press(key);
}

async function scrollToElement(page, selector) {
  await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    element.scrollIntoView({
      block: "center",
      inline: "nearest",
      behavior: "instant",
    });
  }, selector);
}
