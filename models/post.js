var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var postSchema = new Schema({
    autor: {type: String, max: 30, required: true},
    title: {type: String, uppercase: true, max: 80, required: true},
    text: {type: String, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
},{ timestamps: { createdAt: 'created_at' } });



module.exports = mongoose.model('Post', postSchema);
