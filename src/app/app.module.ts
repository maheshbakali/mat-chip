import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CounterComponent } from "./counter/counter.component";

import { StoreModule } from "@ngrx/store";
import { myCounterReducer } from "./reducers/counter.reducer";
import {
  MatChipsModule,
  MatIconModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { ChipAutocompleteComponent } from "./chip-autocomplete/chip-autocomplete.component";

@NgModule({
  declarations: [AppComponent, CounterComponent, ChipAutocompleteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ myCount: myCounterReducer }),
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
