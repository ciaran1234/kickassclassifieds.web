import { Region } from './region';
import { Currency} from './currency';
export class Country {
    _id: string;
    name: string;
    alpha2: string;
    alpha3: string;
    countryCode: Number;
    regions: Region[];
    currency: Currency;
}