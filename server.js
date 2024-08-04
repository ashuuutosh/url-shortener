const express = require ('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

const connectionString = 'mongodb://localhost/urlShortner'; // Replace with your actual connection string

mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

//getting a route 
app.get('/:shortUrl', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})

app.post('/shortUrls' ,async (req, res) => {
    await ShortUrl.create({full: req.body.fullUrl })
    res.redirect('/')
})

app.get('/shortUrls', async (req, res) => {
    //req.param.shortUrl <== The right one
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl })
    if (shortUrl == null) 
    {
        return res.sendStatus(404)
    }
    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5002);



// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name';

// mongoose.connect(MONGODB_URI).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.error('Failed to connect to MongoDB', err);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
