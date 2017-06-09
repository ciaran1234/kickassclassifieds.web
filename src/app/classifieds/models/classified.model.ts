import { Price } from '../../core/models/price.model';
import { Country } from '../../core/models/country.model';
import { Region } from '../../core/models/region.model';
import { State } from '../../core/models/state.model';
import { Advertiser } from './advertiser.model';
import { Category } from '../../core/models/category.model';
import { ClassifiedCountry } from './classified-country.model';

export class Classified {
    public _id: string;
    public title: string;
    public description: string;
    public category: Category;
    public images: string[];
    public advertiser: Advertiser;
    public price: Price;
    public country: ClassifiedCountry;
    public region: string;
    public states: string[];
    public details: any;
}
