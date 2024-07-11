import { useState } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState<number | undefined >(undefined);
  const [origin, setOrigin] = useState<string | undefined>(undefined);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<string | undefined>(undefined);

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
            <input type='text' value={origin} onChange={(e) => setOrigin(e.target.value)}/>
          </div>
          <div>
            <label>Target Currency</label>
            <input type='text' value={target} onChange={(e) => setTarget(e.target.value)}/>
          </div>
          <button type='submit'>Convert</button>
        </form>
        {result && <p>{result}</p>}
      </div>
    </>
  )
}

export default App;
