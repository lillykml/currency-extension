import axios, { AxiosResponse } from 'axios';

const baseUrl: string = 'https://api.currencyapi.com/v3';
const apiKey: string = 'your_api_key';


interface CurrenciesResponse {
    data: {
        [key: string]: {
            code: string;
            name: string;
        };
    };
}

interface ConversionResponse {
    data: {
        [key: string]: {
            value: number;
        };
    };
}

const getCurrencies = async (): Promise<string[]> => {
    try {
        const response: AxiosResponse<CurrenciesResponse> = await axios.get(`${baseUrl}/currencies?apikey=${apiKey}`);
        const currencies = response.data.data;
        return Object.keys(currencies);
    } catch (error) {
        console.error('Error fetching currencies:', error);
        return [];
    }
};

const convert = async (amount: number, origin: string, target: string): Promise<string> => {
    try {
        const response: AxiosResponse<ConversionResponse> = await axios.get(`${baseUrl}/latest?apikey=${apiKey}&currencies=${target}&base_currency=${origin}`);
        const rate = response.data.data[target]?.value;
        if (rate === undefined) {
            throw new Error(`Conversion rate for ${target} not found`);
        }
        return (amount * rate).toFixed(2);
    } catch (error) {
        console.error('Error converting currency:', error);
        return '0.00';
    }
};

const getRate = async (origin: string, target: string): Promise<number> => {
    try {
        const response: AxiosResponse<ConversionResponse> = await axios.get(`${baseUrl}/latest?apikey=${apiKey}&currencies=${target}&base_currency=${origin}`);
        const rate = response.data.data[target]?.value;
        if (rate === undefined) {
            throw new Error(`Conversion rate for ${target} not found`);
        }
        return rate;
    } catch (error) {
        console.error('Error retrieving exchange rate:', error);
        return 1;
    }
};

export default { getCurrencies, convert, getRate };
