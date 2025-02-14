const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getpage = (req, res) => {
  res.render("login.ejs");
};

exports.postdata = (req, res) => {
  const formdata = req.body;
  User.findOne({ email: formdata.email })
    .then((arr) => {
      if (!arr) {
        console.log("No user  found!");
        res.redirect("/");
      } else {
        bcrypt
          .compare(formdata.password, arr.password)
          .then((val) => {
            if (val) {
              req.session.isauth = true;
              res.redirect("/");
            } else {
              console.log("wrong password");
              res.redirect("/");
            }
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
