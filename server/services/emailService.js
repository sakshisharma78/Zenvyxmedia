const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendLeadNotification = async (leadData) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to admin
        subject: `🚀 New Lead: ${leadData.name} (${leadData.role})`,
        html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #0D0D0D;
              color: #F5F5F5;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #161616 0%, #1a1a1a 100%);
              border-radius: 16px;
              padding: 40px;
              border: 1px solid #262626;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 32px;
              font-weight: 800;
              background: linear-gradient(135deg, #00C6FF 0%, #7C3AED 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .content {
              margin: 20px 0;
            }
            .field {
              margin: 15px 0;
              padding: 15px;
              background: #0D0D0D;
              border-radius: 8px;
              border-left: 3px solid #00C6FF;
            }
            .label {
              color: #A1A1AA;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .value {
              color: #F5F5F5;
              font-size: 16px;
              margin-top: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #262626;
              color: #A1A1AA;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">ZENVYX</div>
              <p style="color: #A1A1AA; margin-top: 10px;">New Lead Submission</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${leadData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${leadData.email}</div>
              </div>
              <div class="field">
                <div class="label">Role</div>
                <div class="value">${leadData.role}</div>
              </div>
              ${leadData.serviceInterested ? `
              <div class="field">
                <div class="label">Service Interested</div>
                <div class="value">${leadData.serviceInterested}</div>
              </div>
              ` : ''}
              ${leadData.socialLink ? `
              <div class="field">
                <div class="label">Social Link</div>
                <div class="value"><a href="${leadData.socialLink}" style="color: #00C6FF;">${leadData.socialLink}</a></div>
              </div>
              ` : ''}
              ${leadData.budget ? `
              <div class="field">
                <div class="label">Budget</div>
                <div class="value">${leadData.budget}</div>
              </div>
              ` : ''}
              ${leadData.message ? `
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${leadData.message}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Received at ${new Date().toLocaleString()}</p>
              <p>Login to your admin dashboard to respond</p>
            </div>
          </div>
        </body>
      </html>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Lead notification email sent successfully');
    } catch (error) {
        console.error('Email sending error:', error);
    }
};

const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '🎉 Welcome to Zenvyx - Let\'s Create Something Amazing!',
        html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #0D0D0D;
              color: #F5F5F5;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #161616 0%, #1a1a1a 100%);
              border-radius: 16px;
              padding: 40px;
              border: 1px solid #262626;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 36px;
              font-weight: 800;
              background: linear-gradient(135deg, #00C6FF 0%, #7C3AED 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .content {
              line-height: 1.8;
              color: #F5F5F5;
            }
            .cta-button {
              display: inline-block;
              margin: 20px 0;
              padding: 15px 40px;
              background: linear-gradient(135deg, #00C6FF 0%, #7C3AED 100%);
              color: white;
              text-decoration: none;
              border-radius: 50px;
              font-weight: 600;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #262626;
              color: #A1A1AA;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">ZENVYX</div>
            </div>
            <div class="content">
              <h2 style="color: #00C6FF;">Hey ${name}! 👋</h2>
              <p>Thank you for reaching out to Zenvyx - where creativity meets innovation!</p>
              <p>We've received your submission and our team is already reviewing your request. We're excited about the possibility of working together to create something extraordinary.</p>
              <p><strong>What happens next?</strong></p>
              <ul style="color: #A1A1AA;">
                <li>Our team will review your submission within 24 hours</li>
                <li>We'll reach out to discuss your project in detail</li>
                <li>Together, we'll craft a custom strategy for your success</li>
              </ul>
              <div style="text-align: center;">
                <a href="${process.env.CLIENT_URL}/portfolio" class="cta-button">View Our Work</a>
              </div>
              <p style="margin-top: 30px; color: #A1A1AA; font-size: 14px;">
                Questions? Reply to this email and we'll get back to you lightning fast! ⚡
              </p>
            </div>
            <div class="footer">
              <p><strong>Zenvyx Creative Studio</strong></p>
              <p>Where elite creators collaborate</p>
            </div>
          </div>
        </body>
      </html>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Email sending error:', error);
    }
};

module.exports = { sendLeadNotification, sendWelcomeEmail };
