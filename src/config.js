const config = {
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "notes-app-upload-arielkark",
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://qlbu6vr1s6.execute-api.ap-southeast-2.amazonaws.com/prod",
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_PmBPycABB",
    APP_CLIENT_ID: "6nvtinjm67gd1q0gvj544e9pu2",
    IDENTITY_POOL_ID: "ap-southeast-2:0d1a856f-d2de-4d15-a920-2a08ae33dae3",
  },
};

export default config;