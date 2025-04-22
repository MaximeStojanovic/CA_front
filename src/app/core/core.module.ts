import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JmsService } from '../services/jms.service';
import { MessageService } from '../services/message.service';
import { PartnerService } from '../services/partner.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    JmsService,
    MessageService,
    PartnerService
  ]
})
export class CoreModule { } 