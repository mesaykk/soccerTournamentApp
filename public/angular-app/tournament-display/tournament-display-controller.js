angular.module("soccerTournament").controller("TournamentController", TournamentController)

function TournamentController(TournamentsDataFactory, $routeParams){
    const vm = this;
    const tournamentId = $routeParams.id;
    TournamentsDataFactory.getOne(tournamentId).then(function(response){
        vm.tournament = response;
    })
    vm.removeTournament= function(){

        if(tournamentId){
            TournamentsDataFactory.deleteOne(tournamentId).then(function(response){
                console.log("Tournament removed");
            }).catch(function(error){
                console.log("Error while removing ", error);
            })
        }

    }
    
}

