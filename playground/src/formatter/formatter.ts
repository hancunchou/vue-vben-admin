
import { GradesConfigAll, allSubjects } from '#/config/study';

export const   formatGrade = ({ cellValue }) => {
  const grade:number=cellValue>0 && cellValue<=12?Number(cellValue)-1:-1
  if (grade>=0) {
    return GradesConfigAll[grade]?.label
  }
  return ''
}


export  const  formatSubject =  ({ cellValue }) => {
  
  const subject:number=Number(cellValue)
  for(const sbj of allSubjects){
    if(sbj.value==subject)return sbj.label
  }
  
  return ''
}
