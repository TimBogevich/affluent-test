import axios from "axios"
import { start } from "node:repl";
import { InputType } from "node:zlib";
import { Browser, Puppeteer } from "puppeteer"
import { json } from "sequelize/types";
const puppeteer = require('puppeteer');
const { PendingXHR } = require('pending-xhr-puppeteer');
import {Tabletojson} from 'tabletojson'

export default class AffluentLoader {

  url: string = process.env.AFF_PORTAL_URL || ""

  user: string = process.env.AFF_PORTAL_USER || ""

  password: string = process.env.AFF_PORTAL_PASSWORD || ""

  downloadUrl: string = "https://develop.pub.afflu.net/api/query/dates?export=1&startDate=2021-03-19&endDate=2021-04-17&dateResolution=day&columns[0][data]=date&columns[1][data]=totalComm&columns[2][data]=netSaleCount&columns[3][data]=netLeadCount&columns[4][data]=clickCount&columns[5][data]=EPC&columns[6][data]=impCount&columns[7][data]=CR&sort=date&sortdir=desc&currency=USD"

  async getDataApi() {

    const transport = axios.create({
      withCredentials: true
    })

    let res = await transport.post(this.url, {username: this.user, password: this.password})
    try {
      let res2 = await transport.get(this.downloadUrl) 
    } catch (error) {
      console.log(error)
    }
  }


  async getData() {
    let browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const pendingXHR = new PendingXHR(page);
    await page.goto(this.url, {
      waitUntil: 'networkidle0',
    });

    await page.type('input[name="username"]', this.user);
    await page.type('input[name="password"]', this.password);
    await page.tap('button[class="btn green uppercase"]');

    await page.waitForNavigation({'waitUntil': 'networkidle0'});

    // const closeBtn = await page.waitForSelector('#pushActionRefuse',
    //   {timeout: 30000})
    // await page.waitForTimeout(1000)
    // await closeBtn?.click()


    const button = await page.$("#datepicker");
    await button.click();
    
    await page.$eval('input[name="daterangepicker_start"]', (el:any) => el.value = "");
    await page.$eval('input[name="daterangepicker_end"]', (el:any) => el.value = "");
    
    await page.type('input[name="daterangepicker_start"]', "10/01/2020")
    await page.type('input[name="daterangepicker_end"]', "10/30/2020")

    const whiteSpace = await page.$('.range_inputs')
    await whiteSpace.click()

    const applyBtn = await page.$('.applyBtn')
    await applyBtn.click()
 
    await page.waitForSelector(".affLoadSpinner", {hidden: true})

    const inner_html = await page.$eval('table[data-url="geo"]', (el: any) => el.innerHTML);

    const tab = Tabletojson.convert("<table>" + inner_html + "</table>")

    let documents = tab[0].map((i: any) => {
      return {
        country: i["Total Change:"],
        commission: i["1"],
        sales: i["2"],
        leads: i["3"],
        clicks: i["4"],
        epc: i["5"],
        impressions: i["6"],
        cr: i["7"],
      }
    })

    await page.screenshot({ path: 'example.png' });

  }


}


