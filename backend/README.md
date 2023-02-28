# Server Side

## AWS Deployment
Follow Steps from [here](https://github.com/Musa-Azeem/aws-test) to setup AWS

Set MongoDB to accept connections from any IP and add MONGO_URI to .env file in `my-app`

---
Invoke URL is: https://[Rest API ID].execute-api.us-east-2.amazonaws.com/Prod/api/projects/
- add this url to .env of client and use from there

**Deploy**
- to set up new cloud services: `sam build` and `sam deploy --guided`
- to deploy to existing services: `./deploy.sh`

## Local Deployment
- set env environment variable `AWS=true`
- go into `my-app` directory and run: `npm run dev`
- sam local deploy: `sam local start-api`