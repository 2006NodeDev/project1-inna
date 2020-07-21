
let nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    // user: 'inna.project1@gmail.com',
    // pass: 'mechanicsburg21!'
    user: process.env['EMAIL'],
    pass: process.env['PASSWORD']
  }
})

const messageTemplate = {
  from: process.env['EMAIL'],
  to: '',
  subject: "Welcome to innaConnection!",
  text: "Thank you for signing up! -Inna :) "
}

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.newUserEmail = (event, context) => {
  let newUser = JSON.parse(Buffer.from(event.data, 'base64').toString())
  messageTemplate.to = newUser.email
  transporter.sendMail(messageTemplate)
};

// let payload = {
//     username:'Alec',
//     jobTitle:'Complicated',
//     email: 'inna.project1@gmail.com'
// }

// let event = {
//     data: Buffer.from(JSON.stringify(payload), 'binary')
// }

// exports.newUserEmail(event)