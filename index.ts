import router from './routes';
// const env = require("./common/env");
import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', router);

app.use('/', (req:Request, res:Response) => {
    res.status(400).json({ Message: "Invalid Route" });
});


// app.listen(env.PORT, () => {
//     console.log(`###       PORT RUNNING ON ${env.PORT}          ###`)
// });


console.log("he;lloo");
