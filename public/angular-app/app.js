angular.module("soccerTournament", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angular-app/tournament-list/tournament-list.html",
        controller: "TournamentsController",
        controllerAs: "vm"
    }).when("/tournamets/:id", {
        templateUrl:"angular-app/tournament-display/tournament.html",
        controller: "TournamentController",
        controllerAs: "vm"
    })
}