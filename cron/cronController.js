const test = require("./test");
const cron = require("node-cron");
const express = require("express");
const sms = require("../sms/smsController");

exports.cronSchedular = async (req, res) => {
    console.log("hello in cronSchedular");
    const { sec, min, hrs, day, month, dow, message } = req.body;

    await cron.schedule(`${sec} ${min} ${hrs} ${day} ${month} ${dow}`, () => {
        console.log("---------------------");
        test.sms(message);
        const sendSms = sms.test(req, res);
        return res.send(sendSms)
    });
};


