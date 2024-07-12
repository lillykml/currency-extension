import { useState, useEffect } from 'react'
import './App.css'
import currencyService from './services/converter';

function App() {
  const [currencies, setCurrencies] = useState<string[] | undefined>(undefined);
  const [amount, setAmount] = useState<number | undefined >(undefined);
  const [origin, setOrigin] = useState<string | undefined>(undefined);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<string | undefined>(undefined);

  useEffect(() => {
    currencyService.getCurrencies().then(currencyCodes => setCurrencies(currencyCodes));
  }, []);

  const convert = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setResult(`Converting ${amount} ${origin} to ${target}`)
    setAmount(undefined);
    setOrigin('');
    setTarget('');
  }

  return (
    <>
      <div>
        <img src="/icon512.png" className="logo" alt="Currency converter logo" />
        <button onClick={()=>window.close()}>X</button>
      </div>
      <h1>Currency Converter</h1>
      <div className="card">
        <form onSubmit={convert}>
          <div>
            <label>Amount</label>
            <input 
            typeof='number' 
            value={amount} 
            onChange={(e) => {
              const value = e.target.value;
              setAmount(value ? parseFloat(value) : undefined);
              }
            }/>
          </div>
          <div>
            <label>Original Currency</label>
            <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
              {currencies && currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Target Currency</label>
            <select value={target} onChange={(e) => setTarget(e.target.value)}>
              {currencies && currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <button type='submit'>Convert</button>
        </form>
        {result && <p>{result}</p>}
      </div>
    </>
  )
}

export default App;
