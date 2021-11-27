export function emailLoginRequest({ firstname, lastname, accessKey, appUrl }) {
	return `<p>Bonjour ${firstname} ${lastname},</p>

  <p>Pour accéder à votre espace Fresque Maps, veuillez cliquer sur le lien ci-dessous:</p>
  &nbsp; &nbsp;
  <p style="padding-left: 20%">
    <a
      rel="nofollow"
      href="${appUrl}/auth/jwt/${accessKey}"
      style="
        background-color: #6a20ae;
        font-size: 14px;
        font-family: Helvetica, Arial, sans-serif;
        font-weight: bold;
        text-decoration: none;
        padding: 8px 10px;
        color: #ffffff;
        border-radius: 5px;
        display: inline-block;
      "
    >
      <span>Accédez à Fresque Maps</span>
    </a>
  </p>
  &nbsp; &nbsp;
  <p>L'équipe Fresque Maps</p>
  `;
}
