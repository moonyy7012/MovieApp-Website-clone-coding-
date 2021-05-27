const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        // objectid 하나만 있으면 user의 모든 정보 가져올 수 있음
        //ref의 User는 User.js임
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
},{timestamps: true}) //timestamps -> 생성된 시간 자동으로 처리






const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }