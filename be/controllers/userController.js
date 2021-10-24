const { db } = require('../database')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

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
                                            from: 'halo.parselio@gmail.com',
                                            to: req.body.email,
                                            subject: 'Aktivasi akun Parselio',
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

    },
    login: (req, res) => {
        let scriptQuery = `select * from users where email = '${req.body.email}';`

        db.query(scriptQuery, (err, results) => {
           
            if (results.length === 0) {
                return res.status(200).send("notfound");
            }
            if (results[0].isverified === 0) {
                return res.status(200).send("notactive");
            }
            bcrypt.compare(req.body.password, results[0].password).then((isMatch) => {
                if (isMatch) {
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
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                            });
                        }
                    );
                } else {
                    return res.status(200).send("notmatch");
                }
            })
        })
    },
    verifikasi: (req, res) => {
        let scriptQuery = `update users set isverified = 1 where email = '${req.body.email}';`
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    reset: (req, res) => {
        newPassword = '';
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                newPassword = hash;
                let scriptQuery = `update users set password = '${newPassword}' where email = '${req.body.email}';`
                db.query(scriptQuery, (err, results) => {
                    if (err) res.status(500).send(err)
                    res.status(200).send(results)
                })
            })
        });
    },
    share: (req, res) => {
        var payload = {
            email: req.body.email,
           
        }
        console.log(req.body.email);
        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: 31556926, 
            },
            (err, token) => {
                var mailOption = {
                    from: 'halo.parselio@gmail.com',
                    to: req.body.email,
                    subject: 'Reset password',
                    html: `silahkan reset password melalui halaman <a href="http://localhost:3000/reset/${token}">ini</a>`
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
    },
    updateProfile: (req, res) => {
        let scriptQuery = `update users set 
            fullname = '${req.body.fullname}',
            address = '${req.body.address}',
            gender = '${req.body.gender}',
            age = '${req.body.age}'
            where email = '${req.body.email}';`

        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
        console.log("query success")
    },
    updateProfilImage: (req, res) => {
        let scriptQuery = `update users set 
        fullname = '${req.body.fullname}',
        address = '${req.body.address}',
        gender = '${req.body.gender}',
        age = '${req.body.age}',
        images = '${req.file.path}'
        where email = '${req.body.email}';`
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
        console.log("query success")
    },
    
    getUser: (req, res) => {
        let scriptQuery = `select * from users where email = '${req.body.email}';`
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    }
}