import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartnerService } from '../../core/services/partner.service';
import { MessageService } from '../../core/services/message.service';
import { Partner } from '../../shared/models/partner.model';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h2 class="page-title">Dashboard</h2>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card partners-card">
          <div class="card-header">
            <h3>Partners</h3>
            <div class="header-actions">
              <a routerLink="/partners" class="view-all">View All</a>
              <button (click)="loadPartners()" class="btn btn-sm btn-secondary">Refresh</button>
            </div>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Alias</th>
                  <th>Type</th>
                  <th>Direction</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let partner of partners">
                  <td>{{ partner.alias }}</td>
                  <td>{{ partner.type }}</td>
                  <td>{{ partner.direction }}</td>
                  <td class="actions-cell">
                    <button (click)="deletePartner(partner.id)" class="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
                <tr *ngIf="partners.length === 0">
                  <td colspan="4" class="empty-message">No partners found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="dashboard-card messages-card">
          <div class="card-header">
            <h3>Messages</h3>
            <div class="header-actions">
              <a routerLink="/messages/jms/new" class="btn btn-sm btn-success">+ Send New</a>
              <button (click)="loadMessages()" class="btn btn-sm btn-secondary">Refresh</button>
            </div>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="col-id">ID</th>
                  <th class="col-status">Status</th>
                  <th class="col-content">Content</th>
                  <th class="col-queue">Queue</th>
                  <th class="col-timestamp">Timestamp</th>
                  <th class="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let message of messages">
                  <td class="truncate-text" [title]="message.id">{{ message.id }}</td>
                  <td>
                    <span class="status-badge" [ngClass]="{'status-unread': message.status === 'UNREAD', 'status-read': message.status === 'READ'}">
                      {{ message.status }}
                    </span>
                  </td>
                  <td class="truncate-text" [title]="message.content">{{ message.content }}</td>
                  <td class="truncate-text" [title]="message.queueName">{{ message.queueName }}</td>
                  <td>{{ message.timestamp | date:'short' }}</td>
                  <td class="actions-cell">
                    <button (click)="viewMessageDetails(message)" class="btn btn-sm btn-primary">View</button>
                  </td>
                </tr>
                <tr *ngIf="messages.length === 0">
                  <td colspan="6" class="empty-message">No messages found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" *ngIf="showModal">
      <div class="modal-content">
        <span class="close" (click)="closeModal()">&times;</span>
        <h3>Message Details</h3>
        <div class="message-details" *ngIf="selectedMessage">
          <p><strong>ID:</strong> {{ selectedMessage.id }}</p>
          <p><strong>Status:</strong> {{ selectedMessage.status }}</p>
          <p><strong>Type:</strong> {{ selectedMessage.type }}</p>
          <p><strong>Content:</strong> {{ selectedMessage.content }}</p>
          <p><strong>Queue:</strong> {{ selectedMessage.queueName }}</p>
          <p><strong>Created At:</strong> {{ selectedMessage.createdAt | date:'medium' }}</p>
          <p><strong>Timestamp:</strong> {{ selectedMessage.timestamp | date:'medium' }}</p>
          <div *ngIf="selectedMessage.metadata">
            <p><strong>Metadata:</strong></p>
            <pre>{{ selectedMessage.metadata | json }}</pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 8px;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .dashboard-header {
      display: flex;
      justify-content: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
    }
    
    .page-title {
      margin: 0;
      font-size: 22px;
      color: #333;
      text-align: center;
      font-weight: 600;
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      flex: 1;
      overflow: auto;
    }
    
    .dashboard-card {
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 12px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #eee;
      flex-shrink: 0;
    }
    
    .card-header h3 {
      margin: 0;
      font-size: 16px;
      color: #2c3e50;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .view-all {
      color: #3498db;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
    }
    
    .view-all:hover {
      text-decoration: underline;
    }
    
    .table-container {
      overflow: auto;
      flex: 1;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    
    .data-table th, .data-table td {
      padding: 8px 10px;
      text-align: left;
      border-bottom: 1px solid #eee;
      overflow: hidden;
      word-wrap: break-word;
    }
    
    .data-table th {
      font-weight: 600;
      color: #555;
      font-size: 13px;
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 10;
    }
    
    .data-table tbody tr:hover {
      background-color: #f5f5f5;
    }
    
    .actions-cell {
      white-space: nowrap;
    }
    
    .btn-sm {
      padding: 3px 6px;
      font-size: 12px;
      margin-right: 4px;
      border-radius: 3px;
    }
    
    .status-badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 500;
    }
    
    .status-unread {
      background-color: #3498db;
      color: white;
    }
    
    .status-read {
      background-color: #7f8c8d;
      color: white;
    }
    
    .truncate-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .col-id {
      width: 15%;
    }
    
    .col-status {
      width: 12%;
    }
    
    .col-content {
      width: 25%;
    }
    
    .col-queue {
      width: 20%;
    }
    
    .col-timestamp {
      width: 18%;
    }
    
    .col-actions {
      width: 10%;
    }
    
    .empty-message {
      text-align: center;
      color: #7f8c8d;
      padding: 15px 0;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
      position: relative;
      max-height: 80vh;
      overflow-y: auto;
    }

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 24px;
      cursor: pointer;
    }

    .message-details {
      margin-top: 15px;
    }

    .message-details p {
      margin-bottom: 8px;
    }

    .message-details pre {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
      margin-top: 5px;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    
    .btn-secondary:hover {
      background-color: #5a6268;
    }

    .btn-success {
      background-color: #28a745;
      color: white;
    }
    
    .btn-success:hover {
      background-color: #218838;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #0069d9;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    
    .btn-danger:hover {
      background-color: #c82333;
    }
    
    @media (min-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  partners: Partner[] = [];
  messages: Message[] = [];
  selectedMessage: Message | null = null;
  showModal = false;

  constructor(
    private partnerService: PartnerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPartners();
    this.loadMessages();
  }

  loadPartners(): void {
    this.partnerService.getPartners().subscribe(
      partners => this.partners = partners.slice(0, 5), // Show only first 5
      error => console.error('Error loading partners:', error)
    );
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe(
      messages => this.messages = messages.slice(0, 5), // Show only first 5
      error => console.error('Error loading messages:', error)
    );
  }

  deletePartner(id: string): void {
    if (confirm('Are you sure you want to delete this partner?')) {
      this.partnerService.deletePartner(id).subscribe(
        () => {
          this.partners = this.partners.filter(partner => partner.id !== id);
        },
        error => console.error('Error deleting partner:', error)
      );
    }
  }

  viewMessageDetails(message: Message): void {
    this.selectedMessage = message;
    this.showModal = true;
    
    // Mark the message as read if it's unread
    if (message.status === 'UNREAD') {
      this.messageService.markAsRead(message.id).subscribe(
        updatedMessage => {
          const index = this.messages.findIndex(m => m.id === message.id);
          if (index !== -1) {
            this.messages[index] = updatedMessage;
          }
        },
        error => console.error('Error marking message as read:', error)
      );
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedMessage = null;
  }
} 