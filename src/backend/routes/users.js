const router = require('express').Router();
let User = require('../models/user.model');

router.route('/login').get(async function(req, res) {
    console.log(req.headers);
    const filter = {username: req.headers.username, password: req.headers.password}
    const user = await User.findOne(filter, 'username').exec();
    console.log(user);
    res.send(user);

});

router.route('/getUsernames').get(async function(req, res) {
    const users = await User.find(undefined, 'username').exec();
    res.send(users);

});
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
    .then(() => res.json('User added!'));
});

module.exports = router;