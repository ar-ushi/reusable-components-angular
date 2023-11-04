export interface DropDownConfig{
    defaultOpen?: boolean;
    backgroundColor?: string;
    textColor?: string;
    width?:string;
    shadow?:string;
    closeIconSrc?:string; //TODO - Replace with icon component
    multipleSelection?: boolean;
    maximumAllowed?:number;
    maximumSelectionErrorMsg: string;
}

export class DropdownItem {
    id!: String | number;
    text!: String | number;
    selected?: boolean;
    [key: string] : any;

    public constructor(obj : any) {
        if (typeof obj === 'string' || typeof obj === 'number'){
            this.id = this.text = obj;
            this.selected = false;
        }
        if (typeof obj === 'object'){
            for (const key in obj){
                this[key] = obj[key];
            }
        }
    }
}