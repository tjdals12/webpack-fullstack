import request from 'supertest';
import { expect } from 'chai';
import { connect, close } from 'model';
import app from 'app';
import config from 'config';
import clc from 'cli-color';

const { port } = config;

describe(clc.bgGreen(clc.black('[TODO]')), () => {
    let id;

    before(done => {
        connect().then(type => {
            console.log(clc.yellow(`Connected ${type}`));

            app.listen(port, () => {
                console.log(`Server running at localhost:${port}`);
                done();
            });
        });
    });

    after(done => {
        close()
            .then(msg => {
                console.log(clc.yellow(msg));
                done();
            })
            .catch(err => console.error(err));
    });

    it('GET /api/todos', done => {
        request(app)
            .get('/api/v1/todos')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                expect(res.body).instanceOf(Array);
                expect(res.body).have.length(0);
                done();
            });
    });

    it('GET /api/todos', done => {
        request(app)
            .get(`/api/v1/todos/${id}`)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                expect(res.body._id).to.equal(id);
                done();
            });
    });
});
