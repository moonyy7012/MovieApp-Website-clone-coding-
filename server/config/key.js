// 프로덕션 모드에서 쓰이는 변수 -> prod.js
// 로컬 모드에서 쓰이는 변수 -> dev.js

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}