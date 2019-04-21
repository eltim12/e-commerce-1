'use strict'
require('dotenv').config()

const Storage = require('@google-cloud/storage')
const fs = require('fs');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET


const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)


const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const gcsname = 'idgaf' + Date.now()
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      console.log(req.file.cloudStoragePublicUrl)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const uploads = (req, res, next) => {
  const { image, existed } = req.body;

  if(image) {
    const base64Data = image.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,/, "");
    const newFilename = Date.now() + '.' + 'png';
    const newFile = 'uploads/' + newFilename;
    
    req.fileName = newFilename
    req.filePath = newFile
    
    fs.writeFile(newFile, base64Data, 'base64', function (err) {
      if (err) {
        next()
      } else {
        next()
      }
    })
  } else {
    req.fileUrl = existed
    next()
  }
}

const goToGCS = (req, res, next) => {
  //-
  // Upload a file from a local path.
  //-
  if (req.body.image) {
    bucket.upload(req.filePath, function (err, file, apiResponse) {
      req.fileUrl = getPublicUrl(req.fileName);

      fs.unlink(req.filePath, (err) => {
        if (err) {
          res.status(500).json({
            msg: err.message
          })
        }
      });

      next();
    });
  } else {
    next()
  }

}


module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  uploads,
  goToGCS
}