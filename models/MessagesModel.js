const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true },
    attachments: [{ type: String }], // Tableau d'URLs des pièces jointes
    // ... autres champs comme les réactions aux messages, etc.
}, { timestamps: true });

const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;
