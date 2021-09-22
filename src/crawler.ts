import * as superagent from 'superagent';
import superagentProxy from 'superagent-proxy'
superagentProxy(superagent);
import { cookies } from './config/index'
import fs from 'fs'
import path from 'path'

const proxy = process.env.http_proxy || 'http://127.0.0.1:7890';

export interface Analyzer {
    analyze: (html: string, filePath: string) => Promise<string>;
}

import ToptoonAnalyzer from './analyzer/ToptoonAnalyzer'

class Crawler {
    filePath = path.resolve(__dirname, '../data/output.json')

    constructor(private url: string, private analyzer: Analyzer) {
        this.initCrawler().catch((err) => { 
            // console.log(err)
        })
    }

    async getRawHtml() {
        const result = await superagent.get(this.url).set('Cookie', cookies).proxy(proxy)
        return result.text
    }

    async initCrawler() {
        const html = await this.getRawHtml()
        const fileContent = await this.analyzer.analyze(html, this.filePath)
        this.writeFile(fileContent)
    }

    writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }
}

const url = "https://www.toptoon.net/comic/epList/80364"
const analyzer = new ToptoonAnalyzer()
new Crawler(url, analyzer)