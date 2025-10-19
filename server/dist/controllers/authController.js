"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtUtils_1 = require("../utils/jwtUtils");
const login = async (req, res) => {
    const { email, password } = req.body;
    const prisma = req.prisma;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !bcryptjs_1.default.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = (0, jwtUtils_1.generateToken)({ id: user.id, role: user.role });
    res.json({ token, role: user.role, name: user.name });
};
exports.login = login;
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const prisma = req.prisma;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
        return res.status(400).json({ message: 'User exists' });
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, role: role.toUpperCase() },
    });
    const token = (0, jwtUtils_1.generateToken)({ id: user.id, role: user.role });
    res.json({ token, role: user.role, name: user.name });
};
exports.register = register;
const getMe = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    res.json({ name: user?.name, role: user?.role });
};
exports.getMe = getMe;
//# sourceMappingURL=authController.js.map