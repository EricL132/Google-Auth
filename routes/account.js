const router = require('express').Router()
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '312343859144-i8hq2j39mjn93m3ko9dujnn411dqgdiv.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);


async function verify(token) {
    const user = {}
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, 
    });
    const payload = ticket.getPayload();
    user.name = payload.name
    user.email = payload.email
    user.picture = payload.picture
    return user
  }


router.post('/login',(req,res)=>{
    const token = req.body.token
   
    verify(token).then(async()=>{
        res.cookie('session-token',token)
        res.send({status:'success'})
    }).catch(err=>res.status(400).end());
})
router.get('/userinfo',checkAuth,(req,res)=>{
    let user = req.user
    res.send({info:user})
})

router.get('/logout',(req,res)=>{
    res.clearCookie('session-token')
    res.send({status:"Logged out"})
})

function checkAuth(req,res,next){
    const token =req.cookies['session-token']

    verify(token).then((user)=>{
        req.user = user
        next()
    }).catch(err=>res.status(400).end());
}


module.exports = router