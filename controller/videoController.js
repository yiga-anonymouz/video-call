const ejs = require('ejs')

const index = (req , res) => {
    res.render('index', {RoomId:req.params.room})
}

module.exports = {
    index
}