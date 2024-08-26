import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';

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
    NgxFileDropModule
  ],
  templateUrl: './duvidas.component.html',
  styleUrl: './duvidas.component.css'
})
export class DuvidasComponent {

  previousFormData: any;
  file: File | null = null;

  formats: string = ".png .jpg .pdf";
  multiple: boolean = true;

  goBack(): void {
    window.history.back();
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





  duvidaForm = this._formBuilder.group({
    nome: ['a', Validators.required],
    serie: ['a', Validators.required],
  });

  duvidaForm2 = this._formBuilder.group({
    mensagem: ['a', Validators.required]
  });

  duvidaForm3 = this._formBuilder.group({
    dataCompra: ['a', Validators.required]
  });

  duvidaForm4 = this._formBuilder.group({
    mensagem: ['a', Validators.required]
  });


  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();


  constructor(private _formBuilder: FormBuilder, private route:ActivatedRoute, private router:Router, private location: Location) {}

}
