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
import { EnviadoComponent } from "../enviado/enviado.component";

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
    NgxFileDropModule,
    EnviadoComponent
  ],
  templateUrl: './garantia.component.html',
  styleUrl: './garantia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarantiaComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stepper') stepperChild!: MatStepper;
  @Input({required: true}) formGroup!: FormGroup;
  @Input({required: true}) stepper!: MatStepper;
  public fotos: NgxFileDropEntry[] = [];
  public notaFiscal: NgxFileDropEntry[] = [];

  public allowedExtensions: string[] = ['jpg', 'jpeg', 'png', 'pdf'];
  public selectedForm: string | null = null;

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

  public onFileDropped(files: NgxFileDropEntry[], fileType: 'fotos' | 'notaFiscal') {
  for (const droppedFile of files) {
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (this.allowedExtensions.includes(fileExtension || '')) {
          if (fileType === 'fotos') {
            this.fotos.push(droppedFile); // Adiciona à lista de fotos
          } else if (fileType === 'notaFiscal') {
            this.notaFiscal.push(droppedFile); // Adiciona à lista de nota fiscal
          }
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

  public onFilesSelected(event: any, fileType: 'fotos' | 'notaFiscal'): void {
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

    this.onFileDropped(files, fileType);
  }





  garantiaForm = this._formBuilder.group({
    nome: ['a', Validators.required],
    serie: ['a', Validators.required],
  });

  public garantiaForm2 = this._formBuilder.group({
    descricao: ['teste', Validators.required]
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

  submit() {
    const garantia = {
        ...this.formGroup.value,
        ...this.garantiaForm.value,
        ...this.garantiaForm2.value,
        ...this.garantiaForm3.value,
        ...this.garantiaForm6.value
    };

    // Estrutura do objeto que você deseja
    const response = {
        ...garantia,
        fotos: [],
        notaFiscal: []
    };

    // Função para ler um arquivo e retornar como array de bytes
    const readFileAsBytes = (file: File): Promise<{ name: string; type: string; size: number; bytes: Uint8Array }> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                const bytes = new Uint8Array(arrayBuffer);
                resolve({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    bytes: bytes
                });
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsArrayBuffer(file);
        });
    };

    // Lê arquivos de fotos
    const fotoPromises = this.fotos.map((file: NgxFileDropEntry) => {
        if (file.fileEntry.isFile) {
          const fileEntry = file.fileEntry as FileSystemFileEntry;
          return fileEntry.file((realFile: File) => {
              return readFileAsBytes(realFile).then((fileData) => {
                  response.fotos.push(fileData);
              });
          });
        }
        return Promise.resolve();
    });

    // Lê arquivos de nota fiscal e adiciona como bytes
    const notaFiscalPromises = this.notaFiscal.map((file: NgxFileDropEntry) => {
        if (file.fileEntry.isFile) {
            const fileEntry = file.fileEntry as FileSystemFileEntry;
            return fileEntry.file((realFile: File) => {
                return readFileAsBytes(realFile).then((fileData) => {
                    response.notaFiscal.push(fileData);
                });
            });
        }
        return Promise.resolve();
    });

    // Espera que todos os arquivos sejam lidos
    Promise.all([...fotoPromises, ...notaFiscalPromises]).then(() => {
        // Enviar a resposta para o backend ou para onde for necessário
        console.log(response); // Verificar a estrutura do objeto


    });


    this.selectedForm = 'enviado';
    this.cdr.detectChanges();
    this.stepperChild.next();
  }

  constructor(
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) {}
}
