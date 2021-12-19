const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const authenticate = require('../middleware/authenticate');

router.get('/', (req, res) => {
    res.status(201).json({user: req.rootUser, message: "Welcome to Vocabulary"});
});

router.post('/addWord', async (req, res) => {
    try{
        // get the new word and username from request body
        const {newWord, username} = req.body;
        // Find the user
        const userx = await User.findOne({username: username});
        let newVocabulary = userx.vocabulary;
        newVocabulary.push({word: newWord, labels: []});

        await User.updateOne({username: username}, {
            $set: {
                vocabulary: newVocabulary
            }
        });

        return res.status(201).json({user: userx, message: "Word added"});
    }
    catch(err){
        console.log('Add word error: '+err);
    }
});

router.post('/deleteWord', async (req, res) => {
    try{
        // get the word and username from request body
        const {word, username} = req.body;
        // Find the user
        const userx = await User.findOne({username: username});
        let newVocabulary = userx.vocabulary;
        
        for(let i=0; i<newVocabulary.length; i++){
            if(newVocabulary[i].word === word){
                newVocabulary.splice(i, 1);
                break;
            }
        }

        await User.updateOne({username: username}, {
            $set: {
                vocabulary: newVocabulary
            }
        });

        return res.status(201).json({user: userx, message: "Word removed"});
    }
    catch(err){
        console.log('Remove word error: '+err);
    }
});

router.post('/addNewLabelToWord', async (req, res) => {
    try{
        // get the word and username and newlabel from request body
        const {word, username, newLabel} = req.body;
        // Find the user
        const userx = await User.findOne({username: username});
        let newVocabulary = userx.vocabulary;
        
        for(let i=0; i<newVocabulary.length; i++){
            if(newVocabulary[i].word === word){
                newVocabulary[i].labels.push(newLabel);
                break;
            }
        }

        await User.updateOne({username: username}, {
            $set: {
                vocabulary: newVocabulary
            }
        });

        return res.status(201).json({user: userx, message: "Tag added successsfully"});
    }
    catch(err){
        console.log('Add label error: '+err);
    }
});

router.post('/removeLabelFromWord', async (req, res) => {
    try{
        // get the word and username and removeLabel from request body
        const {word, username, removeLabel} = req.body;
        // Find the user
        const userx = await User.findOne({username: username});
        let newVocabulary = userx.vocabulary;
        
        for(let i=0; i<newVocabulary.length; i++){
            if(newVocabulary[i].word === word){
                let wordLabels = newVocabulary[i].labels;
                for(let j=0; j<wordLabels.length; j++){
                    if(wordLabels[j] === removeLabel){
                        wordLabels.splice(j, 1);
                        newVocabulary[i].labels = wordLabels;
                        break;
                    }
                }
                break;
            }
        }

        await User.updateOne({username: username}, {
            $set: {
                vocabulary: newVocabulary
            }
        });

        return res.status(201).json({user: userx, message: "Tag removed successfully"});
    }
    catch(err){
        console.log('Remove label error: '+err);
    }
});


module.exports = router;