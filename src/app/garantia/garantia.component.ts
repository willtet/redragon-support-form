import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @Input() formGroup!: FormGroup;
  @Input() stepper!: MatStepper;
  public files: NgxFileDropEntry[] = [];
  public allowedExtensions: string[] = ['jpg', 'jpeg', 'png', 'pdf'];

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
          const fileExtension = file.name.split('.').pop()?.toLowerCase();

          if (this.allowedExtensions.includes(fileExtension || '')) {
            // Se for um arquivo permitido, adiciona à lista
            this.files.push(droppedFile);
          } else {
            console.warn(`Arquivo com extensão .${fileExtension} não permitido.`);
          }

          this.cdr.detectChanges();
        });
      } else {
        console.warn(`O item ${droppedFile.relativePath} é um diretório e não pode ser enviado.`);

      }
    }
  }

  public fileOver(event: any) {
    console.log('Arquivo sobre a área de drop:', event);
  }

  public fileLeave(event: any) {
    console.log('Arquivo saiu da área de drop:', event);
  }

  public openFileSelector(event: any): void {
    event.preventDefault()
    this.fileInput.nativeElement.click();
  }

  public onFilesSelected(event: any): void {
    const files: NgxFileDropEntry[] = Array.from(event.target.files as File[]).map((file: File) => {
      return {
        fileEntry: {
          isFile: true,
          isDirectory: false,
          name: file.name,
          file: (callback: (file: File) => void) => callback(file),
        } as FileSystemFileEntry,
        relativePath: file.name
      };
    });

    this.onFileDropped(files);
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
    file: this.files
  });

  garantiaForm5 = this._formBuilder.group({
    file: this.files
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

    const formData = new FormData();

    // Adiciona dados do formulário
    for (const [key, value] of Object.entries(dados)) {
      if (Array.isArray(value)) {
        // Se for uma lista de arquivos, adicione cada arquivo individualmente
        value.forEach((file: NgxFileDropEntry) => {
          if (file.fileEntry.isFile) {
            const fileEntry = file.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
              formData.append('files[]', file, file.name);
            });
          }
        });
      } else if (typeof value === 'string' || value instanceof Blob) {
        // Se for uma string ou um Blob, pode adicionar diretamente
        formData.append(key, value);
      } else if (typeof value === 'number') {
        // Se for um número, converta para string
        formData.append(key, value.toString());
      }
    }

    console.log(formData);

  }

  constructor(
    private _formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private location: Location,
    private cdr: ChangeDetectorRef) {}
}
