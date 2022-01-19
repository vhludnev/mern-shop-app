import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  // where to keep files
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}` // path.extname(file.originalname) - to keep original extention
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) // tests for a correct extension
  const mimetype = filetypes.test(file.mimetype) // tests for if it has the image type

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
    //cb(new Error("I don't get an image from you!"))
  }
}

function checkFileSize(req, cb) {
  const uploadFileSize = parseInt(req.headers['content-length'])
  if (uploadFileSize > 5242880) {
    return cb(new Error('File size is too big (max 5Mb)'))
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
    //checkFileSize(req, cb)
  },
  limits: { fileSize: 5242880, fieldNameSize: 300 }, // add it to set Limits of the uploaded data exmp. 5242880 Bytes = 5 Mb
})

router.post('/', upload.single('image'), (req, res) => {
  // "single('fieldname')" for  file; "array('fieldname', maxCountNumber)" - for multiple at the same time
  res.send(`/${req.file.path}`)
})

export default router
