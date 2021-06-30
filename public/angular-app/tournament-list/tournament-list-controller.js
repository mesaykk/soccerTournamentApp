angular.module("soccerTournament").controller("TournamentsController", TournamentsController)

function TournamentsController(TournamentsDataFactory){
    const vm=this;
    vm.title="MEAN Tournaments app";
    TournamentsDataFactory.getAll().then(function(response){
        vm.tournaments = response;
    })
}