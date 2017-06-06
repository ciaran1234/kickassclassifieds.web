import { Input, Component, Renderer2, ElementRef  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicFormControlModel } from '../models/dynamicFormControl.model';
import { DynamicFormControlType } from '../models/dynamicFormControl.types';

@Component({
    selector: "dynamic-form-control",
    templateUrl: "../views/dynamic-form-control.html"
})

export class DynamicFormControl {
    @Input() group: FormGroup;
    @Input() model: DynamicFormControlModel;
    control: FormControl;

    constructor(private renderer: Renderer2, private hostElement: ElementRef ) {
        
    }

    ngOnInit() {     
        this.control = this.group.get(this.model.id) as FormControl;

         if(!this.model.style) {
             this.model.style = this.defaultStyle();
         }

        this.renderer.addClass(this.hostElement.nativeElement, this.model.style.outerGrid);     
    }

    private defaultStyle(): any {
        return {
            outerGrid: 'form-group',
            innerGrid: '',
            label: 'form-control-label'
        }
    }

    get errorMessages(): string[] {

        let messages = [];

        if (this.model.type !== DynamicFormControlType.Group
            && this.model.errorMessages) {
            for (let validatorName in this.control.errors) {
                let message;

                if (validatorName === "minlength" || validatorName === "maxlength") {
                    validatorName = validatorName.replace("length", "Length");
                }

               if (this.model.errorMessages[validatorName]) {

                    message = this.model.errorMessages[validatorName]
                        .replace(/\{\{\s*(.+?)\s*\}\}/mg, (match: string, expression: string) => {

                            let propertySource: any = this.model,
                                propertyName: string = expression;

                            if (expression.indexOf("validator.") >= 0) {

                                propertySource = this.control.errors[validatorName];
                                propertyName = expression.replace("validator.", "");
                            }

                            return propertySource[propertyName] ? propertySource[propertyName] : null;
                        });

                } else {
                    message = `Error on "${validatorName}" validation`;
                }

                messages.push(message);
            }
        }

        return messages;
    }

    get showErrorMessages(): boolean {       
        return this.control.touched && this.isInvalid;
    }

    get isInvalid(): boolean {
        return this.control.touched && this.control.invalid;
    }
}