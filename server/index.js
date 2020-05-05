const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */


/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.get('/genres', routes.getAllGenres);

/* ---- Q1b (Dashboard) ---- */
app.get('/genres/:genre', routes.getTopInGenre); // Hint: Replace () => {} with the appropriate route handler.

/* ---- Q2 (Recommendations) ---- */
app.get('/findmovies/:movieName', routes.getMovies);

/* ------get years -----------*/
app.get('/years', routes.getYear);

/* ---------get prizes data ------------*/
app.get('/years/:year', routes.AwardPerYear);

/* interesting fact 1 */
app.get('/oldestWinner', routes.getOldestWinner);
app.get('/youngestWinner', routes.getYoungestWinner);
app.get('/winFirstNomination', routes.getFirstNomination);
app.get('/win3awards', routes.getWin3awards);
app.get('/lowestRatingBestOscarStory', routes.getLowestRatingBestOscarStory);
app.get('/bestPicActorActressSameYear', routes.getBestPicActorActressSameYear);
app.get('/ageRange', routes.getAgeRange);

/* interesting fact 2*/
app.get('/leadingRole4times/:LeadingRole4timesChangeTime', routes.getLeadingRole4times);
app.get('/highestRatingWinNothing/:highestRatingWinNothingYear', routes.getHighestRatingWinNothingYear);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});