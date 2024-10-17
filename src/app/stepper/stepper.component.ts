import { Component, ViewChild, ChangeDetectorRef  } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { GarantiaComponent } from '../garantia/garantia.component';
import { CommonModule } from '@angular/common';
import { SoftwareComponent } from "../software/software.component";
import { DuvidasComponent } from "../duvidas/duvidas.component";
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { ParceriasComponent } from "../parcerias/parcerias.component";
import { RevendaComponent } from "../revenda/revenda.component";
import { OutrosComponent } from "../outros/outros.component";

@Component({
  selector: 'app-stepper',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    GarantiaComponent,
    SoftwareComponent,
    DuvidasComponent,
    ParceriasComponent,
    RevendaComponent,
    OutrosComponent
],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  firstFormGroup: FormGroup;
  selectedForm: string | null = null;

  constructor(private _formBuilder: FormBuilder, private router: Router, private cdr: ChangeDetectorRef) {


    this.firstFormGroup = this._formBuilder.group({
      nomeCompleto: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  goToForm(form: string) {
    console.log('Selected form:', form);
    this.selectedForm = form;
    this.cdr.detectChanges();
    this.stepper.next();
  }
}
