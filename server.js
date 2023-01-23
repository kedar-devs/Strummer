const app=require('./app')
const {ConnectDB}=require('./DB/DbConnection')
const port=process.env.PORT || 5000
const connect= ConnectDB()
if(connect!=false){
    app.listen(port, () => {
        console.log("listening for requests");
    })
}

