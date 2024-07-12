import axios from 'axios'

const baseUrl:string = 'https://api.currencyapi.com/v3';
const apiKey = 'your_api_key';

const getCurrencies = async () => {
    const response = await axios.get(`${baseUrl}/currencies?apikey=${apiKey}`)
    const currencies =  response.data.data;
    return Object.keys(currencies);
};

export default { getCurrencies };