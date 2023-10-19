const ConversationModel = require('../models/ConversationModel')


// Create a new conversation
exports.createConversation = async (req, res) => {
    try {
        const newConversation = new ConversationModel(req.body);
        await newConversation.save();
        res.status(201).json(newConversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all conversations
exports.getAllConversations = async (req, res) => {
    try {
        const conversations = await ConversationModel.find();
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get conversation by ID
exports.getConversationById = async (req, res) => {
    try {
        const conversation = await ConversationModel.findById(req.params.id);
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update conversation by ID
exports.updateConversationById = async (req, res) => {
    try {
        const updatedConversation = await ConversationModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedConversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json(updatedConversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete conversation by ID
exports.deleteConversationById = async (req, res) => {
    try {
        const deletedConversation = await ConversationModel.findByIdAndDelete(req.params.id);
        if (!deletedConversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
