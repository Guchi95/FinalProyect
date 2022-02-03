const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/product-db-app',  {
useNewUrlParser: true,
useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));