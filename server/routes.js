var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `
  SELECT DISTINCT year_film from Oscar;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
    var inputgenre = req.params.genre;
    var query = `
    SELECT DISTINCT year_film from Oscar;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Q2 (Recommendations) ---- */
function getOldestWinner(req, res) {
    var year = req.params.arg;
    var query = `
    SELECT nominee, COUNT(*) AS number
    FROM Oscar
    WHERE prize LIKE '%ACTOR%' AND NOT prize LIKE '%SUPPORTING%'
    AND win_flag = 'TRUE'
    GROUP BY nominee
    ORDER BY number DESC, year_film;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getFirstNomination(req, res) {
    var year = req.params.arg;
    var query = `
    select O.nominee from Oscar O, (select nominee, min(year_film) as first from Oscar
    where prize like '%ACTOR%' or prize like '%ACTRESS%' or prize like '%DIRECTING%'
    group by nominee) T1
    where O.nominee = T1.nominee
    and O.year_film = T1.first
    and O.win_flag = 'TRUE';
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- (Best Genres) ---- */
function getYear(req, res) {
	var query = `
    SELECT DISTINCT year_film AS year FROM Oscar
    ORDER BY year DESC;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {

      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function AwardPerYear(req, res) {
  var inputyear = req.params.year;
  var query = `
  SELECT prize, nominee, film_title FROM Oscar
  WHERE year_film = ${req.params.year}
  AND win_flag = 'TRUE';
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(query);
      res.json(rows);
    }
  });
};


function getMovies(req, res) {
  var inputMovie = req.params.movieName.replace(/_/g, ' ');

  var query =`SELECT title AS movieName, produce_year AS year, rating
  FROM Movies m
  WHERE m.title = '${inputMovie}';`
  ;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};


function getBestPicActorActressSameYear(req, res) {
  var inputYear = req.params.year;

  var query =`SELECT title AS movieName, produce_year AS year, rating
  FROM Movies m
  WHERE m.title = '${inputYear}';`;
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getOldestWinner: getOldestWinner,
  getFirstNomination: getFirstNomination,
	getYear: getYear,
  getMovies: getMovies,
  AwardPerYear: AwardPerYear,
  getBestPicActorActressSameYear: getBestPicActorActressSameYear
}