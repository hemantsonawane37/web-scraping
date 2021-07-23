const request = require("request")
const cheerio = require("cheerio")
const getissues = require("./sec")



request("https://github.com/topics", cd)

function cd(err, res, html) {
    if (err) {
        console.log(err)
    }
    const $ = cheerio.load(html)

    let topics = $(".no-underline.d-flex.flex-column.flex-justify-center")

    for (let i = 0; i < topics.length; i++) {
        let topicname = $(topics[i]).attr('href').slice(8,)
        let topic = $(topics[i]).attr('href')
        let firstlinlk = `https://github.com/${topic}`



        getintotopic(firstlinlk, topicname)
    }

    function getintotopic(link, topicname) {
        request(link, cb)

        function cb(err, res, html2) {
            if (err) {
                console.log(err)
            }
            let $ = cheerio.load(html2)
            let issue = $(".f3.color-text-secondary.text-normal.lh-condensed .text-bold")

            for (let i = 0; i < 8; i++) {
                let issuepre = $(issue[i]).attr('href')
                let repo = $(issue[i]).text().trim()

                let issuelinkl = `https://github.com/${issuepre}/issues`
                getissues(issuelinkl, repo, topicname)
            }

        }

    }



}



