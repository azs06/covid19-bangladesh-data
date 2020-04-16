exports.handler = function(event, context, callback){
    
 const { httpMethod } = event

 if(httpMethod === 'GET'){
    callback(null, {
        statusCode: 200,
        body: "Get Hello World"
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