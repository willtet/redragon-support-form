import { Component } from '@angular/core';
import { StepperComponent } from "../stepper/stepper.component";

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [StepperComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

}
