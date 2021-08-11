import * as superagent from 'superagent';
import superagentProxy from 'superagent-proxy'
superagentProxy(superagent);
import { cookies } from '../config/index'
import fs from 'fs'
import path from 'path'

const proxy = process.env.http_proxy || 'http://127.0.0.1:7890';

interface Analyzer {
    analyze: (html: string) => Promise<string>;
}

export default class Crawler {
    private filePath = path.resolve(__dirname, '../../data/output.json')
    constructor(private url: string, private analyzer: Analyzer) {
        this.init()
    }

    async init (): Promise<void> {
        const html = await this.getRawHtml(this.url)
        const content = await this.analyzer.analyze(html)
        this.output(content)
    }

    async getRawHtml(url: string): Promise<string> {
        const result = await superagent.get(this.url).set('Cookie', cookies).proxy(proxy)
        return result.text
    }

    output(content: string): void {
        fs.writeFileSync(this.filePath, content)
    }
}