import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { JmsMessageFormComponent } from './features/messages/jms-message-form/jms-message-form.component';
import { PartnerFormComponent } from './features/partners/partner-form/partner-form.component';
import { PartnersComponent } from './features/partners/partners.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'messages/jms/new',
    component: JmsMessageFormComponent
  },
  {
    path: 'partners',
    component: PartnersComponent
  },
  {
    path: 'partners/new',
    component: PartnerFormComponent
  },
  {
    path: 'partners/:id/edit',
    component: PartnerFormComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
