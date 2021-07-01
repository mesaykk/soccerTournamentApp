angular.module("soccerTournament").controller("TournamentsController", TournamentsController)

function TournamentsController(TournamentsDataFactory){
    const vm=this;
    vm.title="MEAN Tournaments app";
    TournamentsDataFactory.getAll().then(function(response){
        vm.tournaments = response;
    })
    vm.addTournament = function(){
        const postData ={
            title: vm.newTournamentTitle,
            hostCountry: vm.newTournamentHostCountry,
            bestPlayer: vm.newTournamentBestPlayer,
            topScorer: vm.newTournamentTopScorer,
            champions: vm.newTournamentChampions,
            finalDate: vm.newTournamentFinalDate,
            finalResult: vm.newTournamentFinalResult,
            numTeams: vm.newTournamentNumTeams,
            
        };
        if(vm.tournamentForm.$valid){
            TournamentsDataFactory.addOne(postData).then(function(response){
                console.log("Tournament saved");

            }).catch(function(error){
                console.log("Error while saving ", error);
            })
        }
    }
    
}