import { haveValue } from './common';
import bcrypt from 'bcrypt';
import moment from 'moment';
const crypto = require('crypto');

export function formatDate(date: string | number | Date): string {
    return new Date(date).toLocaleString().split(',')[0];
}

export function generateRandom6DigitNumber() {
    return crypto.randomInt(100000, 1000000).toString();
}

export const generatePasswordHash = (plainTextPassword: string) => {
    return bcrypt.hashSync(plainTextPassword, 10);
};


