const mailgun = require("mailgun-js");

exports.handler = function (event, context, callback) {
  const mg = mailgun({
    apiKey: `${process.env.MAILGUN_API_KEY}`,
    domain: "YOUR_DOMAIN",
  });

  const data = {
    from: "dmrusky@gmail.com",
    to: "dmbrusky@gmail.com",
    subject: "SUBJECT",
    text: "TEXT",
    html: "HTML",
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      return console.log(error);
    }

    callback(null, {
      statusCode: 200,
      body: "Mail sent",
    });
  });
};
