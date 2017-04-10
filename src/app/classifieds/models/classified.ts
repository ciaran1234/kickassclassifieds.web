import { Price } from '../../core/models/price';
import { Country } from '../../core/models/country';
import { Region } from '../../core/models/region';
import { State } from '../../core/models/state';

export class Classified {
    public _id: string;
    public title: string;
    public description: string;
    public imageUrls: Array<string>[];
    public author: string;
    public price: Price;
    public country: Number;
    public region: string;
    public states: string[];

    // constructor(model?: any) {
    //     this._id = model && model._id || '';
    //     this.title = model && model.title || '';
    //     this.description = model && model.description || '';
    //     this.imageUrls = model && model.imageUrls || [];
    //     this.author = model && model.author || '';
    //     this.price = model && model.price || undefined;
    //     this.country = model && model.country || null;
    //     this.region = model && model.region || '';
    //     this.states = model && model.states || [];
    // }
}
