export let lbBaseUrl:string

if(process.env['NODE_ENV'] === 'production'){
    lbBaseUrl = 'http://app-service.innaconnection.com'
}else {
    lbBaseUrl = 'http://localhost:2006'
}
