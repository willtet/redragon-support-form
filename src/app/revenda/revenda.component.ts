import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EnviadoComponent } from '../enviado/enviado.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-revenda',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
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
  templateUrl: './revenda.component.html',
  styleUrl: './revenda.component.css'
})
export class RevendaComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stepper') stepperChild!: MatStepper;
  @Input({required: true}) formGroup!: FormGroup;
  @Input({required: true}) stepper!: MatStepper;


  revendaForm = this._formBuilder.group({
    nomeLoja: ['a', Validators.required],
    cnpj: ['a', Validators.required],
    site: ['a'],
    whatsapp: ['a'],
    cidade: ['a', Validators.required],
    inscricaoEstadual: ['a', Validators.required],
    mensagemMarca: ['a', Validators.required],
    observacao: ['a', Validators.required]
  });

  goBack(): void {
    this.revendaForm.reset();

    this.stepper.previous();
  }

  submit() {
    const garantia = {
        ...this.formGroup.value,
        ...this.revendaForm.value,
    };



    console.log(garantia);
    this.cdr.detectChanges();
    this.stepperChild.next();
  }

  onSubmit(): void {

    const revenda = {
      ...this.formGroup.value,
      ...this.revendaForm.value
    };

    console.log(revenda)

    if (this.revendaForm.valid && this.formGroup.valid) {
      // Se o formulário for válido, envie os dados para o backend
      this.apiService.enviarRevenda(revenda).subscribe({
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
