const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');






 const register = async(req,res) => {
    try {
        const { name, email, password, role } = req.body;
        
        //1.Email tekshirish
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Bu email allaqachon ro'yhatdan o'tgan"
            });
        }

        //2.Parolni shifrlash
        const hashedPassword = await bcrypt.hash(password, 10);

        //3. User yaratish
        const user = await User.create({
            name, 
            email,
            password: hashedPassword,
            role
        });

        //4. Token yaratish
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            message: "Foydalanuvchi muvaffaqiyatli yaratildi", 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
        message: error.message
    });
 }
};

const login = async(req,res) => {
    try { 
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({message:'Foydalanuvchi topilmadi '});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message:`Parol noto'g'ri`})
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d'});
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });



    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { register, login }