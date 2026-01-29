const twitch = require("./index");

console.log("[authMiddleware] Module loaded");

function twitchAuth(req, res) {
  console.log("[authMiddleware] twitchAuth called, query:", req.query);
  if (req.query.error) {
    this.rejectToken(req.query);

    return res.end(`
      <h1>Error! ${req.query.error_description}...</h1>
      <script>setTimeout(() => { window.location = '/' }, 5000);</script>
    `);
  }

  res.end(`
    <script>
      window.location = '/twitch-auth/set?' + window.location.hash.slice(1);
    </script>
  `);
}

function twitchAuthSet(req, res) {
  console.log("[authMiddleware] twitchAuthSet called, query:", req.query);
  res.end(`
    <h1>Logged-In! You can close this window :)</h1>
    <script>setTimeout(() => { window.location = '/' }, 5000);</script>
  `);

  this.resolveToken(req.query);
}

function authMiddleware(req, res, next) {
  if (req.path.includes("twitch-auth")) {
    console.log("[authMiddleware] Request path:", req.path);
  }
  if (req.path === "/twitch-auth") {
    twitchAuth.call(this, req, res);
  } else if (req.path === "/twitch-auth/set") {
    twitchAuthSet.call(this, req, res, next);
  }

  next();
}

module.exports = () => authMiddleware.bind(twitch.authProvider);
