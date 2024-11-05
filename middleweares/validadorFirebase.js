const admin = require("firebase-admin");

const validadorFirebase = async(req, res, next) => {
  const firebaseToken = req.headers["authorization"]?.replace("Bearer ", "");
  try {
    if (!firebaseToken) {
      return res.status(401).json({ ok: false, error: "Token no enviado" });
    }
    await admin
      .auth()
      .verifyIdToken(firebaseToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        next();
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ ok: false, error: "Token no enviado" });
  }
};

module.exports = {validadorFirebase}
