import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PascalCasePipe } from 'src/app/pipes/pascal-case.pipe';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    ModalMessageComponent,
    ModalComponent,
    AnimalCardComponent,
    PascalCasePipe,
    ContactFormComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    ModalMessageComponent,
    ModalComponent,
    AnimalCardComponent,
    ContactFormComponent,
  ],
})
export class SharedModule {}
