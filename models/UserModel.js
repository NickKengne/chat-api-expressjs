const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        lastOnline: { type: Date, default: null }, // Date de la dernière connexion
        online: { type: Boolean, default: false }, // Statut ci en ligne
        avatar: {type: String, default : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"},
        bio: {type: String ,default : "Membre chez Chat-Friend"}
    },
    {
        timestamps: true
    }
);

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
