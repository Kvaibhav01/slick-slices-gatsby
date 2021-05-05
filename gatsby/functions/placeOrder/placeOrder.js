const nodeMailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
    <div>
      <h2>Your recent order for ${total}</h2>
      <p>Please start walking over, we will have your orders ready in the next 20 minutes.</p>
      <ul>
        ${order
          .map(
            (item) => `
          <li>
            <img src="${item.thumbnail}" alt="${item.name}" />
            ${item.size} ${item.name} - ${item.price}
          </li>`
          )
          .join('')}
      </ul>
      <p>Your total is <strong>${total}</strong> due at pickup.</p>

      <style>
        ul {
          list-style: none;
        }
      </style>
    </div>
  `;
}

// Create a tranport/config for nodemailer
const transporter = nodeMailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// function wait(ms = 0) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms);
//   });
// }

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  // Check if they filled out the `mapleSyrup` input
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Beep boop zzzzt good bye!' }),
    };
  }

  // Validate the data coming in is correct
  const requiredFields = ['name', 'email', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);

    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops you are missing the ${field} field`,
        }),
      };
    }
  }

  // Make sure items are there in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Why would you order nothing!?' }),
    };
  }

  // Send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
