const nodemailer = require('nodemailer') 

exports.SendActivationMail = async(to, link) => {
    const transporter = nodemailer.createTransport({
        host:  process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: to,
        subject: 'Account activation',
        text: '',
        html:
        ` 
            <div>
                <h1>Для активаций пройдите по ссылке</h1>
                <a href='${link}'>${link}</a>
            </div>
        `
    })
}

