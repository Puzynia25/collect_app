const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");

const generateJwt = (id, name, email, role) => {
    return jwt.sign({ id, name, email, role }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
};

class UserController {
    async registration(req, res, next) {
        const { name, email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest("Invalid password or login"));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest("This email already exists"));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            name,
            email,
            role,
            password: hashPassword,
        });
        const token = generateJwt(user.id, user.name, user.email, user.role);
        return res.json({ token });
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return next(ApiError.badRequest("User is not found"));
        }

        // if (user.status === "blocked") {
        //     return next(ApiError.unauthorized("Your account is blocked!"));
        // }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest("Wrong password"));
        }

        const token = generateJwt(user.id, user.name, user.email, user.role);
        return res.json({ token });
    }

    async getAll(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }

    // async updateUsersStatus(req, res, next) {
    //     const { ids, status } = req.body;
    //     await User.update({ status }, { where: { id: ids } });
    //     return res.status(204).send();
    // }

    async delete(req, res, next) {
        const { id } = req.body;
        const deletedUser = await User.destroy({ where: { id } });

        if (deletedUser === 0) {
            return next(ApiError.badRequest("User is not found"));
        }

        return res.status(204).send();
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();
