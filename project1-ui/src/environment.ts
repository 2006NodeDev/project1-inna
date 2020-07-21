export let lbBaseUrl:string

if(process.env['NODE_ENV'] === 'production'){
    lbBaseUrl = 'http://node-service.js-army.com'
}else {
    lbBaseUrl = 'http://localhost:2006'
}