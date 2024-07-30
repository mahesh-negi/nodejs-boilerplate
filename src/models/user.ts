import mongoose, { Document, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getIpFromRequest, getUserAgentFromRequest } from '../utils/common';

dotenv.config();

interface User extends Document {
    name: string;
    email: string;
    role: string;
    password: string;
    isDeleted: Boolean;
}

interface UserModelInterface extends Model<User> {
    generatePasswordHash(plainTextPassword: string): Promise<string>;
    validatePassword(candidatePassword: string): Promise<string>;
}

const modelSchema = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            default: null,
        },
        password: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

modelSchema.statics.generatePasswordHash = (plainTextPassword: string) => {
    return bcrypt.hashSync(plainTextPassword, 10);
};

modelSchema.methods.validatePassword = async function (
    candidatePassword: string
) {
    const result = await bcrypt.compare(candidatePassword, this.password);
    return result;
};

modelSchema.methods.loginToken = async function (req: any, loginType = 'password') {
    const secret = process.env.JWT_SECRET || 'default-secret';
    let loginToken = jwt.sign(
        {
            _id: this._id,
        },
        secret,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
    return loginToken;
};

modelSchema.plugin(mongoosePaginate);
const UserModel = mongoose.model<User, UserModelInterface>(
    'users',
    modelSchema
);

export default UserModel;
