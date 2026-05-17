import nodemailer from 'nodemailer';

export const sendPremiumWelcomeEmail = async (userEmail, username) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your preferred provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Welcome to Premium!',
            text: `Hello ${username},\n\nYour payment was successful. You are now a Premium Member! Thank you for your subscription.`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Premium confirmation email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};