import express from "express";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
app.use(express.json());
// routes
app.use("/",uploadRoutes);

app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});