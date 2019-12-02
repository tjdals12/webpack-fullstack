import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import config from 'config';

const { env, dbUri, dbUser, dbPass } = config;

export const connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;

        if (env === 'test') {
            const mockgoose = new Mockgoose(mongoose);

            mockgoose.prepareStorage().then(() => {
                mongoose
                    .connect(dbUri, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useCreateIndex: true,
                    })
                    .then(() => resolve('Mockgoose'))
                    .catch(err => reject(err));
            });
        } else {
            mongoose
                .connect(dbUri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    user: dbUser,
                    pass: dbPass,
                })
                .then(() => resolve('Mongoose'))
                .catch(err => reject(err));
        }
    });
};

export const close = () => {
    return new Promise((resolve, reject) => {
        if (env === 'test') new Mockgoose(mongoose).helper.reset();

        return mongoose
            .disconnect()
            .then(() =>
                resolve(
                    `Disconnect ${env === 'test' ? 'Mockgoose' : 'Mongoose'}`,
                ),
            )
            .catch(err => reject(err));
    });
};
