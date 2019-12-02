import { connect } from 'model';
import app from 'app';
import config from 'config';

const { port } = config;

connect().then(type => {
    console.log(`Connected ${type}`);

    app.listen(port, () => {
        console.log(`Server running at localhost:${port}`);
    });
});
