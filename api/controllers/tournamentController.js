const mongoose = require("mongoose");
const Tournament = mongoose.model("Tournament");

module.exports.getAllTournaments = function(req, res){
    console.log("Get All Request Recieved");
    
    let offset = 0;
    let count = 4;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count);
    }
    if(isNaN(offset) && isNaN(count)){
        res.status(400).json({"message ::": "Query String must be a Number"});
        return;
    }
    Tournament.find().skip(offset).limit(count).exec(function(err, tournaments){
        if(err){
            console.log("Error finding tournaments", err);
            res.status(500).json(err);
        } else {
            console.log("Found tournaments:", tournaments)
            res.status(200).json(tournaments);
        }
    })
}
module.exports.getOneTournament = function(req, res) {
    console.log("GetOne request received")
    //console.log(req.body);
    const tournamentId = req.params.tournamentId;
    if(tournamentId.length != 24){
        res.status(400).json({"massage": "request parameter tournamentId is not correct ", err});
        return;
    }
    Tournament.findById(tournamentId).exec(function(err, tournament){
        const response = {
            status: 200,
            message: tournament
        }

        if(err){
            console.log("Error finding tournament")
            response.status = 500;
            response.message = err;
        } else if (!tournament){
            response.status = 400;
            response.message = {"message": "tournament ID not found"}
        }
        res.status(response.status).json(response.message);
        console.log(tournament);
    }); 
}
module.exports.addTournament = function(req, res) {
    console.log("POST new tournament")
    console.log(req.body);
    const newTournament = {
        title: req.body.title,
        hostCountry: req.body.hostCountry,
        numTeams: parseInt(req.body.numTeams),
        champions: req.body.champions,
        topScorer: req.body.topScorer,
        bestPlayer: req.body.bestPlayer,
        finalDate: req.body.finalDate,
        finalResult: req.body.finalResult,
        finalist: {}
    };
    console.log("Print tournament ", newTournament);
    Tournament.create(newTournament, function(err, tournament){
        const response = {
            status: 201,
            message: tournament
        }
        if(err){
            console.log("Error creating tournament");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })   
}
module.exports.updateOneFullTournament = function(req, res){
    console.log("updateOneFullTournament request received");
    const tournamentId = req.params.tournamentId;
    if(tournamentId.length != 24){
        res.status(400).json({"message": "RequestParam tournamentId is not correct"})
        return;
    }
    Tournament.findById(tournamentId).exec(function(err, tournament){
        const response = {
            status: 204,
            message: tournament
        };
        if(err){
            console.log("Error finding tournament");
            response.status = 500;
            response.message = err;
        }else if(!tournament){
            
            response.status = 400;
            response.message = {"message": "Tournament ID not found"};
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        }else {
            tournament.title =  req.body.title,
            tournament.hostCountry = req.body.hostCountry,
            tournament.numTeams = parseInt(req.body.numTeams),
            tournament.champions = req.body.champions,
            tournament.topScorer = req.body.topScorer,
            tournament.bestPlayer= req.body.bestPlayer,
            tournament.finalDate = req.body.finalDate,
            tournament.finalResult = req.body.finalResult,
            tournament.finalist = {};
            tournament.save(function(err, updatedTournament){
                if(err){
                    response.status = 500;
                    response.massage = err;
                } else {
                    response.message = updatedTournament;
                }
                res.status(response.status).json(response.message);
            })
        }

    })
}
module.exports.parialUpdate = function(req, res){
    console.log("partial UpdateOne resquest received");
    const tournamentId = req.params.tournamentId;
    if(tournamentId.length != 24){
        res.status(400).json({"message": "RequestParam tournamentId is not correct"});
        return;
    }
    Tournament.findById(tournamentId).exec(function(err, tournament){
        const response = {
            status: 204,
            message: tournament
        } 
        if(err){
            console.log("Error finding tournament");
            response.status = 500;
            response.message = err;
        }else if(!tournament){
            
            response.status = 400;
            response.message = {"message": "Tournament ID not found"};
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        } else {
            if(req.body.title){
                tournament.title = req.body.title;
            }
            if(req.body.hostCountry){
                tournament.hostCountry = req.body.hostCountry;
            }
            if(req.body.numTeams){
                tournament.numTeams = req.body.numTeams;
            }
            if(req.body.champions){
                tournament.champions = req.body.champions;
            }
            if(req.body.topScorer){
                tournament.topScorer = req.body.topScorer;
            }
            if(req.body.bestPlayer){
                tournament.bestPlayer = req.body.bestPlayer;
            }
            if(req.body.finalDate){
                tournament.finalDate = req.body.finalDate;
            }
            if(req.body.finalResult){
                tournament.finalResult = req.body.finalResult;
            }        
            tournament.save(function(err, updatedTournament){
                if(err){
                    response.status = 500;
                    response.massage = err;
                } else {
                    response.message = updatedTournament;
                }
                res.status(response.status).json(response.message);
            })
        }
    })
}
module.exports.deleteOneTournament = function(req, res){
    console.log("GetOne Request received");
    const tournamentId = req.params.tournamentId;
    // if(tournamentId != 24){
    //     res.status(400).json({"message": "RequestParam tournamentId is not correct"});
    //     return;
    // }
    Tournament.findByIdAndRemove(tournamentId).exec(function(err, deletedTournament){
        const response = {
            status: 204,
            message: deletedTournament
        } 
        if(err){
            console.log("Error finding tournament");
            response.status = 500;
            response.message = err;
        }else if(!deletedTournament){
            response.status = 404;;
            response.message = {"message": "tournament ID not found"}
        } 
        res.status(response.status).json(response.message);       
    })
}