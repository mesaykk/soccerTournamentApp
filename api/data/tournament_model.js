const mongoose = require("mongoose");

const finalistSchema = new mongoose.Schema(
    {
        team: {
           type: String,
           //required: true
        },
        manager: String
    }
)

const tournamentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    hostCountry: {
        type: String,
        required: true
    },
    numTeams: {
        type: Number,
        required: true
    },
    champions: String,
    topScorer: [String],
    bestPlayer: [String],
    finalDate: "",
    finalist: [finalistSchema],
    finalResult: String,
    
 });

mongoose.model("Tournament", tournamentSchema, "tournaments");