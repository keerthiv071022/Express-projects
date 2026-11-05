import express from "express";
import upload from "../middleware/upload.js";
const router = express.Router();      
// singlefile upload
// router.post("/upload", 
//     upload.single("image"),
//      (req, res) => {
//   console.log(req.file);
//   res.status(200).json({
//     status:true,
//     message:"file uploaded succesfully",
//     file:req.file
//   })
// }
// );
// multiple file upload
router.post("/upload", 
    upload.array("images", 5),
     (req, res) => {
  console.log(req.files);
  res.status(200).json({
    status:true,
    message:"file uploaded succesfully",
    files:req.files
  })
}
);

export default router;
