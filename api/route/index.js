const express = require("express");

const tournamentController = require("../controllers/tournamentController");
const finalistController = require("../controllers/finalistController");


//Tournament Routes
const router = express.Router();

router.route("/tournaments")
    .get(tournamentController.getAllTournaments)
    .post(tournamentController.addTournament)
router.route("/tournaments/:tournamentId")
    .get(tournamentController.getOneTournament)
    .put(tournamentController.updateOneFullTournament)
    .patch(tournamentController.parialUpdate)
    .delete(tournamentController.deleteOneTournament);

router.route("/tournaments/:tournamentId/finalist")
    .get(finalistController.getOneFinalist)
    .post(finalistController.addFinalist);

module.exports = router;