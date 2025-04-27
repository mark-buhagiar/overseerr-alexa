# Alexa Overseerr Skill

## Deploy steps

1. Make sure that you have Node (I used 22 lts) installed.
1. Clone the repo.
1. In VS Code, install the Alexa Skills Toolkit extension (VERY useful).
1. In `lambda/src/lib/constants`, update all the parameters in AppDetails to the appropriate values. The easiest way, is to snoop on a request when you make one through the Overseerr UI.
1. In `en-GB.json` and `en-US.json` update the `invocationName` to whatever you want it to be. Add additional languages if you desire.
1. In `skills-package`, make sure that the `apis` section looks as per the below, and update all other values appropriately.

   ```json
   "apis": {
       "custom": {}
   },
   ```

1. Create an Amazon Developer account [here](https://developer.amazon.com/alexa/console/ask). 🚨 Use the same account you use with your Alexa.
1. Create an AWS Account [here](https://signin.aws.amazon.com/signup).
1. Install the ASK CLI as per [here](https://developer.amazon.com/es-ES/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html).
1. Run `ask configure`... you'll need to create an IAM account with the necessary permissions to deploy lambdas. I just gave min admin. Fudge it.
1. Navigate to `lambda` and run `npm i` then `npm run build`.
1. Navigate back to the root folder, and run `ask deploy`.

## Useful stuff

- https://dzone.com/articles/alexa-skill-with-typescript
- https://github.com/Xzya/alexa-typescript-starter/tree/8b87a32edcfeb43881eb587a3f9357d26db468f8
- https://github.com/xavidop/alexa-typescript-lambda-helloworld/tree/master
