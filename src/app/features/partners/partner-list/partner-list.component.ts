import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartnerService } from '../../../core/services/partner.service';
import { Partner } from '../../../shared/models/partner.model';

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="partner-list-container">
      <div class="header-actions">
        <button (click)="loadPartners()" class="btn btn-secondary">Refresh</button>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th class="col-id">ID</th>
              <th class="col-alias">Alias</th>
              <th class="col-type">Type</th>
              <th class="col-direction">Direction</th>
              <th class="col-app">Application</th>
              <th class="col-flow">Flow Type</th>
              <th class="col-desc">Description</th>
              <th class="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let partner of partners">
              <td>{{ partner.id }}</td>
              <td class="truncate-text" [title]="partner.alias">{{ partner.alias }}</td>
              <td>{{ partner.type }}</td>
              <td>{{ partner.direction }}</td>
              <td class="truncate-text" [title]="partner.application">{{ partner.application }}</td>
              <td>{{ partner.processedFlowType }}</td>
              <td class="truncate-text" [title]="partner.description">{{ partner.description }}</td>
              <td class="actions-cell">
                <a [routerLink]="['/partners', partner.id, 'edit']" class="btn btn-sm btn-primary">Edit</a>
                <button (click)="deletePartner(partner.id)" class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
            <tr *ngIf="partners.length === 0">
              <td colspan="8" class="empty-message">No partners found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .partner-list-container {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .header-actions {
      display: flex;
      justify-content: flex-end;
      padding: 8px;
      gap: 8px;
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
      max-width: 250px;
    }

    .col-id {
      width: 7%;
    }

    .col-alias {
      width: 12%;
    }

    .col-type {
      width: 10%;
    }

    .col-direction {
      width: 10%;
    }

    .col-app {
      width: 15%;
    }

    .col-flow {
      width: 12%;
    }

    .col-desc {
      width: 20%;
    }

    .col-actions {
      width: 14%;
      min-width: 120px;
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

    .empty-message {
      text-align: center;
      color: #7f8c8d;
      padding: 15px 0;
    }
  `]
})
export class PartnerListComponent implements OnInit {
  partners: Partner[] = [];

  constructor(private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerService.getPartners().subscribe(
      partners => this.partners = partners,
      error => console.error('Error loading partners:', error)
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
} 