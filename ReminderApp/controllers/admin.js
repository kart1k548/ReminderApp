const Reminder = require('../models/reminder');
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: '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'
  }
  }));
exports.getAddReminder = (req, res, next) => {
  res.render('admin/edit-reminder', {
    pageTitle: 'Add Reminder',
    path: '/admin/add-reminder',
    editing: false
  });
};

exports.postAddReminder = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const date_time = req.body.date_time;
  const email = req.body.email;
  const someDate = new Date(date_time);
  schedule.scheduleJob(someDate, ()=>{
    return transporter.sendMail({
      to: email,
      from: "kartikdagar86@gmail.com",
      subject: "Reminder App",
      html: "<h1>Hey! It is a reminder</h1>"
    }).catch(err=>{
      console.log(err);
    });
  })
  const reminder = new Reminder({
    name: name,
    description: description,
    date_time: date_time,
    email: email
  });
  reminder
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Reminder');
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditReminder = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const redId = req.params.reminderId;
  Reminder.findById(redId)
    .then(reminder => {
      if (!reminder) {
        return res.redirect('/');
      }
      res.render('admin/edit-reminder', {
        pageTitle: 'Edit Reminder',
        path: '/admin/edit-reminder',
        editing: editMode,
        reminder: reminder
      });
    })
    .catch(err => console.log(err));
};

exports.postEditReminder = (req, res, next) => {
  const redId = req.body.reminderId;
  const name = req.body.name;
  const updatedDesc = req.body.description;
  const updatedDate_Time = req.body.date_time;
  const updatedEmail = req.body.email;
  const someDate = new Date(updatedDate_Time);
  schedule.scheduleJob(someDate, ()=>{
    return transporter.sendMail({
      to: updatedEmail,
      from: "kartikdagar86@gmail.com",
      subject: "Reminder App",
      html: "<h1>Hey! It is a reminder</h1>"
    }).catch(err=>{
      console.log(err);
    });
  })
  Reminder.findById(redId)
  .then(reminder =>{
    reminder.name = name;
    reminder.description = updatedDesc;
    reminder.date_time = updatedDate_Time;
    reminder.email = updatedEmail; 
    return reminder.save()
  })
    .then(result => {
      console.log('UPDATED Reminder!');
      res.redirect('/reminders');
    })
    .catch(err => console.log(err));
};

exports.getReminders = (req, res, next) => {
  Reminder.find()
    .then(reminders => {
      res.render('admin/reminders', {
        reds: reminders,
        pageTitle: 'Reminders',
        path: '/reminders'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteReminder = (req, res, next) => {
  const redId = req.body.reminderId;
  Reminder.findByIdAndRemove(redId)
    .then(() => {
      console.log('DESTROYED Reminder');
      res.redirect('/reminders');
    })
    .catch(err => console.log(err));
};
