import { Price } from '../../core/models/price.model';
import { Country } from '../../core/models/country.model';
import { Region } from '../../core/models/region.model';
import { Advertiser } from './advertiser.model';
import { Category } from '../../core/models/category.model';
import { ClassifiedCountry } from './classified-country.model';
import { Image } from '../../core/models/image.model';

export class Classified {
    public _id: string;
    public title: string;
    public description: string;
    public category: Category;
    public advertType: string;
    public images: Image[];
    public advertiser: Advertiser;
    public price: Price;
    public country: ClassifiedCountry;
    public region: Region;
    public state: string;
    public details: any;
    public hidePrice: Boolean;
    public allowMessages: Boolean;
    public created: Date;
    public updated: Date;
}
