import _ from "lodash";

const config = {
  all: {
    env: process.env.REACT_APP_STAGE || "DEV",
    baseName: process.env.PUBLIC_URL,
    sessionTimeout: 1000 * 5 * 12 * 20, //20 min
    showPopupTime: 1000 * 5 * 12 * 1, //1 min
  },
  DEV: {
    apiBase: "https://6lyffhgxsk.execute-api.us-east-1.amazonaws.com/Dev/api",
   REDIRECT_URL : "http://localhost:3000",
    // REDIRECT_URL : "https://dev6l244gir0z.cloudfront.net",
    pool_id:"us-east-1_D3UQjzrcw",
    client_id:"52mkjbm34tnm33afu45eq1e950",
    domain_name:"//smartrouter-us-bank-domainservice-test.auth.us-east-1.amazoncognito.com",
  },
  QC: {
    apiBase: "https://bwyercg2df.execute-api.us-east-1.amazonaws.com/qc/api",
    REDIRECT_URL : "https://qc.usbank-smartrouter.com",
    pool_id:"us-east-1_D3UQjzrcw",
    client_id:"6p2m09hiqnju0o939eiho5ged",
    domain_name:"//smartrouter-us-bank-domainservice-test.auth.us-east-1.amazoncognito.com"
  },
  UAT: {
    apiBase: "https://v13j74iqbf.execute-api.us-east-1.amazonaws.com/uat/api",
    REDIRECT_URL : "https://uat.usbank-smartrouter.com",
    pool_id:"us-east-1_XADKPsfKR",
    client_id:"2ccklpd0824hog3vq887cc987p",
    domain_name:"//smartrouter-sso.auth.us-east-1.amazoncognito.com"
  },
};


export default _.merge(config.all, config[config.all.env]);
