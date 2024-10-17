import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { EnviadoComponent } from "../enviado/enviado.component";

@Component({
  selector: 'app-duvidas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    NgxFileDropModule,
    EnviadoComponent
],
  templateUrl: './duvidas.component.html',
  styleUrl: './duvidas.component.css'
})
export class DuvidasComponent {

  @ViewChild('stepper') stepperChild!: MatStepper;
  @Input({required: true}) formGroup!: FormGroup;
  @Input({required: true}) stepper!: MatStepper;

  public selectedForm: string | null = null;


  goBack(): void {
    this.duvidaForm.reset();
    this.duvidaForm2.reset();
    this.duvidaForm3.reset();
    this.duvidaForm4.reset();

    this.stepper.previous();
  }





  duvidaForm = this._formBuilder.group({
    nome: ['a', Validators.required],
    serie: ['a', Validators.required],
  });

  duvidaForm2 = this._formBuilder.group({
    problemaDetalhado: ['a', Validators.required]
  });

  duvidaForm3 = this._formBuilder.group({
    dataCompra: ['a', Validators.required]
  });

  duvidaForm4 = this._formBuilder.group({
    problemaResumo: ['a', Validators.required]
  });


  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();



  submit() {
    const duvidas = {
      ...this.formGroup.value,
      ...this.duvidaForm.value,
      ...this.duvidaForm2.value,
      ...this.duvidaForm3.value,
      ...this.duvidaForm4.value
    }
    // Estrutura do objeto que você deseja
    const response = {
        ...duvidas
    };

    console.log(response);
    this.selectedForm = 'enviado';
    this.cdr.detectChanges();
    this.stepperChild.next();
  }


  constructor(private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) {}

}
