const express = require("express");
const Matches = require("../models/Matches");
const router = express.Router();

router.post('/', async (req, res) => {
    let {home, away, date, time} = req.body;
    //creating new match
    const newMatch = new Matches({
        home: home,
        away: away,
        date: date, 
        time: time
    })
    //saving new match to database
    try{
        const savedMatch = await newMatch.save();
        res.send(savedMatch)
    }catch(err) {
        console.log(err)
    }  
})

//getting all matches
router.get("/", async (req, res) => {
    try{
        const matches = await Matches.find();
        res.send(matches);
    }catch(err){
        console.log(err)
    }
})

module.exports = router;