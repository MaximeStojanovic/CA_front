import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageService } from '../../core/services/message.service';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="messages-container">
      <div class="page-header">
        <h2>Messages</h2>
        <div class="header-actions">
          <a routerLink="/messages/jms/new" class="btn btn-primary">Send New Message</a>
          <button (click)="loadMessages()" class="btn btn-secondary">Refresh</button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th class="col-id">ID</th>
                <th class="col-status">Status</th>
                <th class="col-content">Content</th>
                <th class="col-queue">Queue</th>
                <th class="col-type">Type</th>
                <th class="col-date">Created</th>
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
                <td>{{ message.type }}</td>
                <td>{{ message.createdAt | date:'short' }}</td>
                <td>{{ message.timestamp | date:'short' }}</td>
                <td class="actions-cell">
                  <button (click)="openMessageDetails(message)" class="btn btn-sm btn-primary">View</button>
                </td>
              </tr>
              <tr *ngIf="messages.length === 0">
                <td colspan="8" class="empty-message">No messages found</td>
              </tr>
            </tbody>
          </table>
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
    .messages-container {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 8px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      flex-shrink: 0;
    }

    .page-header h2 {
      margin: 0;
      font-size: 20px;
      color: #333;
    }

    .header-actions {
      display: flex;
      gap: 8px;
    }

    .card {
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
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

    .truncate-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .col-id {
      width: 8%;
    }

    .col-status {
      width: 7%;
    }

    .col-content {
      width: 20%;
    }

    .col-queue {
      width: 15%;
    }

    .col-type {
      width: 10%;
    }
    
    .col-date {
      width: 13%;
    }
    
    .col-timestamp {
      width: 13%;
    }

    .col-actions {
      width: 6%;
      min-width: 70px;
    }

    .data-table th {
      font-weight: 600;
      color: #555;
      font-size: 13px;
      background-color: #f8f9fa;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .data-table tbody tr:hover {
      background-color: #f5f5f5;
    }

    .actions-cell {
      white-space: nowrap;
    }

    .btn {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 3px;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition: background-color 0.3s ease;
    }

    .btn-primary {
      background-color: #3498db;
      color: white;
    }

    .btn-primary:hover {
      background-color: #2980b9;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    
    .btn-secondary:hover {
      background-color: #5a6268;
    }

    .btn-danger {
      background-color: #e74c3c;
      color: white;
    }

    .btn-danger:hover {
      background-color: #c0392b;
    }

    .btn-sm {
      padding: 3px 6px;
      font-size: 12px;
      margin-right: 4px;
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
  `]
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  selectedMessage: Message | null = null;
  showModal = false;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe(
      messages => this.messages = messages,
      error => console.error('Error loading messages:', error)
    );
  }

  openMessageDetails(message: Message): void {
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