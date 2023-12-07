import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AutoCompleteDirective } from "./autocomplete.directive";

@NgModule({
    imports: [HttpClientModule],
    declarations: [AutoCompleteDirective],
    exports: [AutoCompleteDirective]
})

export class autocompleteModule {}