import { Component, ViewChild, OnInit } from '@angular/core';
import { ChipAutocompleteComponent } from './chip-autocomplete/chip-autocomplete.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'storeapp';

  @ViewChild('chipAutocomplete', { static: false }) chipAutocomplete: ChipAutocompleteComponent;

  ngOnInit() {
   
     
  }

  onSearch(skillName: string): void {
   console.log(skillName);
 
  }

  onClick() {
    console.log(this.chipAutocomplete.items);
    //this.chipAutocomplete.filteredItems = of(['ss', 'kk', 'dd']);
  }
}
