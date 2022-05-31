const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./api/images/animal-uploads");
  },
  filename: (req, file, cb) => {
    // eslint-disable-next-line prefer-template
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});

const imageFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    callback(null, true);
  } else {
    callback(new Error("Only jpeg, png, jpg and webp images are allowed"));
  }
};

const upload = multer({
  storage: storageImage,
  limits: {
    fileSize: 10024 * 10024,
  },
  fileFilter: imageFilter,
});

module.exports = upload;
