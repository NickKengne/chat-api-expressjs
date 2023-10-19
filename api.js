/**
 * @Snickeedev Developpeur fullstack junior
 */


const express = require('express');
const mongoose = require('mongoose');
const argon = require('argon2')
const jwt = require('jsonwebtoken')
const cors = require('cors')


// Import des modèles
const User = require('./models/UserModel');
const Conversation = require('./models/ConversationModel');
const Message = require('./models/MessagesModel');

// Import des controllers
const userController = require('./controller/userController');
const conversationController = require('./controller/conversationController');
const messageController = require('./controller/messagesController');

// Configuration d'Express
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'https://localhost:3000' // Remplacez par votre domaine autorisé
  }));


// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/chatdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

// Routes pour les utilisateurs
app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUserById);
app.delete('/users/:id', userController.deleteUserById);

// Routes pour les conversations
app.post('/conversations', conversationController.createConversation);
app.get('/conversations', conversationController.getAllConversations);
app.get('/conversations/:id', conversationController.getConversationById);
app.put('/conversations/:id', conversationController.updateConversationById);
app.delete('/conversations/:id', conversationController.deleteConversationById);

// Routes pour les messages
app.post('/messages', messageController.createMessage);
app.get('/messages', messageController.getAllMessages);
app.get('/messages/:id', messageController.getMessageById);
app.get('/message/:id', messageController.getMessageByUserId);
app.put('/messages/:id', messageController.updateMessageById);
app.delete('/messages/:id', messageController.deleteMessageById);


// Endpoint d'inscription
app.post('/signup', async (req, res) => {
    try {
        const {  username,name, email, password ,avatar,bio} = req.body;
        // Chiffrement du mot de passe avec Argon2
        const hashedPassword = await argon.hash(password);
        const newUser = new User({username,name, email, password: hashedPassword,avatar,bio });
        await newUser.save();
        res.status(200).json({ user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint de connexion
app.post('/login', async (req, res) => {
    try {
        const { email ,password } = req.body;
        console.log(req.body)
        const user = await User.find({ "email" : email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (await argon.verify(user[0].password, password)) {
            // Génération du token JWT
            const token = jwt.sign({ userId: user._id }, 'secret_key');
           return  res.status(200).json({ user, token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
        // Génération du token JWT
        const token = jwt.sign({ userId: user._id }, 'secret_key');

        res.status(200).json({ user, token });
        console.log({ user, token }) 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Port d'écoute du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
