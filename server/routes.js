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


function getYoungestWinner(req, res) {
    var year = req.params.arg;
    var query = `
    SELECT O.nominee, O.year-P.birth AS age
    FROM Oscar O
    JOIN People P on O.nominee = P.name
    WHERE O.prize LIKE '%ACTOR%' AND NOT O.prize LIKE '%SUPPORTING%'
    AND O.win_flag = 'TRUE'
    AND O.year - P.birth <= 35
    ORDER BY age;
  `;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getLeadingRole4times(req, res) {
  var time = req.params.LeadingRole4timesChangeTime;
  var query = `SELECT O.nominee, COUNT(*) AS number
  FROM Oscar O
  WHERE O.nominee NOT IN 
  (SELECT DISTINCT nominee FROM Oscar
  WHERE prize LIKE '%ACTOR%' AND NOT prize LIKE '%SUPPORTING%'
  AND win_flag = 'TRUE')
  AND O.prize LIKE '%ACTOR%' AND NOT O.prize LIKE '%SUPPORTING%'
  GROUP BY O.nominee
  HAVING number >= '${time}'
  ORDER BY number DESC; `
;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};



function getWin3awards(req, res) {
    var year = req.params.arg;
    var query = `
    SELECT m.title 
    FROM Movies m
    WHERE m.title IN (SELECT film_title AS title FROM Oscar WHERE win_flag = 'TRUE')
    AND m.title IN (SELECT film_title AS title FROM Golden WHERE win_flag = 'TRUE') 
    AND m.title IN (SELECT nominee AS title FROM British WHERE win_flag = 'TRUE'); 
  `;
  console.log(query);
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
  console.log(query);
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
  var inputYear = req.params.BestPicActorActressSameYear;

  var query =`with temp as
  ((select film_title, year_film from Oscar
  where prize like '%BEST PICTURE%'
  and win_flag = 'TRUE'
  and year_film > 1944) UNION
  (select film_title, year_film from Oscar
  where prize like '%OUTSTANDING%' AND prize like '%PRODUCTION%'
  and win_flag = 'TRUE'
  and year_film <= 1941) UNION
  (select film_title, year_film from Oscar
  where prize like '%OUTSTANDING%' AND prize like '%PICTURE%'
  and win_flag = 'TRUE'
  and year_film <= 1944))
  select * from 
  (select film_title, year_film from Oscar
  where prize like '%ACTOR%' and not prize like '%SUPPORTING%'
  and win_flag = 'TRUE'
  and (film_title, year_film) in 
  (select film_title, year_film from Oscar
  where prize like '%ACTRESS%' and not prize like '%SUPPORTING%'
  and win_flag = 'TRUE')) A
  where (film_title, year_film) in (select * from Temp);
`;

  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};



function getHighestRatingWinNothingYear(req, res) {
  var inputYear = req.params.highestRatingWinNothingYear;

  var query =`WITH highest_rating AS (
  SELECT m.title FROM Movies m, (SELECT MAX(rating) AS rating FROM Movies WHERE year = '${inputYear}' ) a WHERE m.year = '${inputYear}' AND m.rating = a.rating) 
  SELECT h.title 
  FROM highest_rating h 
  WHERE h.title NOT IN (
  SELECT film_title AS title FROM Oscar o WHERE o.win_flag = 'TRUE' AND o.year_film = '${inputYear}') 
  AND h.title NOT IN (
  SELECT g.film_title FROM Golden g WHERE g.win_flag = 'TRUE' AND g.year_film = '${inputYear}') 
  AND h.title NOT IN (
  SELECT b.nominee FROM British b WHERE b.win_flag = 'TRUE' AND b.year_film = '${inputYear}');

`;
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};


function getLowestRatingBestOscarStory(req, res) {
  var inputYear = req.params.highestRatingWinNothingYear;

  var query =`SELECT m.title, AVG(m.rating) as rating 
  FROM Movies m, Oscar o 
  WHERE m.title = o.film_title 
  AND o.prize = 'WRITING (ORIGINAL SCREENPLAY)' 
  AND win_flag = 'TRUE' 
  GROUP BY m.title
  ORDER BY m.rating 
  LIMIT 10;

`;
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};



function getAgeRange(req, res) {
  var inputYear = req.params.highestRatingWinNothingYear;

  var query =`SELECT concat(FLOOR((O.year-P.birth)/10)*10, 's') AS age, count(*) AS number
  FROM Oscar O JOIN People P on O.nominee = P.name
  WHERE P.birth <> 0
  AND O.year-P.birth>0
  AND O.year-P.birth<100
  AND O.win_flag = 'True'
  GROUP BY age
  ORDER BY count(*) DESC
  LIMIT 10;

`;
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};



function getAnimation(req, res) {
  var inputYear = req.params.AnimationYear;

  var query =`SELECT DISTINCT O.film_title 
  FROM Oscar O, Golden G WHERE O.prize LIKE '%ANIMATED FEATURE FILM%' 
  AND G.prize LIKE '%Animated%'
  AND O.film_title = G.nominee
  AND O.year_film > 2000 AND G.year_film > 2000 
  AND O.win_flag = 'TRUE' AND G.win_flag = 'FALSE'
  AND O.year_film = '${inputYear}'
  ORDER BY O.year_film;
`;
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};



function getOscarWhichGenre(req, res) {
  var inputYear = req.params.AnimationYear;

  var query =`SELECT G.genre, COUNT(*) AS number
  FROM Oscar O
  JOIN Movies M on M.title = O.film_title
  JOIN Genre G on M.id = G.id
  WHERE O.prize LIKE "%Best Picture%"
  GROUP BY G.genre
  ORDER BY number DESC;
`;
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};



function getOscarAwardWhichGenre(req, res) {
  var inputYear = req.params.AnimationYear;

  var query =`SELECT G.genre, COUNT(*) AS number
  FROM Oscar O
  JOIN Movies M on M.title = O.film_title
  JOIN Genre G on M.id = G.id
  WHERE O.prize LIKE "%Best Picture%"
  AND O.win_flag = "True"
  GROUP BY G.genre
  ORDER BY number DESC;
`;
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};



function getOscarDirectorActor(req, res) {
  var inputYear = req.params.AnimationYear;

  var query =`SELECT M.title, P.name
  FROM Movies M
  JOIN Crew C on C.movie_id = M.id
  JOIN People P on P.name_id = C.name_id
  WHERE C.category = "actor" 
  AND (P.name, M.title) in (SELECT DISTINCT nominee, film_title
  FROM Oscar
  WHERE prize LIKE "Directing"
  AND win_flag = "True");
`;
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};



function getGoldenDirectorActor(req, res) {
  var inputYear = req.params.AnimationYear;

  var query =`SELECT M.title, P.name
  FROM Movies M
  JOIN Crew C on C.movie_id = M.id
  JOIN People P on P.name_id = C.name_id
  WHERE C.category = "actor" 
  AND (P.name, M.title) in (SELECT DISTINCT nominee, film_title
  FROM Golden
  WHERE prize LIKE "%Director%"
  AND win_flag = "True");
`;
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
  getYoungestWinner: getYoungestWinner,
  getFirstNomination: getFirstNomination,
  getLeadingRole4times: getLeadingRole4times,
  getWin3awards: getWin3awards,
  getLowestRatingBestOscarStory: getLowestRatingBestOscarStory,
	getYear: getYear,
  getMovies: getMovies,
  AwardPerYear: AwardPerYear,
  getBestPicActorActressSameYear: getBestPicActorActressSameYear,
  getHighestRatingWinNothingYear: getHighestRatingWinNothingYear,
  getAgeRange: getAgeRange,
  getAnimation: getAnimation,
  getOscarWhichGenre: getOscarWhichGenre,
  getOscarAwardWhichGenre: getOscarAwardWhichGenre,
  getOscarDirectorActor: getOscarDirectorActor,
  getGoldenDirectorActor: getGoldenDirectorActor
}