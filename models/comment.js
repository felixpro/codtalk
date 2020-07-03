var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    autor: {type: String, max: 30, required: true},
    text: {type: String, required: true}
},{ timestamps: { createdAt: 'created_at' } });



module.exports = mongoose.model('Comment', commentSchema);
