const clientId = process.env.REACT_APP_BATTLENET_USERNAME;
const clientSecret = process.env.REACT_APP_BATTLENET_PASSWORD;

type BattlenetResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  sub: string;
};

const clientToken = async () => {
  const response = await fetch("https://oauth.battle.net/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });
  const data: BattlenetResponse = await response.json();
  return data.access_token;
};

export default clientToken;
