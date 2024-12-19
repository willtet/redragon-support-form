import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { EnviadoComponent } from '../enviado/enviado.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ApiService } from '../api-service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-parcerias',
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
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './parcerias.component.html',
  styleUrl: './parcerias.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParceriasComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stepper') stepperChild!: MatStepper;
  @Input({required: true}) formGroup!: FormGroup;
  @Input({required: true}) stepper!: MatStepper;
  public apresentacao: NgxFileDropEntry[] = [];
  public fileLimitExceeded: boolean = false;
  public isLoadingEnviar: boolean = false;
  public isLoadingSemImagem: boolean = false;

  public allowedExtensions: string[] = ['jpg', 'jpeg', 'png', 'pdf'];
  public selectedForm: string | null = null;

  formats: string = ".png .jpg .pdf";
  multiple: boolean = true;


  goBack(): void {
    this.parceriasForm.reset();
    this.parceriasForm2.reset();


    this.stepper.previous();
  }

  public onFileDropped(files: NgxFileDropEntry[], fileType: 'apresentacao') {
    const maxFiles = 3;

    if ((fileType === 'apresentacao' && this.apresentacao.length >= maxFiles)) {
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
          if (fileType === 'apresentacao') {
            this.apresentacao.push(droppedFile); // Adiciona à lista de fotos
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

  public openFileSelector(event: Event, fileType: 'apresentacao'): void {
    event.preventDefault();
    const fileInput = this.fileInput ;
    fileInput.nativeElement.onchange = (e: any) => {
        this.onFilesSelected(e, fileType);
    };
    fileInput.nativeElement.click();
  }

  public onFilesSelected(event: any, fileType: 'apresentacao'): void {
    const maxFiles = 3;

    if ((fileType === 'apresentacao' && this.apresentacao.length >= maxFiles)) {
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
        if (fileType === 'apresentacao') {
            return !this.apresentacao.some(existingFile => existingFile.relativePath === fileName);
        }
        return true;
    });

    // Adiciona apenas os arquivos filtrados (sem duplicatas)
    this.onFileDropped(filteredFiles, fileType);
    this.fileLimitExceeded = false;
  }


  public removeFile(fileName: string, fileType: 'apresentacao'): void {
    if (fileType === 'apresentacao') {
      this.apresentacao = this.apresentacao.filter(file => file.relativePath !== fileName); // Remove o arquivo de fotos
    }

    // Se o limite foi excedido anteriormente, reseta a mensagem
    if (this.fileLimitExceeded && (this.apresentacao.length < 3 )) {
      this.fileLimitExceeded = false;
    }

    this.cdr.detectChanges(); // Atualiza a view
  }




    parceriasForm = this._formBuilder.group({
      mensagem: ['', Validators.required]
    });
    parceriasForm2 = this._formBuilder.group({
      apresentacao: ['']
    });


    onSubmit(semArquivo: boolean): void {

      if(!semArquivo) {
        this.isLoadingEnviar = true;
      }else{
        this.isLoadingSemImagem = true
      }


      if(!semArquivo && this.apresentacao.length === 0) {
        return;
      }

      const semArquivoApresentacao = "Nenhum arquivo enviado";

      const parceria = {
          ...this.formGroup.value,
          ...this.parceriasForm.value
      };

      // Estrutura do objeto que você deseja
      const response = {
          ...parceria,
          apresentacaoArquivo: semArquivo ? semArquivoApresentacao : null,
          apresentacao: [],
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
      const apresentacaoPromises = this.apresentacao.map((file: NgxFileDropEntry) => {
          return new Promise<void>((resolve, reject) => {
              if (file.fileEntry.isFile) {
                  const fileEntry = file.fileEntry as FileSystemFileEntry;
                  fileEntry.file((realFile: File) => {
                      readFileAsBytes(realFile)
                          .then((fileData) => {
                              response.apresentacao.push(fileData);
                              resolve();
                          })
                          .catch(error => reject(error));
                  });
              } else {
                  resolve(); // Se não for um arquivo, resolve imediatamente.
              }
          });
      });

      // Espera que todos os arquivos sejam lidos
      Promise.all(apresentacaoPromises).then(() => {
          // Enviar a resposta para o backend ou para onde for necessário
          console.log(response); // Verificar a estrutura do objeto

          if (this.formGroup.valid) {  // Checa a validade do formGroup
              // Se o formulário for válido, envie os dados para o backend
              this.apiService.enviarParceria(response).subscribe({
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
                this.isLoadingEnviar = false; // Finaliza o carregamento
                this.isLoadingSemImagem = false;
              },
              });
          } else {
              console.error('Formulário inválido');
          }
      }).catch(error => {
          console.error('Erro ao processar arquivos:', error);
      });
  }


    constructor(
      private _formBuilder: FormBuilder,
      private cdr: ChangeDetectorRef,
      private apiService: ApiService) {}
}
