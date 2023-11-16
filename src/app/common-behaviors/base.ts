import { Colors } from "./colors";
import { Size } from "./size";


export class BaseClass {
    constructor(readonly colors : Colors, readonly size? : Size){}
}