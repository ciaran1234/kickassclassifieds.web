import { Price } from '../../core/models/price';
import { Country } from '../../core/models/country';
import { Region } from '../../core/models/region';
import { State } from '../../core/models/state';
import { Advertiser } from './advertiser';
import { Category } from '../../core/models/category';

export class Classified {
    public _id: string;
    public title: string;
    public description: string;
    public Category: Category;
    public images: string[];
    public advertiser: Advertiser;
    public price: Price;
    public country: Number;
    public region: string;
    public states: string[];
    public details: any;    
}
