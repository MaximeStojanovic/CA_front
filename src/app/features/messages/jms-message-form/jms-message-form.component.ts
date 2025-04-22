import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JmsService } from '../../../core/services/jms.service';
import { JmsMessage } from '../../../shared/models/jms-message.model';

@Component({
  selector: 'app-jms-message-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './jms-message-form.component.html',
  styleUrls: ['./jms-message-form.component.scss']
})
export class JmsMessageFormComponent {
  message: JmsMessage = {
    content: '',
    destination: '',
    properties: {}
  };

  newPropertyKey: string = '';
  newPropertyValue: string = '';

  constructor(
    private jmsService: JmsService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.jmsService.sendMessage(this.message).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => console.error('Error sending message:', error)
    );
  }

  addProperty(): void {
    if (this.newPropertyKey && this.newPropertyValue) {
      this.message.properties = this.message.properties || {};
      this.message.properties[this.newPropertyKey] = this.newPropertyValue;
      this.newPropertyKey = '';
      this.newPropertyValue = '';
    }
  }

  removeProperty(key: string): void {
    if (this.message.properties) {
      delete this.message.properties[key];
    }
  }

  getPropertyKeys(): string[] {
    if (!this.message.properties) {
      return [];
    }
    return Object.keys(this.message.properties);
  }
} 
