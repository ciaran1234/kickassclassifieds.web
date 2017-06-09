import { Region } from './region.model';
import { Currency} from './currency.model';

export class Country {
    _id: string;
    name: string;
    alpha2: string;
    alpha3: string;
    countryCode: Number;
    regions: Region[];
    currency: Currency;
}