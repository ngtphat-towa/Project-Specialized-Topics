import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(undefined, true);
};

const processImageMiddleware = multer({
  fileFilter: imageFilter,
  storage: storage, // multer.memoryStorage(), //storage
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
}).single("image");

export default processImageMiddleware;
