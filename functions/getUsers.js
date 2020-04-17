const axios = require('axios');
exports.handler = function(event, context, callback){

 const { httpMethod } = event

 if(httpMethod === 'GET'){
   axios.get("https://iedcr.gov.bd/").then((response)=> {
     callback(null, {
         statusCode: 200,
         body: response.data
     })
   })

 }else if(httpMethod === 'POST'){
    callback(null, {
        statusCode: 200,
        body: "Post Hello World"
    })
 }else{
    callback(null, {
        statusCode: 404,
        body: "Not Found"
    })
 }

}
