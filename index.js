const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://fr.alternate.be/listing.xhtml?n=1668682740515&partner=blacknovember'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const cards = []

        $('.text-dark', html).each(function(){
            //console.log($(this).text())
            const price = $(this).find('.price').text()
            const formerPrice = $(this).find('.line-through').text()
            const diff ='€ ' + (parseInt(formerPrice.substring(2, formerPrice.length - 2)) - parseInt(price.substring(2, price.length - 2))).toString() + ',00'
            cards.push({price, formerPrice, diff})
        })
        console.log(cards)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))