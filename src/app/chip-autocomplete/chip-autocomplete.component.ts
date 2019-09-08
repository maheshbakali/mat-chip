import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, ViewChild, OnInit, Input, EventEmitter, Output, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable, Subscription, of } from "rxjs";
import {
  map,
  startWith,
  debounceTime,
  switchMap,
  tap,
  finalize,
  distinctUntilChanged
} from "rxjs/operators";

@Component({
  selector: "app-chip-autocomplete",
  templateUrl: "./chip-autocomplete.component.html",
  styleUrls: ["./chip-autocomplete.component.css"]
})
export class ChipAutocompleteComponent implements OnInit, OnDestroy {
  
  visible = true;
  selectable = true;  
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems: Observable<string[]>; // filtered list based on user input
  items: string[] = []; // current items list in control
  private allItems: string[] = ['C', 'C++', 'C#', 'C Sharp', 'C$', 'Java', 'ANgular', 'Azure', 'AWS', 'GCP', 'blah blah', 'Business Analyst',
'White Box', 'Black Box', 'Logic App'];

  isLoading = true;

  @Input() editable = true;
  @Input() filteredItemList: Observable<string[]>;
  @Input() currentItems: string[] = [];
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  @ViewChild("itemInput", { static: false }) itemInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: false }) matAutocomplete: MatAutocomplete;
  subscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.filteredItems = this.itemCtrl.valueChanges.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   map(item => (item && item.length >= 1 ? this._filter(item) : []))
    // );    

    this.subscription = this.itemCtrl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((itemName: string) =>  this.onSearch.emit(itemName));

    //this.subscription = this.itemCtrl.valueChanges.subscribe((itemName: string) =>  this.onSearch.emit(itemName));
  }

  add(event: MatChipInputEvent): void {
    // Add item only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our item
      if ((value || "").trim()) {
        if (!this.isDuplicateItem(value)) {
          this.items.push(value.trim());
        }
      }

      // Reset the input value
      if (input) {
        input.value = "";
      }

      this.itemCtrl.setValue(null);
    }
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.isDuplicateItem(event.option.viewValue)) {
      this.items.push(event.option.viewValue.trim());
    }

    this.itemInput.nativeElement.value = "";
    this.itemCtrl.setValue(null);
  }

  private isDuplicateItem(itemName: string): boolean {
    const itemsSmall: string[] = this.items.map(item => item.toLowerCase());
    if (!itemsSmall.includes(itemName.trim().toLowerCase())) {
      return false;
    }
    return true;
  }

  private _filter(value: string): string[] {
    const filterValue = value.trim().toLowerCase();

    return this.allItems.filter(
      item => item.toLowerCase().includes(filterValue) === true
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
