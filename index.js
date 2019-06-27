const server = require('./app')

server.listen(process.env.PORT || 8080, () => {
    console.log('Server started at port 8080.')
})