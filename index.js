const express = require('express');
const app = process.env.PORT || express();
const port = 5001;
// mideleware 
var cors = require('cors')
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend connected')
})

app.listen(port, () => {
    console.log('Backend Worked', port)
})