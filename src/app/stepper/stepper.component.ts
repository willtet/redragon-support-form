import { Component, ViewChild  } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { GarantiaComponent } from '../garantia/garantia.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    GarantiaComponent
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  firstFormGroup: FormGroup;
  secondFormGroupA: FormGroup;
  secondFormGroupB: FormGroup;
  secondFormGroupC: FormGroup;
  thirdFormGroup: FormGroup;
  selectedForm: string | null = null;

  constructor(private _formBuilder: FormBuilder) {


    this.firstFormGroup = this._formBuilder.group({
      nomeCompleto: ['a', Validators.required],
      email: ['a', Validators.required],
      telefone: ['a', Validators.required],
    });
    this.secondFormGroupA = this._formBuilder.group({

    });
    this.secondFormGroupB = this._formBuilder.group({
      secondCtrlB: ['', Validators.required]
    });
    this.secondFormGroupC = this._formBuilder.group({
      secondCtrlC: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  goToForm(form: string) {
    this.selectedForm = form;
    console.log(this.firstFormGroup);
    this.stepper.next();
  }

  submitForm() {
    if (this.thirdFormGroup.valid) {
      console.log('Formulário enviado!');
    }
  }
}
