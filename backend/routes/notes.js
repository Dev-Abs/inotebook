const express = require("express");
const fetchuser = require("../middleware/fetchuser"); // Import the fetchuser middleware from a file "../models/fetchuser"
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator"); // Import functions for request validation
const router = express.Router();

// Endpoint: "/fetchallnotes"
// ROUTE 1: This route  require authentication and  require the user to be logged in
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        return res.status(500).send('some internal server error has occured!')
    }
});

// Endpoint: "/addnote"
// ROUTE 2: This route require authentication and require the user to be logged in
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }), // title should have a minimum length of 3 characters
    body("description", "Enter description of at least 5 characters").isLength({
      min: 5,
    }), // description should have a minimum length of 5 characters
  ],
  async (req, res) => {
    const {title,description,tag} = req.body;
    const result = validationResult(req);

    // If there are no validation errors
    if (result.isEmpty()) {
        try {
            const note = new Note({
                user: req.user.id,title,description,tag
            })
            const savedNote= await note.save();
            return res.json(savedNote);
        } catch (error) {
            console.error(error)
            return res.status(500).send('some internal server error has occured!')
        }
    }
    // If there are validation errors, send the array of errors as a response
    res.send({ errors: result.array() });
  }
);

// Endpoint: "/updatenote"
// ROUTE 2: This route require authentication and require the user to be logged in

router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            
            const {title,description,tag} = req.body;
            
            const newNote ={};
            
            if(title){newNote.title= title};
            if(description){newNote.description= description};
            if(tag){newNote.tag= tag};
            
            //find the note to be updated
            
            let note = await Note.findById(req.params.id)
            
            if(!note){
                return res.status(404).send("Not Found")
            }
            
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed");
            }
            
            
            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
            
            res.json(note)
            
        } catch (error) {
            return res.status(500).send('some internal server error has occured!')
        }
        })


    // Endpoint: "/deletenote"
// ROUTE 3: This route require authentication and require the user to be logged in

router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            
            //find the note to be deleted
            
            let note = await Note.findById(req.params.id)
            
            if(!note){
                return res.status(404).send("Not Found")
            }
            
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed");
            }
            
            note = await Note.findByIdAndDelete(req.params.id)
            
            res.json({"Success": "Note has been deleted successfully!", "note": note})
        } catch (error) {
            return res.status(500).send('some internal server error has occured!')
        }

    })
module.exports = router;
