const getData = require('../app/getData.js');
const axios = require('axios');
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};
exports.handler = function(event, context, callback){
    const { httpMethod } = event
    if(httpMethod !== 'GET'){
       callback(null, {
           headers,
           statusCode: 404,
           body: 'Not Found'
       })
    }else{
        getData("https://iedcr.gov.bd/").then((response)=> {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                  data: response
                })
            })
        }).catch(error=> {
            callback(null, {
                statusCode: 200,
                body: 'Error'
            })
        })
    }
   }
