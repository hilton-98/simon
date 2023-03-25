const express = require('express');
const app = express();

const DEFAULT_PORT_NUM = 3000;

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : DEFAULT_PORT_NUM;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = exppress.Router();
app.use('/api', apiRouter);

// GetScores
apiRouter.get('/scores', (_req, res) => {
    res.send(scores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
scores = updateScores(req.body, scores);
res.send(scores);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Start listening for requests
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];
const MAX_NUM_SCORES = 10;

function updateScores(newScore, scores) {

  let found = false;

  for (const [i, prevScore] of scores.entries()) {

    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > MAX_NUM_SCORES) {
    scores.length = MAX_NUM_SCORES;
  }

  return scores;
}