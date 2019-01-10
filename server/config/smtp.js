let nodeMailer = require('nodemailer');

/**
 * SMTP config, Change it to your SMTP account
 */
smtp = nodeMailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'uha4.0@hotmail.com',
        pass: 'uha40kikoo'
    }
});

/**
 * @param mailTo
 * @param mailSubject
 * @param mailContent
 * @returns {{subject: *, from: string, html: string, to: *, text: *}}
 */
module.exports = function createMail(mailTo, mailSubject, mailContent) {

    return {
        from: 'UHA 4.0 - <uha4.0@hotmail.com>',
        to: mailTo,
        subject: mailSubject,
        text: mailContent,
        html: '<p>' + mailContent + '</p>'
    };
};