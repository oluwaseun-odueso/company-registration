import express, { Request, Response } from "express";
import userARoutes from "./routes/userARoutes";
import userBRoutes from "./routes/userBRoutes"
import { OK } from "http-status";
import { SuccessResponse } from "./middlewares/res.util";
require('dotenv').config()

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use('/api/user-a', userARoutes);
app.use('/api/user-b', userBRoutes);

app.get("/api", (req: Request, res: Response) => {
  res.status(OK).send(SuccessResponse("Welcome to Company Registry"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
