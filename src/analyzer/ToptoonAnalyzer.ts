import cheerio from 'cheerio'
import { OpenCC } from 'opencc';
import fs from 'fs'
import path from 'path'

import { Analyzer } from '../crawler'
import { formatTime } from '../utils'

interface Episode {
    title: string;
    date: string;
}

interface ParseResult {
    time: String;
    data: Episode[];
}

interface Content {
    [propName: number]: Episode[]
}

export default class ToptoonAnalyzer implements Analyzer {
    async analyze(html: string, filePath: string): Promise<string> {
        const parseResult: ParseResult = await this.parse(html)
        // const fileContent = this.output(parseResult, filePath)
        // return JSON.stringify(fileContent)
        return JSON.stringify(parseResult)
    }

    async parse(html: string) {
        const $ = cheerio.load(html)
        const episodeObj = $('.episodeBox')
        const episodeArr: Episode[] = []

        await Promise.all(episodeObj.map(async (index, element) => {
            const title = await this.simplified($(element).find('.subTitle').text())
            const filePath = path.resolve(__dirname, `../../data/toptoon/${index + 1}.${title}`)
            this.mkdir(filePath)
            const date = $(element).find('.pubDate').text()
            episodeArr.push({ title, date })
        }))

        const parseResult = {
            // time: (new Date()).getTime(),
            time: formatTime(new Date()),
            data: episodeArr,
        }
        console.log('### output ###')
        console.log(parseResult)

        return parseResult
    }

    mkdir(filePath: string) {
        fs.mkdir(filePath, { recursive: true }, err => {
            console.log(err)
        })
    }

    async simplified(str: string) {
        const converter: OpenCC = new OpenCC('t2s.json');
        const result = await converter.convertPromise(str);
        return result;
    }

    // output(result: ParseResult, filePath: string) {
    //     console.log(result)
    //     let fileContent: Content = {}
    //     if (fs.existsSync(filePath)) {
    //         fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    //     }
    //     fileContent[result.time] = result.data
    //     return fileContent
    // }
}