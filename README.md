# Empower [![CI](https://github.com/billgathen/empower/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/billgathen/empower/actions/workflows/ci.yml)

Go + React app that uses OpenAI integration to help you accomplish your goals by:
1. Phrasing them in a specific, time-boxed, actionable way.
1. Suggesting steps you can take to reach them.
1. Identifying what success looks like to you, so you will know when you're done and ready to challenge yourself again!

Remember, the AI is **your** assistant and you are free to use or disregard its suggestions based on your better understanding and self-knowledge.

Empower was built with accessibility and mobile as first-class concepts.
It can be saved to your mobile device and used normally as long as the server is running and on the same wifi network.

Try it out by following the steps below!

## To run locally

- Empower uses ChatGPT behind the scenes. See `Setting up your API key` for details in setting it up.
  If you choose not to configure it, the app will function normally except for the "Assistant Suggestions" feature.
- Install Go v1.25.6+ [https://go.dev/doc/install](https://go.dev/doc/install)
- ```git clone https://github.com/billgathen/empower```
- ```cd empower```
- ```make run```
- In your browser, open http://localhost:3000

## To develop locally

- Install Node v25.2.1+ [https://nodejs.org/en/download](https://nodejs.org/en/download)
- With Go installed and repo cloned as described above...
- ```cd empower/web```
- ```npm install```
- ```npm run dev``` enables hot-reloading of Go, React, and test runner

## Setting up your API key

Empower expects the ```$OPEN_AI_KEY``` environment variable to be set to your api key. If you already have one, skip the rest of this section.

If you don't have an OpenAI account, go [here](https://auth.openai.com/create-account) to create a free one.

Go [here](https://platform.openai.com/settings/organization/api-keys) to generate an api key. You can start with as little as $5.00 USD in credits.

There are several ways to make the api key available to Empower. Choose the one that suits your needs.

1. At the command-line, use ```export OPENAI_API_KEY=<paste your api key here>```
1. Add the code above to one of your shell config files (.bashrc, .bash_profile, .zshrc, .zprofile, etc.).
Source that file or open a new terminal window to pick up the new variable. Type ```echo $OPENAI_API_KEY``` to make sure it is available.
1. Create a `.env` file in the root folder of the project and add ```OPENAI_API_KEY=<paste your api key here>```
