import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

    private surveyName = new BehaviorSubject('Please Dont reload the page while you are solving the survey, go browse and come back');
    private surveyCreator = new BehaviorSubject('Unknown');
    sharedName = this.surveyName.asObservable();
    sharedCreator = this.surveyCreator.asObservable();

    constructor() { }

    goSurvey(head: string, creator: string) {
        console.log(head);
        this.surveyName.next(head);
        this.surveyCreator.next(creator);
    }

}