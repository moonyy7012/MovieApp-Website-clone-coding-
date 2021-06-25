const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

// client에서 post로 보냈기 때문에 여기서도 post. 또한 endpoint도 그대로 써주는데 이 router가 express.Router()에서 가져온 것이므로 앞의 부분 /api/favorite를 떼어서 index.js에 따로 선언해줘도 됨.
// client에서 보낸 variables를 받기 위해서는 아래와 같이 req, res 필요. 아래는 movieId받아주었음. index.js에 bodyParser가 있으므로 req.body 쓰는 게 가능
router.post('/favoriteNumber', (req, res)=>{
    

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId": req.body.movieId})
        .exec((err, info)=>{
            if(err) return res.status(400).send(err)
                //그다음에 프론트에 다시 숫자 정보를 보내주기
            // 200은 정상을 나타냄. 좋아요 갯수 갖고 오면 되기 때문에 info.length
            res.status(200).json({success: true, favoriteNumber: info.length})
        })
})

module.exports = router;
