const router = require('express').Router();
const { body, validationResult } = require('express-validator');

router.get(
    '/register',
    (req, res, next) => req.guards.isGuest(req, res, next),
    (req, res) => {
        res.render('register', { title: 'Register' });
    });

router.post(
    '/register',
    (req, res, next) => req.guards.isGuest(req, res, next),
    body('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long').bail()
        .matches(/[a-zA-z0-9]/).withMessage('Username may contain only latin letters or numbers'),
    body('password')
        .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
        .matches(/[a-zA-z0-9]/).withMessage('Password may contain only latin letters or numbers'),
    body('repass').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords don\'t match');
        }

        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                const message = Object.values(errors).map(e => e.msg).join('\n');
                throw new Error(message);
            }

            await req.auth.register(req.body.username.trim(), req.body.password.trim());
            res.redirect('/');
        } catch (err) {
            console.log(err.message);

            const ctx = {
                title: 'Register',
                errors: err.message.split('\n'),
                username: req.body.username
            };

            res.render('register', ctx);
        }
    });

router.get(
    '/login',
    (req, res, next) => req.guards.isGuest(req, res, next),
    (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post(
    '/login',
    (req, res, next) => req.guards.isGuest(req, res, next),
    async (req, res) => {
        try {
            await req.auth.login(req.body.username.trim(), req.body.password.trim());
            res.redirect('/');
        } catch (err) {
            console.log(err.message);

            let errors = [err.message];

            if (err.type == 'credential') {
                errors = ['Incorrect username or password'];
            }

            const ctx = {
                title: 'Login',
                errors,
                username: req.body.username
            };

            res.render('login', ctx);
        }
    });

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;