angular.module("soccerTournament").factory("TournamentsDataFactory", TournamentsDataFactory)

function TournamentsDataFactory($http){

    return {
        getAll: getAllTournaments,
        getOne: getOneTournament
    }

function getAllTournaments(){
    return $http.get("/api/tournaments").then(complete).catch(failed);
}
function getOneTournament(){
    return $http.get("/api/tournaments/"+id).then(complete).catch(failed);
}
function complete(response){
    return response.data
}
function failed(error){
    return error.status.statusText; 
}
}