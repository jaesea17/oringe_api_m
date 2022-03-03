const express = require('express');
const router = express.Router();

const Participants = require('../models/Participants')

//create new entry for participants
router.post('/', async (req, res ) => {
    let {schoolName, state,  yearFounded,
            gameMaster, gameMasterEmail, gameMasterPhoneNumber
    } = req.body;    
   
    //checking if participant already exists
    try{
        let emailExist = await Participants.findOne({gameMasterEmail: gameMasterEmail});
        if (emailExist) {
            return res.send(gameMasterEmail)
        } 

    
        //creating new participant
        const newParticipant = new Participants({
            schoolName: schoolName,
            state: state,
            yearFounded: yearFounded,
            gameMaster: gameMaster,
            gameMasterEmail: gameMasterEmail,
            gameMasterPhoneNumber: gameMasterPhoneNumber,
            accepted: false
        })

        //saving new participant to database
        const savedParticipant = await newParticipant.save();
        console.log("saved successfully")
        return res.send(savedParticipant);
    }catch(err){
        console.log(err)
    }
   
});

//getting all registered participants
router.get("/", async (req, res) => {
    try{
        let participants = await Participants.find();
        return res.send(participants)
    }catch(err) {
        console.log(err)
    }
})

//updating accepted status of participants
router.patch("/", async (req, res) => {
    let {accepted, id} = req.body;

    try{
        await Participants.findByIdAndUpdate(id, { accepted: accepted })
    }catch(err) {

    }
})

router.get("/accepted", async (req, res) => {
    try{
        let accepted = await Participants.find({accepted: true})
        res.send(accepted);
    }catch(err) {
        console.log(err)
    }
})
   
 module.exports = router;
