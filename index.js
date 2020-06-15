"use strict";

const puppeteer = require("puppeteer");
const email = "fakeemail";
const password = "fakepass";

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
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
    await page.type("#twotabsearchtextbox", "data structures and algorithms");
    await sendSpecialCharacter(page, "#twotabsearchtextbox", "Enter");
    await page.waitForSelector(".sg-col-inner");
    await page
      .$x(
        "/html/body/div[1]/div[2]/div[1]/div[2]/div/span[3]/div[2]/div[4]/div/span/span/div/span[2]/div/div/div[2]/div[1]/div/div/span/a"
      )[0]
      .click();

    //Converting a 'wheel' step has to be done manually at this time
    await page.waitForSelector("#add-to-cart-button");
    await scrollToElement(page, "#add-to-cart-button");
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
