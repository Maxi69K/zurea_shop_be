const htmlContactForm = (message) => {
  return `<h2 style="font-size: 20px; color: darkred;">Message from ZureaShop</h2>
    <p style="line-height: 1.7; color: blue">${message}</p>
    <a href="http://localhost:3000" target="_blank">Go to WebSite</a>
    <img src="cid:logo@nodemailer.com" style="height: 50px" alt="">`;
};

const htmlActivation = (activationLink) => {
  return `<table style="width: 90%;margin: 0 auto;">
                <tr>
                    <td style="
                        font-size: 16px;
                        text-align: center;"
                    >
                        <img src="cid:logo@nodemailer.com" alt="logo"
                            style="
                                height: 50px;
                                width: 50px;
                                object-fit: contain;"
                         />
                        <p>Thank you for register to our shop.</p>
                        <p>One more step to complete registration.</p>
                        <p>Just you must verify registration on next link</p>
                        <a href="${activationLink}" style="
                            font-weight: 600;
                            padding: 15px 30px;
                            background-color: #0156FF;
                            color: #ffffff;
                            border-radius: 30px;
                            display: inline-block;
                            text-decoration: none;
                        ">Activate your account!</a>
                    </td>
                </tr>
            </table>`.trim();
};

module.exports = { htmlContactForm, htmlActivation };
