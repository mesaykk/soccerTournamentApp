angular.module("soccerTournament").factory("TournamentsDataFactory", TournamentsDataFactory)

function TournamentsDataFactory($http){

    return {
        getAll: getAllTournaments,
        getOne: getOneTournament,
        addOne: addOneTournament,
        deleteOne: deleteOneGame
    }

    function getAllTournaments(){
        return $http.get("/api/tournaments").then(complete).catch(failed);
    }
    function getOneTournament(id){
        return $http.get("/api/tournaments/"+id).then(complete).catch(failed);
    }
    function addOneTournament(tournament){
        return $http.get("/api/tournaments", tournament).then(complete).catch(failed)
    }
    function deleteOneGame(id){
        return $http.get("/api/tournaments" + id).then(complete).catch(failed)
    }
    function complete(response){
        return response.data
    }
    function failed(error){
        return error.status.statusText; 
    }
}