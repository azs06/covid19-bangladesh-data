const cheerio = require('cheerio');
const axios = require('axios');

module.exports =  async function getData(url){
    const response = await axios.get(url);
    const html = await response.data;
    const $ = cheerio.load(html);
    const table = $('.table');
    const tableHeaders = $(table).find('th');
    const tableBody = $(table).find('tbody')
    const tableRows = $(tableBody).find('tr');

    const tableHeaderLabels = Array.from(tableHeaders).map((th)=> $(th).text());

    let label = '';
    const data = Array.from(tableRows).map((row, index) => {
        const td = $(row).find('td');
        return Array.from(td).reduce((acc, curr, tableDataIndex)=>{
            if(tableDataIndex === 0){
                label = $(curr).text();
                acc[label] = {
                    updated: tableHeaderLabels[tableDataIndex]
                }
            }else{
                acc[label][tableHeaderLabels[tableDataIndex]] = $(curr).text();
            }
            return acc;
        }, {})
    })
    return Promise.resolve(data);
}
