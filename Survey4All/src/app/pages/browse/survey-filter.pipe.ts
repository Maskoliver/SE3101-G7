import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'surveyFilter'
})
export class SurveyFilterPipe implements PipeTransform {

  transform(value: any[], filterText?: any): any[] {
    filterText=filterText?filterText.toLocaleLowerCase():null;
    return filterText?value.filter((survey:any)=> survey.surveyName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
