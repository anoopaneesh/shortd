import { Injectable } from "@nestjs/common"; 
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";
import * as nodemailer from 'nodemailer'


@Injectable()
export class EmailService {
    transporter: nodemailer.Transporter
    constructor(
        private logger: Logger,
        private configService: ConfigService
    ) {
        this.transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: this.configService.get("email.user"),
                pass: this.configService.get("email.password")
            },
        });

    }

    public async sendMail(payload: nodemailer.SendMailOptions) {
        try {
            this.logger.log('Started to send mail')
            const info = await this.transporter.sendMail(payload);
            this.logger.log("Successfully sent mail")
        } catch (error) {
            this.logger.error("Error while sending mail", error.message)
            throw error
        }
    }

    public async sendEmailVerify(email: string, verifyToken: string) {
        try {
            this.logger.log("Started to send email verification mail")
            const payload = {
                from: this.configService.get('email.user'), // sender address
                to: email, // list of receivers
                subject: "Welcome to Shortd , URL Shortner", // Subject line 
                html: `<p>Please click the here to verify your email address : </p><a href="${this.configService.get('shortd.host')}/user/verify?verifyToken=${verifyToken}">Verify my email</a>
                <br><br> Or paste the below link in any browser <br><br>
                <p>${this.configService.get('shortd.host')}/user/verify?verifyToken=${verifyToken}</p>
                `,// html body
            }
            await this.transporter.sendMail(payload)
            this.logger.log("Successfully sent email verification mail")
        } catch (error) {
            this.logger.error("Error while sending email vertification mail", error.message)
        }
    }
}