const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('leaderboard', (err) => {
  if (err) {
    console.error('Error creating db', err);
  }
  db.run('DELETE from scores where average < 900 OR average is NULL;', (err) => {
    if (err) {
      console.error('Error', err);
    }
  });
});