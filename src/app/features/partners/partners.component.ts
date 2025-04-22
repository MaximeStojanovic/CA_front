import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerFormComponent } from './partner-form/partner-form.component';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, RouterModule, PartnerListComponent, PartnerFormComponent],
  template: `
    <div class="partners-container">
      <div class="page-header">
        <a routerLink="/" class="btn btn-secondary back-button">← Back</a>
        <h2 class="page-title">Partners Management Dashboard</h2>
        <div class="spacer"></div>
      </div>
      
      <div class="partners-grid">
        <div class="list-container">
          <div class="section-header">
            <h3>Partners List</h3>
          </div>
          <app-partner-list></app-partner-list>
        </div>
        
        <div class="form-container">
          <div class="section-header">
            <h3>Add Partner</h3>
          </div>
          <app-partner-form></app-partner-form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .partners-container {
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
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
    }
    
    .page-title {
      margin: 0;
      font-size: 20px;
      color: #333;
      text-align: center;
      flex-grow: 1;
      font-weight: 600;
    }
    
    .back-button {
      font-size: 14px;
      min-width: 80px;
    }
    
    .spacer {
      min-width: 80px;
    }
    
    .partners-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      flex: 1;
      overflow: auto;
    }
    
    .list-container, .form-container {
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .section-header {
      padding: 10px 12px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #eee;
    }
    
    .section-header h3 {
      margin: 0;
      font-size: 16px;
      color: #2c3e50;
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

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    
    .btn-secondary:hover {
      background-color: #5a6268;
    }
    
    @media (min-width: 768px) {
      .partners-grid {
        grid-template-columns: 3fr 2fr;
      }
    }
  `]
})
export class PartnersComponent {
} 