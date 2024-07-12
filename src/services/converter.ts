import axios from 'axios';

const baseUrl:string = 'https://api.currencyapi.com/v3';
const apiKey = 'your_api_key';

const getCurrencies = async () => {
    const response = await axios.get(`${baseUrl}/currencies?apikey=${apiKey}`);
    const currencies =  response.data.data;
    return Object.keys(currencies);
};

const convert = async (amount: number, origin: string, target: string) => {
    const response = await axios.get(`${baseUrl}/latest?apikey=${apiKey}&currencies=${target}&base_currency=${origin}`);
    const rate = response.data.data[target].value;
    console.log(rate);
    return (amount * rate).toFixed(2);
};

export default { getCurrencies, convert };