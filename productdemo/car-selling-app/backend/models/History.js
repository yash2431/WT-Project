// src/models/History.js
const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Car' },
    make:{type:String,required:true,ref:'Car'},
    model:{type:String,required:true,ref:'Car'},
    description: { type: String,required:true,ref:'Car' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', HistorySchema);
