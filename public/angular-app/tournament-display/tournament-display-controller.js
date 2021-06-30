angular.module("soccerTornament").controller("TournamentController", TournamentController)

function TournamentController(TournamentsDataFactory, $routeParams){
    const vm = this;
    const tournamentId = $routeParams.id;
    TournamentsDataFactory.getOne(tournamentId).then(function(response){
        vm.tournament = response;
    })
    
}