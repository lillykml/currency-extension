# Currency Converter Chrome Extension

## Purpose of the extension
I'm sure you all know the problem of visiting a website abroad and seeing prices displayed in a currency you are not familiar with. This gives you a hard time estimating if something is expensive or not. This currency converter chrome extension allows you to convert every currency on the fly without leaving your current tab.

## Getting started
1. Clone this repository or download the source code.
2. Run npm install to install all dependencies
3. Signup and generate an API Key with https://currencyapi.com/
4. Replace the dummy value in converter.ts with your personal API key

<img height="200" src='public/Screen Shot 2024-08-01 at 09.59.21.png' />
   
5. Run `npm run build` to build a production version of your chrome extension
6. Navigate to **chrome://extensions/** in your browser
7. Click `load unpacked` and and select the `dist` folder of this application.

<img height="500" src='public/Screen Shot 2024-08-01 at 10.00.09.png' />
   
8. If you want the extension to be always available simply pin it in your browser
9. Start using the extension!
