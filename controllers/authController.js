const admin = require('firebase-admin')

const login = async(req, res)=>{

    const {firebaseToken} = req.body

    try {
        await admin.auth().verifyIdToken(firebaseToken).then(decodedToken => {
            const uid = decodedToken.uid
            res.json({ok: true})
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {login}