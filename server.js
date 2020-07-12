const express = require("express")
const app = express()
const db = require('./config/db')
const URI = require('./config/default.json')
/***************************** */
const path = require('path')
const crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const Upload = require('./models/Upload')
const Solution = require('./models/Solution')
const checkToken = require('./middleware/auth')

/**************************** */
app.use(express.json({ extended: false }))


//Routes
app.use("/api/users", require('./Routes/users'))
app.use("/api/auth", require('./Routes/auth'))
app.use("/api/postConfirmation", require('./Routes/postConfirmation'))
app.use("/api/forgotPassword", require('./Routes/forgotPassword'))
app.use("/api/changePassword", require('./Routes/changePassword'))
//Home page
db()
app.get("/", (req, res) => {
  res.send("Home")
})

//server
app.listen(process.env.PORT || 5000, () => {
  console.log("server up at 5000");
})


/**********************DB for files************************ */

app.use(methodOverride('_method'))
const mongoURI = URI.mongoURI;

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads')
})

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {

    return new Promise((resolve, reject) => {
      crypto.randomBytes(3, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

app.post('/api/upload', checkToken, upload.single('file'), (req, res) => {
  const name = req.body.name
  const phone = req.body.contactno
  const email = req.body.email
  const deadline = req.body.deadline
  const range = req.body.range
  const subject = req.body.subject
  const file = req.file.filename

  let newupload = new Upload({
    name,
    phone,
    email,
    file,
    deadline,
    range,
    subject
  })

  newupload.save()

  res.redirect('/User/upload')
})

app.post('/api/solutions', upload.single('file'), (req, res) => {
  const name = req.body.name
  const phone = req.body.contactno
  const assign = req.body.assign
  const email = req.body.email
  const deadline = req.body.deadline
  const range = req.body.range
  const subject = req.body.subject
  const file = req.file.filename

  let newsolution = new Solution({
    name,
    phone,
    email,
    file,
    deadline,
    range,
    subject,
    assign
  })

  newsolution.save()
  res.redirect('/User/upload')

})

app.get('/api/files', (req, res) => {
  if (!gfs) {
    res.redirect('/api/files')
  }
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length == 0) {
      console.log("hello");

      return res.status(404).json({
        err: "no files exist"
      })
    }
    else {
      res.json({
        files: files
      })
    }

  })
})

app.get('/api/Specific/:filename', async (req, res) => {
  const readstream = await gfs.createReadStream(req.params.filename)
  readstream.pipe(res)
}
)

app.get('/api/Specific/sols/:filename', async (req, res) => {
  const readstream = await gfs.createReadStream(req.params.filename)
  readstream.pipe(res)
}
)

app.get('/api/:number', async (req, res) => {
  try {
    const contacts = await Upload.find({ phone: req.params.number })
    res.json(contacts)
  } catch (error) {
    console.log(error);
    res.status(500).send('server error')
  }
})

app.get('/api/get/admin', async (req, res) => {
  try {
    const contacts = await Upload.find({})
    res.json(contacts)
  } catch (error) {
    console.log(error);
    res.status(500).send('server error')
  }
})


app.get('/api/sols/:number', async (req, res) => {
  try {
    const sols = await Solution.find({ phone: req.params.number })
    res.json(sols)
  } catch (error) {
    console.log(error);
    res.status(500).send('server error')
  }
})

app.get('/api/admin/sol', async (req, res) => {
  try {
    const solution = await Solution.find({})
    res.json(solution)
  } catch (error) {
    console.log(error);
    res.status(500).send('server error')
  }
})