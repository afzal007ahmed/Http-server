let http = require('http') ;
let uuid = require('uuid') ;
statusMessage = {
    100 : 'informational' ,
    200 : 'success' ,
    300 : 'Redirecting' ,
    400 : 'error' ,
    500 : 'server error'
}
let server = http.createServer((req , res) => {
    res.statusCode = 200 ;

    
    if( req.url == '/html') {
        res.setHeader('content-type' , 'text/html') ;
        res.write(` <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
      `) ;
      res.end('<p> - Martin Fowler</p>')
    }

    else if( req.url == '/json'){
        res.setHeader('content-type' , 'application/json') ;
        let obj = {
            "slideshow": {
              "author": "Yours Truly",
              "date": "date of publication",
              "slides": [
                {
                  "title": "Wake up to WonderWidgets!",
                  "type": "all"
                },
                {
                  "items": [
                    "Why <em>WonderWidgets</em> are great",
                    "Who <em>buys</em> WonderWidgets"
                  ],
                  "title": "Overview",
                  "type": "all"
                }
              ],
              "title": "Sample Slide Show"
            }
          } ;
        res.end(obj)
    }

    else if( req.url == '/uuid') {
        res.write(`{uuid : ${uuid.v4()}}`)
        res.end();
    }

    else if( req.url.includes('/status')){ 
        res.end(statusMessage[ Number(req.url.slice( req.url.length - 3 ) )] )  ;
    }
    else if( req.url.includes('/delay')) {
        let index = req.url.indexOf('/delay') + 7 ;
        setTimeout(()=>{
            res.end('done') ;
        } , Number( req.url.slice( index )) * 1000 ) ;
         
    }
})


server.listen(3000 , () =>{
    console.log('working')
})