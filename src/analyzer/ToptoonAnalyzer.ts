import cheerio from 'cheerio'
import { OpenCC } from 'opencc';
import fs from 'fs'

import { Analyzer } from '../crawler'

interface Episode {
    title: string;
    date: string;
}

interface ParseResult {
    time: number;
    data: Episode[];
}

interface Content {
    [propName: number]: Episode[]
}

export default class ToptoonAnalyzer implements Analyzer {
    async analyze(html: string, filePath: string): Promise<string> {
        const parseResult: ParseResult = await this.parse(html)
        const fileContent = this.output(parseResult, filePath)
        return JSON.stringify(fileContent)
    }

    async parse(html: string) {
        const $ = cheerio.load(html)
        const episodeObj = $('.episodeBox')
        const episodeArr: Episode[] = []

        await Promise.all(episodeObj.map(async (index, element) => {
            const title = await this.simplified($(element).find('.subTitle').text())
            const date = $(element).find('.pubDate').text()
            episodeArr.push({ title, date })
        }))

        return {
            time: (new Date()).getTime(),
            data: episodeArr,
        }
    }

    async simplified(str: string) {
        const converter: OpenCC = new OpenCC('t2s.json');
        const result = await converter.convertPromise(str);
        return result;
    }

    output(result: ParseResult, filePath: string) {
        console.log(result)
        let fileContent: Content = {}
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[result.time] = result.data
        return fileContent
    }
}