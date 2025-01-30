import { Component, inject } from '@angular/core';
import { WelcomeService } from './welcome-service.service';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  exercises$: Observable<ExerciseItem[]>;

  service = inject(WelcomeService);
  exercises$ = this.service.exercises$;


  toggleItem(item: ExerciseItem) {
    this.service.checkExercise.next(item.name);
  }

  itemTrackByName(index: number, item: ExerciseItem) {
    return item.name;
  }


}
