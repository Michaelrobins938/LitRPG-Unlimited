const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const socketIO = require('socket.io');
const http = require('http');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const User = require('./models/User');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { authenticate, generateAuthToken } = require('./middleware/auth');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Use routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('completeQuest', async (data) => {
        const user = await User.findById(data.userId);
        const quest = await Quest.findById(data.questId);

        user.quests = user.quests.map(q => q.questId.toString() === data.questId ? { ...q, status: 'complete' } : q);
        user.experience += quest.expReward;

        const levelUpExp = 100 * user.level;
        while (user.experience >= levelUpExp) {
            user.experience -= levelUpExp;
            user.level += 1;
        }

        await user.save();
        io.emit('profileUpdated', user);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
