import axios from "axios"
import { start } from "node:repl";
import { InputType } from "node:zlib";
import { Browser, Puppeteer } from "puppeteer"
import { json } from "sequelize/types";
const puppeteer = require('puppeteer');
const { PendingXHR } = require('pending-xhr-puppeteer');
import {Tabletojson} from 'tabletojson'
import DateRow from "./DateRow"
import parse from 'multi-number-parse';
import { DateTime } from "luxon";

export default class AffluentLoader {

  url: string = process.env.AFF_PORTAL_URL || ""

  user: string = process.env.AFF_PORTAL_USER || ""

  password: string = process.env.AFF_PORTAL_PASSWORD || ""


  async getDates(dt_start: string = process.env.AFF_PORTAL_DT_START,
                dt_end: string = process.env.AFF_PORTAL_DT_END) {
    let browser = await puppeteer.launch(
      {headless: process.env.AFF_HEADLESS_CHROME || false});
      
    const page = await browser.newPage();
    const pendingXHR = new PendingXHR(page);
    await page.goto(this.url, {
      waitUntil: 'networkidle0',
    });

    await page.type('input[name="username"]', this.user);
    await page.type('input[name="password"]', this.password);
    await page.tap('button[class="btn green uppercase"]');

    await page.waitForNavigation({'waitUntil': 'networkidle0'});

    const button = await page.$("#datepicker");
    await button.click();
    
    await page.$eval('input[name="daterangepicker_start"]', (el:any) => el.value = "");
    await page.$eval('input[name="daterangepicker_end"]', (el:any) => el.value = "");
    
    await page.type('input[name="daterangepicker_start"]', dt_start )
    await page.type('input[name="daterangepicker_end"]', dt_end)

    const whiteSpace = await page.$('.range_inputs')
    await whiteSpace.click()

    const applyBtn = await page.$('.applyBtn')
    await applyBtn.click()

    while (true) {
      console.count("parsing PERFORMANCE BY DATE table")
      await page.waitForSelector(".affLoadSpinner", {hidden: true, timeout: 30000})

      let portlet = await page.$('div[data-name="dates"]')
      const inner_html = await portlet
          .$eval('table[data-url="dates"]', (el: any) => el.innerHTML);
      const tab = Tabletojson.convert("<table>" + inner_html + "</table>")
  
      let docs = tab[0].map((i: any) => {
        return {
          dt: DateTime.fromFormat(i["Total Change:"], "LLL dd, yyyy"),
          commission: parse(i["1"].replace("$", ""), ","),
          sales: parse(i["2"], '.'),
          leads: i["3"],
          clicks: parse(i["4"], '.'),
          epc: parse(i["5"].replace("$", ""), '.'),
          impressions: i["6"],
          cr: parse(i["7"], '.'),
        }
      })

      await DateRow.bulkCreate(docs)
        .catch(error => console.log(error))
  

      let next_btn = await portlet.$('li[class="next"]')
      let next_value = await next_btn?.getProperty('disabled');

      if(!next_value) {
        break
      } else {
        await next_btn.click()
        await page.waitForTimeout(1500)
      }

    }
 


    await browser.close()

  }


}


