const { db } = require('../database')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'halo.parselio@gmail.com',
        pass: 'Purwadhika1'
    }
});

module.exports = {
    register: (req, res) => {

        let userQuery = `select * from  users where email = '${req.body.email}';`;
        db.query(userQuery, (err, results) => {
            if (err) { 
                res.status(500).send(err);
            } else {
                if (results.length !== 0) {
                    return res.status(200).send("email telah terdaftar");
                }
                let newPassword = '';
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        newPassword = hash;
                        let scriptQuery = `insert into users (email, password) values ('${req.body.email}', '${newPassword}');`
                        db.query(scriptQuery, (err, results) => {

                            if (err) {
                                res.status(500).send(err);
                            } else {
                                var payload = {
                                    email: req.body.email,
                                }

                                jwt.sign(
                                    payload,
                                    "secret",
                                    {
                                        expiresIn: 31556926, 
                                    },
                                    (err, token) => {
                                        var mailOption = {
                                            from: 'wiwagus15@gmail.com',
                                            to: req.body.email,
                                            subject: 'contoh aja pak',
                                            html: `silahkan aktivasi akun melalui halaman <a href="http://localhost:3000/verifikasi/${token}">ini</a>`
                                        }

                                        transporter.sendMail(mailOption, (err, info) => {
                                            if (err) res.status(500).send(err);
                                            console.log('email sent ');
                                            return res.json({
                                                success: true,
                                                token: "Bearer " + token,
                                            });
                                        })
                                    }
                                );
                            }
                        })
                    });
                });
            }
        })

    }
}