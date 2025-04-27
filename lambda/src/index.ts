import {
  getIntentName,
  getRequestType,
  HandlerInput,
  SkillBuilders,
} from "ask-sdk-core";
import { CustomSkillErrorHandler } from "ask-sdk-core/dist/dispatcher/error/handler/CustomSkillErrorHandler";
import { AddMediaIntentHandler } from "./intents/addMedia";
import { SlotsInterceptor } from "./interceptors/slots";
import { IntentTypes, RequestTypes } from "./lib/constants";

const LaunchRequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === RequestTypes.Launch;
  },
  handle(handlerInput: HandlerInput) {
    const speakOutput =
      "Welcome to Overseerr. Ask me to add a movie you'd like to watch";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === RequestTypes.Intent &&
      (getIntentName(handlerInput.requestEnvelope) === IntentTypes.Cancel ||
        getIntentName(handlerInput.requestEnvelope) === IntentTypes.Stop)
    );
  },
  handle(handlerInput: HandlerInput) {
    const speakOutput = "May the force be with you!";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === RequestTypes.SessionEnded
    );
  },
  handle(handlerInput: HandlerInput) {
    console.log(
      `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler: CustomSkillErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      "Sorry, I had trouble doing what you asked. Please try again.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    AddMediaIntentHandler
  )
  .addRequestInterceptors(SlotsInterceptor)
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent("overseerr/v1.0")
  .lambda();
