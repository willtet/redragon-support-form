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
import { ErrorComponent } from "../error/error.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    EnviadoComponent,
    ErrorComponent,
    MatProgressSpinnerModule
],
  templateUrl: './revenda.component.html',
  styleUrl: './revenda.component.css'
})
export class RevendaComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stepper') stepperChild!: MatStepper;
  @Input({required: true}) formGroup!: FormGroup;
  @Input({required: true}) stepper!: MatStepper;
  public isLoading: boolean = false;
  public selectedForm: string | null = null;


  revendaForm = this._formBuilder.group({
    nomeLoja: ['', Validators.required],
    cnpj: ['', Validators.required],
    site: [''],
    whatsapp: [''],
    cidade: ['', Validators.required],
    inscricaoEstadual: ['', Validators.required],
    mensagemMarca: ['', Validators.required],
    observacao: ['', Validators.required]
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

    this.isLoading = true;

    const revenda = {
      ...this.formGroup.value,
      ...this.revendaForm.value
    };

    console.log(revenda)

    if (this.revendaForm.valid && this.formGroup.valid) {
      // Se o formulário for válido, envie os dados para o backend
      this.apiService.enviarRevenda(revenda).subscribe({
        next: (response) => {
          // Manipular resposta do backend
          this.selectedForm = 'enviado';
          this.cdr.detectChanges();
          this.stepperChild.next();
      },
      error: (err) => {
        this.selectedForm = 'erro';
        this.cdr.detectChanges();
        this.stepperChild.next();
      },
      complete: () => {
        this.isLoading = false; // Finaliza o carregamento
      },
      });
    } else {
      console.error('Formulário inválido');
    }

  }



  constructor(
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService) {}
}
