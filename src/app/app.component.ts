import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Clube Do Livro Waldorf';

  constructor(){
    console.log('Title: ',this.title);
  }
}
