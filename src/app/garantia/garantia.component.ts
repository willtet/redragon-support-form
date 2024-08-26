import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule, Location  } from '@angular/common';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';

@Component({
  selector: 'app-garantia',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    NgxFileDropModule
  ],
  templateUrl: './garantia.component.html',
  styleUrl: './garantia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarantiaComponent {

  @Input() formGroup!: FormGroup;
  @Input() stepper!: MatStepper;
  file: File | null = null;

  formats: string = ".png .jpg .pdf";
  multiple: boolean = true;


  goBack(): void {
    this.garantiaForm.reset();
    this.garantiaForm2.reset();
    this.garantiaForm3.reset();
    this.garantiaForm4.reset();
    this.garantiaForm5.reset();
    this.garantiaForm6.reset();


    this.stepper.previous();
  }

  public onFileDropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      // Verifica se é um arquivo
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Aqui você pode acessar o arquivo e armazená-lo em uma variável
          this.file = file;
          console.log(file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log('Dropped file is a directory', fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log('Arquivo sobre a área de drop:', event);
  }

  public fileLeave(event: any) {
    console.log('Arquivo saiu da área de drop:', event);
  }





  garantiaForm = this._formBuilder.group({
    nome: ['a', Validators.required],
    serie: ['a', Validators.required],
  });

  garantiaForm2 = this._formBuilder.group({
    mensagem: ['a', Validators.required]
  });

  garantiaForm3 = this._formBuilder.group({
    dataCompra: ['a', Validators.required]
  });

  garantiaForm4 = this._formBuilder.group({
    file: ['']
  });

  garantiaForm5 = this._formBuilder.group({
    file: ['']
  });

  garantiaForm6 = this._formBuilder.group({
    mensagem: ['', Validators.required]
  });




  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();

  submit(){
    const garantia = {
      ...this.garantiaForm.value,
      ...this.garantiaForm2.value,
      ...this.garantiaForm3.value,
      ...this.garantiaForm4.value,
      ...this.garantiaForm5.value,
      ...this.garantiaForm6.value
    }

    const dados = {
      ...this.formGroup.value,
      garantia
    }
    console.log(dados)
  }

  constructor(private _formBuilder: FormBuilder, private route:ActivatedRoute, private router:Router, private location: Location) {}
}
