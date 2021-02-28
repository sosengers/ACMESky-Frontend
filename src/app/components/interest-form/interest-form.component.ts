import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'interest-form',
  templateUrl: './interest-form.component.html',
  styleUrls: ['./interest-form.component.css']
})
export class InterestForm implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /// Da usare per fare task complicati all'inizializzazione della componenente.
    /// Cose che non dovrebbero andare fatte nel costruttore.
    console.log('InterestFormComponent OnInit');
  }

}
