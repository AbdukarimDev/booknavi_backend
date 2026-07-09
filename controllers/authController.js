const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');






 const register = async(req,res) => {
    try {
        const { name, phone, password } = req.body;
        
     if (!/^01[0-9]{8,9}$/.test(phone)) {
    return res.status(400).json({ message: "Telefon raqam noto'g'ri formatda" });
}

// Parol uzunligini tekshirish
if (!password || password.length < 6) {
    return res.status(400).json({ message: "Parol kamida 6 belgi bo'lishi kerak" });
}

const existingUser = await User.findOne({ phone });
if (existingUser) {
    return res.status(400).json({
        message: "Bu raqam allaqachon ro'yxatdan o'tgan"
    });
}

        //2.Parolni shifrlash
        const hashedPassword = await bcrypt.hash(password, 10);

        //3. User yaratish
        const user = await User.create({
            name, 
            phone,
            password: hashedPassword,
        });

        //4. Token yaratish
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            message: "Foydalanuvchi muvaffaqiyatli yaratildi", 
            token,
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone
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
        const { phone, password } = req.body;

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({message:'Foydalanuvchi topilmadi '});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message:`Parol noto'g'ri`})
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d'});
        res.status(200).json({ token, user: { id: user._id, name: user.name, phone: user.phone } });



    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { register, login }