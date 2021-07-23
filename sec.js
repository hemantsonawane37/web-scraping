const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")
const path = require("path")
const pdfkit = require("pdfkit")


function getissues(isslink, repos, topicname) {


    request(isslink, cb)

    function cb(err, res, html3) {
        if (err) {
            console.log(err)
        }
        let $ = cheerio.load(html3)
        let helo = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title ")


        let datas;
        for (let i = 0; i < helo.length; i++) {
            datas = $(helo[i]).attr('href')

        }

        let folderpath = path.join(__dirname + "/" + topicname)
        if (fs.existsSync(folderpath) == false) {
            fs.mkdirSync(folderpath)
        }
        let filepath = path.join(folderpath +"/"+ repos +".pdf")

        let pdfdoc = new pdfkit()
        pdfdoc.pipe(fs.createWriteStream(filepath))
        pdfdoc.text(datas)
        pdfdoc.end()

    }

}

module.exports = getissues;