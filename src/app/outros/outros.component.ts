import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { NgxFileDropModule } from 'ngx-file-drop';
import { EnviadoComponent } from '../enviado/enviado.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-outros',
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
  templateUrl: './outros.component.html',
  styleUrl: './outros.component.css'
})
export class OutrosComponent {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stepper') stepperChild!: MatStepper;
  @Input({required: true}) formGroup!: FormGroup;
  @Input({required: true}) stepper!: MatStepper;
  private httpClient = inject(HttpClient);



  goBack(): void {
    this.outrosForm.reset();

    this.stepper.previous();
  }

  outrosForm = this._formBuilder.group({
    duvida: ['', Validators.required]
  });



  submit() {
    const outros = {
        ...this.formGroup.value,
        ...this.outrosForm.value
    };

    console.log(outros);
    this.stepperChild.next();
  }


  onSubmit(): void {
    if (this.formGroup.valid) {
      // Se o formulário for válido, envie os dados para o backend
      this.apiService.enviarDados(this.formGroup.value).subscribe({
        next: (response) => {

        },
        error: (err) => {
          console.error('Erro ao enviar dados:', err);
        }
      });
    } else {
      console.error('Formulário inválido');
    }

    this.stepperChild.next();
  }


  constructor(
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService) {}

}
