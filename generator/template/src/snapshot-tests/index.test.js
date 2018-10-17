/* global PATH */

import puppeteer from 'puppeteer'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import routes from './routes'

expect.extend({ toMatchImageSnapshot })

describe('Screenshot tests', () => {
  if (routes.length) {
    let page
    beforeAll(async () => {
      const browser = await puppeteer.launch({ headless: true })
      page = await browser.newPage()
    })

    routes.forEach(({ path, name }) => {
      test(`${name} page - mobile screenshot`, async () => {
        await page.goto(PATH + path, { waitUntil: 'load' })

        page.setViewport({
          width: 320,
          height: 480
        })

        let screen = await page.screenshot({ fullPage: true })

        expect(screen).toMatchImageSnapshot()
      })

      test(`${name} page - desktop screenshot`, async () => {
        page.setViewport({
          width: 800,
          height: 600
        })

        let screen = await page.screenshot({ fullPage: true })
        expect(screen).toMatchImageSnapshot()
      })
    })
  } else {
    test('Screenshot test', () => {
      console.log('no route is defined for screenshot test')
    })
  }
})
