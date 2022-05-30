import axios from 'axios';
import Cookies from 'universal-cookie';
import config from "../../config";
import { getAccessToken } from "../../redux/helpers/user"
import {aythanticateduser} from "./../../redux/actions/skills"

const qs = require('qs');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const jwksClient = require('jwks-client');
const ms = require('ms');

const ko="us-east-1_D3UQjzrcw";
const jwksUrl = `https://cognito-idp.us-east-1.amazonaws.com/${config.pool_id}/.well-known/jwks.json`;
// https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json
// https://my-cognito-url.us-east-1.amazonaws.com/${config.cognito.cognitoPoolId}/.well-known/jwks.json

const client = jwksClient({
  cache: true,
  cacheMaxEntries: 5, // Default value
  cacheMaxAge: ms('10h'), // Default value
  strictSsl: true, // Default value
  jwksUri: jwksUrl,
  loadUserInfo: false
});

async function getKey(kidId) {
    let key
    await client.getKeys((err, keys) => {
        const key1 = keys.find(k => k.kid === kidId);
        key = key1
      });
      return key
    }
export async function getEmailFromCode(awsAuthorizationCodeResponse) {
  const unverifiedDecodedAuthorizationCodeIdToken = jwt.decode(awsAuthorizationCodeResponse.data.id_token, { complete: true });
    const { kid } = unverifiedDecodedAuthorizationCodeIdToken.header;
    const K_ID = kid;
    const jwk = await getKey(K_ID);
    const pem = await jwkToPem(jwk);
    const decodedIdToken = await jwt.verify(awsAuthorizationCodeResponse.data.id_token, pem, { algorithms: ['RS256'] });
   
  // Make sure that the profile checkbox is selected in the App client settings in cognito for the app. Otherwise you will get just the email
  const email = decodedIdToken.email;
 
  const userName = decodedIdToken?.["cognito:username"];
  const returnObject = {
    email: email.toLowerCase(),
    username:userName
  };
  const newValue = await returnObject;
  return newValue
}






export function generateAuthToken(user) {
  const token = jwt.sign(
    {
    
      email: user.email,
      
    },
    "secret",
   
  );
  return token;
}

function createCookie(name,value,minutes) {
  if (minutes) {
      var date = new Date();
      date.setTime(date.getTime()+(minutes*60*1000));
      var expires = "; expires="+date.toGMTString();
  } else {
      var expires = "";
  }
  document.cookie = name+"="+value+expires+`; path=/`;
}

export const getauth= async(payload) => {
     
   let data = await  aythanticateduser(payload)
   let finalData = await data()
   return finalData
  };
  export async function eventHandler(event) {
    const cookies = new Cookies();
    const accessToken = event.substring(event.lastIndexOf("=") + 1);
    const data = {
      grant_type: "authorization_code",
      client_id: `${config.client_id}`,
      code: accessToken,
      scope: "profile",
      redirect_uri: `${config.REDIRECT_URL}/`,
    };
    const gt =
      `https://${config.domain_name}`;
    const p = {
      method: "post",
      url: `${gt}/oauth2/token`,
      data: qs.stringify(data),
    };

    const awsResponse = await axios(p);
   
    if(awsResponse.status !==400){
    const result = await getEmailFromCode(awsResponse);
    const payload = { UserId: result.username, EmailId: result.email };
   
    let path =  `https://${config.domain_name}/login?client_id=${config.client_id}&response_type=code&scope=profile+email+openid&redirect_uri=${config.REDIRECT_URL}/`
    createCookie('accessToken',`${awsResponse.data.access_token}`,awsResponse.data.expires_in/60,path)
  
    await localStorage.setItem("userName",result.username)
    await localStorage.setItem( "email",result.email)
    await localStorage.setItem( "refresh-token",awsResponse.data.refresh_token)
    await localStorage.setItem("id-token",awsResponse.data.id_token)
    await localStorage.setItem("access-token",awsResponse.data.access_token)
    
    const dataofAuth =  await getauth(payload);
   
    const authr=dataofAuth.Success ;
    if(authr)
    {
      await localStorage.setItem('actionby', dataofAuth.Data.Id);
      await localStorage.setItem('Name', dataofAuth.Data.Name);
      await localStorage.setItem('Role', dataofAuth.Data.Role);
      await localStorage.setItem('Permissions', JSON.stringify(dataofAuth.Data.Permissions));

      return true
    }
    return false
    // localStorage.setItem('loggedin-user', false);
   
 
    
  
  }

if(awsResponse.status ==400 || awsResponse.status ==401)
window.location.href =
`https://${config.domain_name}/login?client_id=${config.client_id}&response_type=code&scope=profile+email+openid&redirect_uri=${config.REDIRECT_URL}/`;
}


 export function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
  }