var config = require('../../../config/config'),
	errorHandler = require('../errors.server.controller'),
    mongoose = require('mongoose'),
    Payment = mongoose.model('Payment'),
    Post = mongoose.model('Post'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    moment = require('moment'),
    request = require('request'),
    ejs = require("ejs"),
    path = require('path'),
    fs = require('fs');


var smtpTransport = nodemailer.createTransport(config.mailer.options);

var findAlmostExpiredPosts = function(){
    var day2 = moment().add(2,'days');
    var day4 = moment().add(4,'days');
    
    //warn user's poster which has only 3 days untill expire
    var quary  = {
        $and : [
            {'wanted.to' : { $gt : day2 , $lt : day4 } },
            { 'wanted.emailed.warning' : false }
        ]
    }
    Post.find(quary)
    .populate('writer')
    .exec(function(err, posts){
        posts.forEach(function(post){
            post.wanted.emailed.warning = true;
            post.save();
            ejs.renderFile(path.resolve(__dirname+'../../../views/email_templates/post-warning-expired-email.server.view.html'),{
                appName: config.app.appName,
                name : post.writer.firstName + ' ' + post.writer.lastName,
                post : post,
            }, function(err, emailHTML) {
                
                var mailOptions = {
                    to: post.writer.email,
                    from: config.mailer.from,
                    subject: 'Your post will be expired in 3days',
                    html: emailHTML
                };
                smtpTransport.sendMail(mailOptions);
            }); 

        })

    })

}

var findExpiredPosts = function(){
    
    var quary = {
        $and : [
            { 'wanted.emailed.expire' : false } ,
            { 'wanted.to' : { $lt : moment()} } 
        ]
    };

    Post.find(quary)
    .populate('writer')
    .exec(function(err, posts){
        posts.forEach(function(post){
            post.wanted.emailed.expire = true;
            post.wanted.status = 'Closed';
            post.reason = 'Expired';
            post.edit.editable = false;
            post.save();
            
            ejs.renderFile(path.resolve(__dirname+'../../../views/email_templates/post-expired-email.server.view.html'),{
                appName: config.app.appName,
                name : post.writer.firstName + ' ' + post.writer.lastName,
                post : post,
            }, function(err, emailHTML) {
                
                var mailOptions = {
                    to: post.writer.email,
                    from: config.mailer.from,
                    subject: 'Your post has expired',
                    html: emailHTML
                };
                smtpTransport.sendMail(mailOptions);
            });     


        })

    });

}
exports.checkExpire = function(){
    findAlmostExpiredPosts();
    findExpiredPosts();

}