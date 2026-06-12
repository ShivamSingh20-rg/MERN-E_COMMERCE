const app = require('./index.js')
const {connectDB} = require('./src/config/db.js')
 const PORT = process.env.PORT || 2100;


 
app.listen(PORT,()=>{
 connectDB();
    console.log('server is running on',PORT);
}) 
