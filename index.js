"use strict";

const puppeteer = require("puppeteer");
require("dotenv").config();
var express = require("express");
var app = express();
app.listen(9000, () => {
  console.log("Server running on port 9000");
});

app.get("/book-now", function (req, res) {
  try {
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

        await page.waitForNavigation();
        // go to the product page
        page.goto(
          process.env.BUYLINK
        );

        // click the add-to-cart button
        await page.waitForSelector("#add-to-cart-button");
        await page.click("#add-to-cart-button");
      } catch (err) {
        console.log(err);
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
    res.send("Everythin is fine...");
  } catch (err) {
    console.log(err);
  }
});

// app.get("/book-now", function (req, res) {
//   res.send("Working.!");
// });
