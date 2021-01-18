import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const tokenPrivateKey = `${process.env.JWT_TOKEN_PRIVATE_KEY}`;
const refreshTokenPrivateKey =  `${process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY}`;

const options = { expiresIn: '120 minutes' };
const refreshOptions = { expiresIn: '12 hours' };


export = {
    generateJwt(payload :any) {
        return jwt.sign(payload, tokenPrivateKey, options);
    },
    
    verifyJwt (token :any)  {
        return jwt.verify(token, tokenPrivateKey )
    },
        
    generateRefreshJwt (payload :any) {
        return jwt.sign(payload, refreshTokenPrivateKey, options);
    },
    
    verifyRefreshJwt (token :any) {
        return jwt.verify(token, refreshTokenPrivateKey )
    }
}

