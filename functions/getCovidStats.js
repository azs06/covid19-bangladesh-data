const fetch = require('node-fetch');
const cheerio = require('cheerio');

const iedcrUrl = "https://iedcr.gov.bd/";

async function getData(url){
    const response = await fetch(url);
    const html = await response.text();
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
                    [tableHeaderLabels[tableDataIndex]]: $(curr).text() 
                }
            }else{
                acc[label][tableHeaderLabels[tableDataIndex]] = $(curr).text();  
            }
            return acc;
        }, {})
    })
    return Promise.resolve(data);
}

exports.handler = function(event, context, callback){   
    const { httpMethod } = event   
    if(httpMethod !== 'GET'){
       callback(null, {
           statusCode: 404,
           body: "Not Found"
       })
    }else{
        getData(iedcrUrl).then((response)=> {
            callback(null, {
                statusCode: 404,
                body: JSON.stringify(
                    {data: response}
                )
            })
        }).catch(error=> {
            console.log(error)
            callback(null, {
                statusCode: 200,
                body: 'Error'
            })
        })
    } 
   }
