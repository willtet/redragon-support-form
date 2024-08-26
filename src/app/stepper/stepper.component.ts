import { Component, ViewChild  } from '@angular/core';
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
    DuvidasComponent
],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  firstFormGroup: FormGroup;
  selectedForm: string | null = null;

  constructor(private _formBuilder: FormBuilder, private router: Router) {


    this.firstFormGroup = this._formBuilder.group({
      nomeCompleto: ['a', Validators.required],
      email: ['a', Validators.required],
      telefone: ['a', Validators.required],
    });
  }

  goToForm(form: string) {
    this.selectedForm = form;
    this.stepper.next();
  }
}
