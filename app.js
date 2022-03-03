const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./config/db');
const adminRouter = require('./api/adminRoutes');
const participantsRouter = require('./api/participantsRoutes');
const matchesRouter = require('./api/matchesRoutes')

//middlewear
app.use(express.json());
app.use(cors());

//Route middlewear
app.use('/admin', adminRouter);
app.use('/participants', participantsRouter);
app.use('/matches', matchesRouter);

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Oringe</h1>`);
  });



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`listening on ${port}...`)
})