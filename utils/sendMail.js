const nodemailer =require('nodemailer');

const sendMail = async(options)=>{
    try{
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE_PROVIDER,
            auth:{
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });
    
    const message = {
        from: `${process.env.FROM_NAME}`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    const info = await transporter.sendMail(message);

    }catch(err){
        console.log(err) 
    }
}

module.exports = sendMail;