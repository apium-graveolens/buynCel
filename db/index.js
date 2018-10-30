const conn = require('./connection');

//--- Bring in Models ---
const User = require('./models/User');
const Product = require('./models/Product');
const Review = require('./models/Review');
const Order = require('./models/Order');

//--- Define Relations ---


//--- Helper functions ---
const syncSeed = () => conn.sync({ force: true });

module.exports = {
    syncSeed,
    conn,
    models: {
        User,
        Product,
        Review,
        Order
    }
}
