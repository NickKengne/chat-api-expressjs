const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    name: {type: String , default : null}, // Nom de la conversation de groupe (facultatif)
}, { timestamps: true });

const Conversations = mongoose.model('Conversations', conversationSchema);

module.exports = Conversations;
