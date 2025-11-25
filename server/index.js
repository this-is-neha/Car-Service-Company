const http=require('http')
const port=3000
const app = require("./src/config/express.config")

const server=http.createServer(app)

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



