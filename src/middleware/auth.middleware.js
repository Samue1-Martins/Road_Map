import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    const SECRET_KEY = process.env.JWT_SECRET;

    jwt.verify(token, SECRET_KEY, (err, decoded) => {

        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado. Faça login novamente.' });
        }

        req.userId = decoded.id
        next();
    });
}