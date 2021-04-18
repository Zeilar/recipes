const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function authenticate(req, res) {
    const userSession = req.session.user;
    if (!userSession) {
        return res.sendStatus(401);
    }
    const user = await prisma.user.findUnique({ where: { id: userSession.id } });
    delete user.password;
    res.status(user ? 200 : 401);
    res.json(user);
}

function logout(req, res) {
    try {
        delete req.session.user;
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
}

async function login(req, res) {
    if (req.session.user) {
        return res.sendStatus(405);
    }

    const { username, password } = req.body;
    if (!username || !password) {
        return res.sendStatus(400);
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
        res.status(422);
        res.json({ message: "User does not exist" });
        return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
        delete user.password;
        req.session.user = user;
        res.redirect("/");
    } else {
        res.status(422);
        res.json({ message: "Incorrect password" });
    }
}

module.exports = {
    logout,
    login,
    authenticate,
};
