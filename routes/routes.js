const favs = require('../api/favs');
const authLocal = require('../auth/local');
const user = require('../api/user');

function routes(app){
    app.use('/api/favs', favs);
    app.use('/api/user', user);
    app.use('/auth/local', authLocal);
}
module.exports = routes;
