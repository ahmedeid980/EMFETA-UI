import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-commercial-transactions',
  templateUrl: './commercial-transactions.component.html',
  styleUrls: ['./commercial-transactions.component.scss']
})
export class CommercialTransactionsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
