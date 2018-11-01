const conn = require('./connection');

//--- Bring in Models ---
const User = require('./models/User');
const Product = require('./models/Product');
const Review = require('./models/Review');
const Order = require('./models/Order');
const Category = require('./models/Category')
const LineItem = require('./models/LineItem')

//--- Define Relations ---
Review.belongsTo(Product);
Review.belongsTo(User);

Order.belongsTo(User)
Order.hasMany(LineItem)

LineItem.belongsTo(Order)
LineItem.belongsTo(User)
LineItem.belongsTo(Product)

Category.hasMany(Product)

//--- Test seed data ---

const syncSeed = async () => {
    conn.sync({force: true})
        .then (async () => {
            const rawCat = await Category.create({
                name: 'raw'
            })
            const choppedCat = await Category.create({
                name: 'chopped'
            })
            const rawCelery = await Product.create({
                title: 'Raw Celery',
                description: 'It is raw celery',
                price: 100,
                categoryId: rawCat.id
            })
            const choppedCelery = await Product.create({
                title: 'Chopped Celery',
                description: 'It is chopped celery',
                price: 200,
                categoryId: choppedCat.id
            })
            const superChoppedCelery = await Product.create({
                title: 'Super Chopped Celery',
                description: 'It is super chopped celery',
                price: 300,
                categoryId: choppedCat.id
            })
            const lex = await User.create({
                email: 'lex@email.com',
                password: '123',
                isAdmin: true,
                facebookEmail: 'lexbedwell@gmail.com'
            })
            const sam = await User.create({
                email: 'sam@email.com',
                password: 'abc',
                isAdmin: false
            })
            const order1 = await Order.create({
                status: 'cart',
                userId: sam.id
            })
            const order2 = await Order.create({
                status: 'order'
            })
            const lineItem1 = await LineItem.create({
                quantity: 1,
                orderId: order1.id,
                productId: rawCelery.id
            })
            const lineItem2 = await LineItem.create({
                quantity: 2,
                orderId: order2.id,
                productId: choppedCelery.id
            })
        })
}


module.exports = {
    syncSeed,
    User,
    Product,
    Review,
    Order,
    Category,
    LineItem
}
