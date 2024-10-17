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
    EnviadoComponent
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

    public onFilesSelected(event: any, fileType: 'fotos' | 'problema'): void {
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





  softwareForm = this._formBuilder.group({
    nome: ['a', Validators.required],
    serie: ['a', Validators.required],
  });

  softwareForm2 = this._formBuilder.group({
    file: ['']
  });

  softwareForm3 = this._formBuilder.group({
    mensagemOS: ['', Validators.required]
  });

  softwareForm4 = this._formBuilder.group({
    mensagemSpec: ['a', Validators.required]
  });

  softwareForm5 = this._formBuilder.group({
  });

  softwareForm6 = this._formBuilder.group({
    mensagem: ['a', Validators.required]
  });

  softwareForm7 = this._formBuilder.group({
    file: []
  });

  softwareForm8 = this._formBuilder.group({
    problema: ['a', Validators.required]
  });

  softwareForm9 = this._formBuilder.group({
    mudancaOS: ['a', Validators.required]
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
      this.selectedForm = 'enviado';
      this.cdr.detectChanges();
      this.stepperChild.next();

  });



  }


  constructor(private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) {}
}
