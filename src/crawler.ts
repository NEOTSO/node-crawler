// import superagent from 'superagent'
import * as superagent from 'superagent';
import superagentProxy from 'superagent-proxy'
superagentProxy(superagent);
import { cookies } from './utils'
// const cheerio = require('cheerio')
import cheerio from 'cheerio'

const proxy = process.env.http_proxy || 'http://127.0.0.1:7890';

class Crawler {
    private url = "https://www.toptoon.net/comic/epList/80583"

    async getRawHtml() {
        const result = await superagent.get(this.url).set('Cookie', cookies).proxy(proxy)
        // console.log(result.text)
        this.parse(result.text)
    }

    parse(html: string) {
        const $ = cheerio.load(html)
        const episodeArr = $('.episodeBox')
        episodeArr.map((index, element) => {
            console.log(index)
            const episode = $(element).find('.title')
            const title = $(element).find('.subTitle')
            const date = $(element).find('.pubDate')
            console.log(episode.text())
            console.log(title.text())
            console.log(date.text())
        })
    }

    constructor() {
        try {
            console.log('cccc')
            this.getRawHtml()
        } catch(err) {
            console.log(err)
        }
    }
}

const crawler = new Crawler()