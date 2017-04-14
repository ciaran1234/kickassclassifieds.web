import { Price } from '../../core/models/price';
import { Country } from '../../core/models/country';
import { Region } from '../../core/models/region';
import { State } from '../../core/models/state';
import { Advertiser } from './advertiser';

export class Classified {
    public _id: string;
    public title: string;
    public description: string;
    public images: string[];
    public advertiser: Advertiser;
    public price: Price;
    public country: Number;
    public region: string;
    public states: string[];
}
