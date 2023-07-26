import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { HttpClientModule} from '@angular/common/http';
import { Nl2brPipe } from './pipes/nl2br.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    Nl2brPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    Nl2brPipe
  ]
})
export class SharedModule { }
