const mongoose = require("mongoose")
const crypto = require("crypto")
const { schedulingPolicy } = require("cluster")

const schemaRecord = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    record: {
        type: Number,
        required: true
    },
    token: {
        type: String
    }

}, {
    timestamps: true
})

schemaRecord.pre('save', (next) => {
    if(!this.token){
        this.token = crypto.randomBytes(64).toString('hex')
        next(null)
    }
    next(null)
})

module.exports = mongoose.model('Recorde', schemaRecord)