const conn = require('./connection');

const base64Images = require('./models/data/base64Images')

//--- Bring in Models ---
const User = require('./models/User');
const Product = require('./models/Product');
const Review = require('./models/Review');
const Order = require('./models/Order');
const Category = require('./models/Category')
const LineItem = require('./models/LineItem')
const Image = require('./models/Image')

//--- Define Relations ---
Review.belongsTo(Product);
Product.hasMany(Review);
Review.belongsTo(User);
User.hasMany(Review);

Order.belongsTo(User)
Order.hasMany(LineItem)

LineItem.belongsTo(Order)
LineItem.belongsTo(User)
LineItem.belongsTo(Product)

Category.belongsToMany(Product, { through: 'description' })
Product.belongsToMany(Category, { through: 'description' })

Image.belongsTo(Product)

//--- Test seed data ---

const syncSeed = async () => {
    conn.sync({ force: true })
        .then(async () => {

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
                quantity: 11,
                photo: base64Images.rawCelery
            })
            const rawCelery2 = await Product.create({
                title: 'Raw Celery2',
                description: 'It is raw celery',
                price: 100,
                quantity: 11,
                photo: base64Images.rawCelery
            })
            const rawCelery3 = await Product.create({
                title: 'Raw Celery3',
                description: 'It is raw celery',
                price: 100,
                quantity: 11,
                photo: base64Images.rawCelery
            })
            const rawCelery4 = await Product.create({
                title: 'Raw Celery3',
                description: 'It is raw celery',
                price: 100,
                quantity: 11,
                photo: base64Images.rawCelery
            })
            const choppedCelery = await Product.create({
                title: 'Chopped Celery',
                description: 'It is chopped celery',
                price: 200,
                quantity: 22,
                photo: base64Images.choppedCelery
            })
            const superChoppedCelery = await Product.create({
                title: 'Super Chopped Celery',
                description: 'It is super chopped celery',
                price: 300,
                quantity: 33,
                photo: base64Images.choppedCelery
            })
            const discontinuedCelery = await Product.create({
                title: 'Discontinued Celery',
                description: 'Users should not see this while browsing or searching',
                price: 400,
                quantity: 0
            })
            const defaultImage = await Image.create({
                data: base64Images.default
            })
            const rawCeleryImage = await Image.create({
                data: base64Images.rawCelery,
                productId: rawCelery.id
            })

            const choppedCeleryImage = await Image.create({
                data: base64Images.choppedCelery,
                productId: choppedCelery.id
            })
            const lex = await User.create({
                email: 'lexbedwell@gmail.com',
                password: '123',
                isAdmin: true
            })
            const sam = await User.create({
                email: 'sam@email.com',
                password: 'abc',
                isAdmin: false
            })
            const order1 = await Order.create({
                status: 'cart',
                userId: lex.id
            })
            const order2 = await Order.create({
                status: 'processing'
            })
            const lineItem1 = await LineItem.create({
                quantity: 1,
                orderId: order1.id,
                productId: rawCelery.id,
                userId: lex.id,
            })
            const lineItem2 = await LineItem.create({
                quantity: 2,
                orderId: order2.id,
                productId: choppedCelery.id,
                userId: lex.id,
            })
            const rawRev = await Review.create({
                content: 'Lorem ipsum dolor amet adaptogen brunch flexitarian pug truffaut, street art kinfolk. Williamsburg street art pickled, chicharrones disrupt locavore shabby chic beard. Food truck brooklyn +1, celiac post-ironic organic listicle. Cred deep v squid, paleo bitters tumeric small batch.',
                rating: 4,
                userId: lex.id
            })
            const rawRev2 = await Review.create({
                content: 'DIY stumptown pitchfork 8-bit af iPhone flannel ugh glossier bicycle rights squid. Adaptogen fanny pack church-key crucifix ennui poutine kogi wayfarers flexitarian wolf actually quinoa pour-over tumeric. Food truck hella pickled cray enamel pin.',
                rating: 3,
                userId: lex.id
            })
            const chopRev = await Review.create({
                content: 'DIY stumptown pitchfork 8-bit af iPhone flannel ugh glossier bicycle rights squid. Adaptogen fanny pack church-key crucifix ennui poutine kogi wayfarers flexitarian wolf actually quinoa pour-over tumeric. Food truck hella pickled cray enamel pin.',
                rating: 5,
                userId: sam.id
            })
            const chopRev2 = await Review.create({
                content: 'So Baaaaaaad! DIY stumptown pitchfork 8-bit af iPhone flannel ugh glossier bicycle rights squid. Adaptogen fanny pack church-key crucifix ennui poutine kogi wayfarers flexitarian wolf actually quinoa pour-over tumeric. Food truck hella pickled cray enamel pin.',
                rating: 2,
                userId: sam.id
            })

            await rawCelery.addCategory(rawCat)
            await choppedCelery.addCategory(choppedCat)
            await superChoppedCelery.addCategory(rawCat)
            await superChoppedCelery.addCategory(choppedCat)
            await rawCelery.addReview(rawRev)
            await rawCelery.addReview(rawRev2);
            await choppedCelery.addReview(chopRev);
            await choppedCelery.addReview(chopRev2);
        })
}

module.exports = {
    syncSeed,
    User,
    Product,
    Review,
    Order,
    Category,
    LineItem,
    Image
}
