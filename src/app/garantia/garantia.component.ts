import { Component, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
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

  previousFormData: any;
  file: File | null = null;

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





  garantiaForm = this._formBuilder.group({
    nome: ['', Validators.required],
    serie: ['', Validators.required],
  });

  garantiaForm2 = this._formBuilder.group({
    mensagem: ['', Validators.required]
  });

  garantiaForm3 = this._formBuilder.group({
    dataCompra: ['', Validators.required]
  });

  garantiaForm4 = this._formBuilder.group({
    file: ['']
  });

  garantiaForm5 = this._formBuilder.group({
    file: ['']
  });

  garantiaForm6 = this._formBuilder.group({
    file: ['', Validators.required]
  });




  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();



  constructor(private _formBuilder: FormBuilder, private route:ActivatedRoute, private router:Router, private location: Location) {}
}
