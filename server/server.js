import express from "express"
import { ConnectDB} from "./DB/MONGODB.js"
import adminRouter from "./Routes/admin_routes.js";
import hospitalRouter from "./Routes/hospital_routes.js";
import userRouter from "./Routes/user_routes.js";
const app = express()
import cors from 'cors';
const port = 3000

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'))

ConnectDB();
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/hospital", hospitalRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))