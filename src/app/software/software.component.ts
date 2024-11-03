import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { EnviadoComponent } from '../enviado/enviado.component';
import { ApiService } from '../api-service.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-software',
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
    MatIconModule
  ],
  templateUrl: './software.component.html',
  styleUrl: './software.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoftwareComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stepper') stepperChild!: MatStepper;
  @Input({required: true}) formGroup!: FormGroup;
  @Input({required: true}) stepper!: MatStepper;
  public fotos: NgxFileDropEntry[] = [];
  public problema: NgxFileDropEntry[] = [];
  public fileLimitExceeded: boolean = false;

  public allowedExtensions: string[] = ['jpg', 'jpeg', 'png', 'pdf'];
  public selectedForm: string | null = null;

  formats: string = ".png .jpg .pdf";
  multiple: boolean = true;

  goBack(): void {
    this.softwareForm.reset();
    this.softwareForm2.reset();
    this.softwareForm3.reset();
    this.softwareForm4.reset();
    this.softwareForm5.reset();
    this.softwareForm6.reset();
    this.softwareForm7.reset();
    this.softwareForm8.reset();
    this.softwareForm9.reset();
    this.stepper.previous();
  }

  public onFileDropped(files: NgxFileDropEntry[], fileType: 'fotos' | 'problema') {
    const maxFiles = 3;

    if ((fileType === 'fotos' && this.fotos.length >= maxFiles) || (fileType === 'problema' && this.problema.length >= maxFiles)) {
      console.warn('Limite de arquivos atingido.');
      this.fileLimitExceeded = true; // Ativa a mensagem de limite
      return;
    }

  for (const droppedFile of files) {
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (this.allowedExtensions.includes(fileExtension || '')) {
          if (fileType === 'fotos') {
            this.fotos.push(droppedFile); // Adiciona à lista de fotos
          } else if (fileType === 'problema') {
            this.problema.push(droppedFile); // Adiciona à lista de nota fiscal
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

  this.fileLimitExceeded = false;
}

  public fileOver(event: any) {
    console.log('Arquivo sobre a área de drop:', event);
  }

  public fileLeave(event: any) {
    console.log('Arquivo saiu da área de drop:', event);
  }

  public openFileSelector(event: Event, fileType: 'fotos' | 'problema'): void {
    event.preventDefault();
    this.fileInput.nativeElement.onchange = (e: any) => {
        this.onFilesSelected(e, fileType);
    };
    this.fileInput.nativeElement.click();
}

  public onFilesSelected(event: any, fileType: 'fotos' | 'problema'): void {
    const maxFiles = 3;

    if ((fileType === 'fotos' && this.fotos.length >= maxFiles) || (fileType === 'problema' && this.problema.length >= maxFiles)) {
        this.fileLimitExceeded = true; // Ativa a mensagem de limite
        return;
    }

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

    // Filtra arquivos duplicados
    const filteredFiles = files.filter(newFile => {
        const fileName = newFile.relativePath;
        if (fileType === 'fotos') {
            return !this.fotos.some(existingFile => existingFile.relativePath === fileName);
        } else if (fileType === 'problema') {
            return !this.problema.some(existingFile => existingFile.relativePath === fileName);
        }
        return true;
    });

    // Adiciona apenas os arquivos filtrados (sem duplicatas)
    this.onFileDropped(filteredFiles, fileType);
    this.fileLimitExceeded = false;
  }


  public removeFile(fileName: string, fileType: 'fotos' | 'problema'): void {
    if (fileType === 'fotos') {
      this.fotos = this.fotos.filter(file => file.relativePath !== fileName); // Remove o arquivo de fotos
    } else if (fileType === 'problema') {
      this.problema = this.problema.filter(file => file.relativePath !== fileName); // Remove o arquivo de nota fiscal
    }

    // Se o limite foi excedido anteriormente, reseta a mensagem
    if (this.fileLimitExceeded && (this.fotos.length < 3 && this.problema.length < 3)) {
      this.fileLimitExceeded = false;
    }

    this.cdr.detectChanges(); // Atualiza a view
  }





  softwareForm = this._formBuilder.group({
    nomeProduto: ['a', Validators.required],
    serieProduto: ['a', Validators.required],
  });

  softwareForm2 = this._formBuilder.group({
    fotos: ['']
  });

  softwareForm3 = this._formBuilder.group({
    mensagemOS: ['', Validators.required]
  });

  softwareForm4 = this._formBuilder.group({
    mensagemSpec: ['', Validators.required]
  });

  softwareForm5 = this._formBuilder.group({
  });

  softwareForm6 = this._formBuilder.group({
    mensagemProblema: ['', Validators.required]
  });

  softwareForm7 = this._formBuilder.group({
    problema: []
  });

  softwareForm8 = this._formBuilder.group({
    comecoProblema: ['a', Validators.required]
  });

  softwareForm9 = this._formBuilder.group({
    mudancaOS: ['', Validators.required]
  });


  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();


  submit(){

    const software = {
        ...this.formGroup.value,
        ...this.softwareForm.value,
        ...this.softwareForm3.value,
        ...this.softwareForm4.value,
        ...this.softwareForm6.value,
        ...this.softwareForm8.value,
        ...this.softwareForm9.value
    };

    // Estrutura do objeto que você deseja
    const response = {
        ...software,
        fotos: [],
        problema: []
    };

    const readFileAsBytes = (file: File): Promise<{ name: string; type: string; size: number; base64: string }> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
              const arrayBuffer = event.target?.result as ArrayBuffer;
              const bytes = new Uint8Array(arrayBuffer);

              // Converte array de bytes para string base64
              const binaryString = bytes.reduce((data, byte) => data + String.fromCharCode(byte), '');
              const base64String = btoa(binaryString);

              resolve({
                  name: file.name,
                  type: file.type,
                  size: file.size,
                  base64: base64String
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
    const problemaPromises = this.problema.map((file: NgxFileDropEntry) => {
        if (file.fileEntry.isFile) {
            const fileEntry = file.fileEntry as FileSystemFileEntry;
            return fileEntry.file((realFile: File) => {
                return readFileAsBytes(realFile).then((fileData) => {
                    response.problema.push(fileData);
                });
            });
        }
        return Promise.resolve();
    });

    // Espera que todos os arquivos sejam lidos
    Promise.all([...fotoPromises, ...problemaPromises]).then(() => {
        // Enviar a resposta para o backend ou para onde for necessário
        console.log(response); // Verificar a estrutura do objeto
        if (this.formGroup.valid) {  // Checa a validade do formGroup
          // Se o formulário for válido, envie os dados para o backend
          this.apiService.enviarSoftware(response).subscribe({
              next: (response) => {
                  // Manipular resposta do backend
              },
              error: (err) => {
                  console.error('Erro ao enviar dados:', err);
              }
          });
      } else {
          console.error('Formulário inválido');
      }

    });


    this.selectedForm = 'enviado';
    this.cdr.detectChanges();
    this.stepperChild.next();
  }


  constructor(private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService) {}
}
