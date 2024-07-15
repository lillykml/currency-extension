import { useState, useEffect } from 'react';
import { Box, Typography, TextField, MenuItem, Button, IconButton }from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './App.css';
import currencyService from './services/converter';

function App() {
  const [currencies, setCurrencies] = useState<string[] | undefined>(undefined);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [origin, setOrigin] = useState<string>('EUR');
  const [target, setTarget] = useState<string>('USD');
  const [result, setResult] = useState<string | undefined>(undefined);

  useEffect(() => {
    currencyService.getCurrencies().then(currencyCodes => setCurrencies(currencyCodes));
  }, []);

  const convert = () => {
    if (amount && origin && target) {
      currencyService.convert(amount, origin, target).then(response => {
        setResult(`${String(response)} ${target}`);
      });
    }
  };

  // const convertPage = async () => {
  //   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //   chrome.runtime.sendMessage({
  //     type: 'CONVERT_CURRENCIES',
  //     originCurrency: 'USD',  // Example value
  //     targetCurrency: 'EUR'   // Example value
  //   }, response => {
  //     console.log(response?.status);
  //   });
  // };

  const convertPage = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          // Function to recursively wrap text nodes
          const wrapTextNodes = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const textNode = node as Text;
              if (textNode.textContent) {
                //Creates a new document fragment. A document fragment is a lightweight container for DOM elements, allowing safe manipulation without affecting the main DOM.
                const fragment = document.createDocumentFragment();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = textNode.textContent;
  
                // Replace text with styled (red) version
                const regex = /(?<![\w\d])(\d+(\.\d+)?)(?=\s[A-Z]{3}(?![A-Z])|\s[$€£¥]|[^\w\d])/g;

                const replacedHtml = tempDiv.innerHTML.replace(regex, (match) => {
                  return `<span style="color: red;">${match}</span>`;
                });
  
                // Append replaced content to fragment
                fragment.appendChild(document.createRange().createContextualFragment(replacedHtml));
  
                // Replace the original text node with the new fragment content
                textNode.parentNode?.replaceChild(fragment, textNode);
              }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              // Recursively process child nodes
              element.childNodes.forEach(childNode => wrapTextNodes(childNode));
            }
          };
          // Start processing from the document body
          wrapTextNodes(document.body);
        }
      });
    } catch (error) {
      console.error("Error executing script:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nativeEvent = event.nativeEvent as SubmitEvent;
    const submitter = nativeEvent.submitter as HTMLButtonElement;
    const clickedButton = submitter.value;
    if (clickedButton === 'ConvertAmount') {
      convert();
    } else if (clickedButton === 'ConvertPage') {
      convertPage();
    }
  };

  return (
    <div className='App'>
      <Box>
        <Box style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <IconButton onClick={()=>window.close()} size='small'><CloseIcon /></IconButton>
        </Box>
        <img src="/icon512.png" className="logo" alt="Currency converter logo" />
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Currency Converter
        </Typography>
      <Box sx={{ '& .MuiTextField-root': { m: 1, width: '130px' } }}>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField 
              label="Amount" 
              size="small"
              variant="outlined" 
              type="number" value={amount} 
              onChange={(e) => {
                const value = e.target.value;
                setAmount(value ? parseFloat(value) : undefined);
              }}/>
            <TextField
              select
              size="small"
              label="Select"
              value={origin}
              helperText="Original currency"
              onChange={(e) => setOrigin(e.target.value)}
            >
              {currencies && currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
          <TextField
            size="small"
            select
            label="Select"
            value={target}
            helperText="Target currency"
            onChange={(e) => setTarget(e.target.value)}
          >
              {currencies && currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Button type='submit' name="action" value="ConvertAmount">Convert</Button>
          <Button type='submit' name="action" value="ConvertPage">Convert on Page</Button>
        </form>
        {result && <Typography variant='body1'>{result}</Typography>}
      </Box>
      </Box>
    </div>
  );
}

export default App;
