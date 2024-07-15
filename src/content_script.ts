import currencyService from './services/converter';

const convertCurrenciesInPage = async (originCurrency: string, targetCurrency: string) => {
  
    try {
      const rate = await currencyService.getRate(originCurrency, targetCurrency);

      const regex = /(\d+(\.\d+)?)(\s?[A-Z]{3})/g;
  
      document.body.innerHTML = document.body.innerHTML.replace(regex, (_match, amount) => {
        const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
        return `<span style="color: red;">${convertedAmount} ${targetCurrency}</span>`;
      });
    } catch (error) {
      console.error("Error converting currencies:", error);
    }
  };
  
  // Listening for messages from the popup
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'CONVERT_CURRENCIES') {
      convertCurrenciesInPage(message.originCurrency, message.targetCurrency);
      sendResponse({ status: 'Conversion complete' });
    }
  });
  