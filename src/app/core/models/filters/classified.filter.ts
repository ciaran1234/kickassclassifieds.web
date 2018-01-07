import { Filter } from './filter';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

export class ClassifiedFilter {
    public q: string;
    public top: Number;
    public skip: Number;
    public sort: string;
    public category: string;
    public country: Number;
    public minPrice: Number;
    public maxPrice: Number;
    public currency: Number;
    public advertType: string;
}