const axios = require('axios');
const debug = require('debug')('auth');
const config = require('../../config');
const qs = require('qs');

export default async function awsCallTokenEndpoint(grantType, accessToken) {

  const data = {
    grant_type: grantType,
    client_id: "f2luss9807qsn9tikqamvcq2i",
    code: "eyJraWQiOiIyMnpyXC9UZ2V5ZjNKTWx0cVBoMDJCaFwvOFdaUGExNHF2TjZaQXVZeUpKSmc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkNmI4OTYzNy03MzY2LTQzMDUtOTdiNC1iNTQwMjJhNzEzMmQiLCJldmVudF9pZCI6ImRmMzEzOTFhLTlhMTEtNDdhNC1hN2Q0LTVjN2VjYzBiMGUyYiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIGVtYWlsIiwiYXV0aF90aW1lIjoxNjQxODc0ODMxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9EM1VRanpyY3ciLCJleHAiOjE2NDE4Nzg0MzEsImlhdCI6MTY0MTg3NDgzMSwidmVyc2lvbiI6MiwianRpIjoiZTg3MzMwOTYtNWZkZS00OTQxLTkwOTktOWM4NGZmYzlkZTRhIiwiY2xpZW50X2lkIjoiZjJsdXNzOTgwN3Fzbjl0aWtxYW12Y3 EyaSIsInVzZXJuYW1lIjoia2FyaXNobWFyYW8ifQ.Pxr_7YxDZbYk210jYE0RMJ4k3xe-HWBD7Np751jXpiRP1pLWd5WEU0wf32imWQN6BhuzvCquZoqo8M0m9wlFrjRaW41eIHGczddQ3oTaFLJKLIJJwr0vI8kZX6ms-6ZGw8dy2YyqMsbcqPnwvsXrAM2o2IO0FNh71NRlKWZ2nZmYn-7qqoZt6uOZLtRxv_ZtMLV-s28Qe68AY5Nb5e_uAU-N8xAb7bqHr635STrTKbO9UKiyFYQQemsg_eL5P4iWgn68jvXBVlPmzJpA3mtnQz_LnedW00GjbVsvwYkg93g9PwbUgtAoFqSgxsnp5IAYeE4G_jeTfi_yb9_GMs6cGQ",
    scope: 'aws.cognito.signin.user.admin+email+openid+phone',
    redirect_uri: "https://dev6l244gir0z.cloudfront.net/",
  };

  const p = {
    method: 'post',
    url: `https://smartrouter-us-bank-domainservice-test.auth.us-east-1.amazoncognito.com/oauth2/token`,
    data: qs.stringify(data),

    auth: {
      username: "f2luss9807qsn9tikqamvcq2i",
      password: ""
    },
  };
//   debug(`AWS oauth2/token request parameters: ${JSON.stringify(p)}`);
  const awsResponse = await axios(p);
//   debug(`AWS oauth2/token response : ${JSON.stringify(awsResponse.data)}`);

  return awsResponse;
}