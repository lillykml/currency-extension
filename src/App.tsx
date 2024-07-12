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

  const convert = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (amount && origin && target) {
      currencyService.convert(amount, origin, target).then(response => {
        setResult(`${String(response)} ${target}`);
      });
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
        <form onSubmit={convert}>
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
          <Button type='submit'>Convert</Button>
        </form>
        {result && <Typography variant='body1'>{result}</Typography>}
      </Box>
      </Box>
    </div>
  );
}

export default App;
