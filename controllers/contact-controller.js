const Contact = require("../models/contact-model");

createContact = (req, res) => {
    Contact.create({
        name: req.body.name,
        email: req.body.email,
        link: req.body.link,
        subject: req.body.subject,
        message: req.body.message
    }, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, data: "Contact was created successfully." });
    })
};

module.exports = {
    createContact
};
