import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-enviado',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [],
  templateUrl: './enviado.component.html',
  styleUrl: './enviado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnviadoComponent {
  constructor(
    private cdr: ChangeDetectorRef) { }
}
