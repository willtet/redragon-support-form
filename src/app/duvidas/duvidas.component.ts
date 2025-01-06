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
import { ApiService } from '../api-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorComponent } from '../error/error.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    EnviadoComponent,
    MatProgressSpinnerModule,
    ErrorComponent,
    MatIconModule,
    MatTooltipModule
],
  templateUrl: './duvidas.component.html',
  styleUrl: './duvidas.component.css'
})
export class DuvidasComponent {

  @ViewChild('stepper') stepperChild!: MatStepper;
  @Input({required: true}) formGroup!: FormGroup;
  @Input({required: true}) stepper!: MatStepper;

  public selectedForm: string | null = null;
  public isLoading: boolean = false;


  goBack(): void {
    this.duvidaForm.reset();
    this.duvidaForm2.reset();
    this.duvidaForm3.reset();
    this.duvidaForm4.reset();

    this.stepper.previous();
  }





  duvidaForm = this._formBuilder.group({
    nomeProduto: ['', Validators.required],
    serieProduto: ['', Validators.required],
  });

  duvidaForm2 = this._formBuilder.group({
    problemaDetalhado: ['', Validators.required]
  });

  duvidaForm3 = this._formBuilder.group({
    dataCompra: ['', Validators.required]
  });

  duvidaForm4 = this._formBuilder.group({
    problemaResumo: ['', Validators.required]
  });


  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();



  submit() {
    this.isLoading = true;

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

    if (this.formGroup.valid && this.duvidaForm.valid && this.duvidaForm2.valid && this.duvidaForm3.valid && this.duvidaForm4.valid) {
      // Se o formulário for válido, envie os dados para o backend
      this.apiService.enviarDuvida(response).subscribe({
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
    }
  }


  constructor(private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService) {}

}
