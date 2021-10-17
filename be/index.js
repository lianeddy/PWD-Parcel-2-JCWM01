const express = require('express')
const cors = require('cors')
const multer = require('multer');

const PORT = 8080
const app = express()

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../fe/public/images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('<h4>Welcome to dev-mysql-api</h4>')
})

const { productsRouter, itemsRouter, userRouter } = require('./routers')

app.use('/products', productsRouter)
app.use('/items', itemsRouter)
app.use('/user', userRouter)

app.listen(PORT, () => console.log('Api Running :', PORT));