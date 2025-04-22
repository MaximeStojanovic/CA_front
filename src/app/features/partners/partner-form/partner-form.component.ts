import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService } from '../../../core/services/partner.service';
import { Partner, PartnerType, Direction, ProcessedFlowType } from '../../../shared/models/partner.model';

@Component({
  selector: 'app-partner-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.scss']
})
export class PartnerFormComponent implements OnInit {
  partner: Partner = {
    id: '',
    alias: '',
    type: PartnerType.INTERNAL,
    direction: Direction.INBOUND,
    application: '',
    processedFlowType: ProcessedFlowType.MESSAGE,
    description: ''
  };
  isEdit = false;
  partnerTypes = Object.values(PartnerType);
  directions = Object.values(Direction);
  flowTypes = Object.values(ProcessedFlowType);

  constructor(
    private partnerService: PartnerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.partnerService.getPartner(id).subscribe(
        partner => this.partner = partner,
        error => console.error('Error loading partner:', error)
      );
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.partnerService.updatePartner(this.partner.id, this.partner).subscribe(
        () => this.router.navigate(['/partners']),
        error => console.error('Error updating partner:', error)
      );
    } else {
      this.partnerService.createPartner(this.partner).subscribe(
        () => this.router.navigate(['/partners']),
        error => console.error('Error creating partner:', error)
      );
    }
  }
} 