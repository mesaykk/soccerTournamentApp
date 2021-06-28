const mongoose = require("mongoose");
const Tournament = mongoose.model("Tournament");

const addFinalist = function(req, res, tournament){
    console.log("addFinalist ::: ", tournament);
    if(!tournament.finalist){
        tournament.finalist = {};
    }

    tournament.finalist.team = req.body.team;
    tournament.finalist.manager = req.body.manager;

    tournament.save(function(err, updatedTournament){
        const response = {
            status: 201,
            message: updatedTournament
        }

        if(err){
            console.log("Error finding finalist")
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message)
    })
}
module.exports.getOneFinalist = function(req, res){
    console.log("GetOne finalist request recieved");
    const tournamentId= req.params.tournamentId;
    Tournament.findById(tournamentId).select("finalist").exec(function(err, finalist){
        res.status(200).json(finalist);
    })
}
module.exports.addFinalist = function (req, res) {
    console.log("POST new finalist")
    console.log(req.body);
    const tournamentId = req.params.tournamentId;
    Tournament.findById(tournamentId).exec(function(err, tournament){
        const response = {
            status: 201,
            message: tournament
        }
        if(err){
            console.log("Error creating finalist");
            response.status = 500;
            response.message = err;
        } else if(!tournament) {
            console.log("Error creating finalist");
            response.status = 404;
            response.message = {"message": "tournament ID not found"};
        } 
        if(tournament){
            console.log("tournament is", tournament)
            addFinalist(req, res, tournament);
        } else {
            res.status(response.status).json(response.message)
        }
    })   
}