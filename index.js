"use strict";

const puppeteer = require("puppeteer");
require("dotenv").config();

async function oneWindow(email, pass) {
  let browser;
  try {
    // new broswer window and page
    browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    await page.goto("http://amazon.in");

    // click on Sign-In button
    await page.click("#a-autoid-0-announce");

    // enter email and hit enter
    await page.waitForSelector("#ap_email");
    await page.click("#ap_email");
    await page.type("#ap_email", email);
    await sendSpecialCharacter(page, "#ap_email", "Enter");

    // enter password and hit enter
    await page.waitForSelector("#ap_password");
    await page.type("#ap_password", pass);
    await sendSpecialCharacter(page, "#ap_password", "Enter");

    // // click on the searchbox and type the product name, then hit enter
    // await page.waitForSelector("#twotabsearchtextbox");
    // await page.click("#twotabsearchtextbox");
    // await page.type(
    //   "#twotabsearchtextbox",
    //   "Data Structures and Algorithms Made Easy: Data Structures and Algorithmic Puzzles"
    // );
    // await sendSpecialCharacter(page, "#twotabsearchtextbox", "Enter");

    // // wait for the products to load and click the desired product link
    // await page.waitForNavigation();
    // const pageTarget = page.target();
    // await page.click("[data-asin='819324527X'] .a-size-medium");

    // // wait for new page/tab and set page variable to the new page
    // const newTarget = await browser.waitForTarget(
    //   (target) => target.opener() === pageTarget
    // );
    // page = await newTarget.page();

    await page.waitForNavigation();
    page.goto(
      "https://www.amazon.in/Test-Exclusive-646/dp/B07HGJKDRR/ref=sr_1_3?dchild=1&keywords=galaxy+m40&qid=1592337590&s=electronics&sr=1-3"
    );

    // click the add-to-cart button
    await page.waitForSelector("#add-to-cart-button");
    await page.click("#add-to-cart-button");
  } finally {
    // if (browser) {
    //   await browser.close();
    // }
  }
}

// get creds from .env file and split the EMAIL and PASSWORD using ','
let emailsArr = process.env.EMAIL.split(",");
let passArray = process.env.PASSWORD.split(",");

// call the main function in a loop where no. of iterations = no. of accounts
for (let i = 0; i < emailsArr.length; i++) {
  oneWindow(emailsArr[i], passArray[i]);
}

// additional functions     ---------------------------------------------------
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
