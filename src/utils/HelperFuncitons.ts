import { titleAbbrevationToTitle,categoryToFirstAndLastArticle } from "./Mappings"

export const getCategoryTitle=(category:string):string=>{
    if(titleAbbrevationToTitle[category]){
        return titleAbbrevationToTitle[category]
    }
    return "";
}

export const getAdjacentValues=(arr:Array<any>, target:any) : [boolean, boolean, number[]]=>  {
  const result = [];
  const index = arr.indexOf(target);

  if (index !== -1) {
    const prevIndex = (index - 1 + arr.length) % arr.length;
    const nextIndex = (index + 1) % arr.length;

    result.push(arr[prevIndex]);
    result.push(arr[nextIndex]);
  }

  let isFirst=false, isLast=false
  if (index===0)  isFirst=true
  if(index==arr.length-1) isLast=true
  return [isFirst,isLast ,result];
}

export const getFirstAndLastStaticArticleByCategory=(category:string)=>{
  
  if(!Object.keys(categoryToFirstAndLastArticle).includes(category)){
    return [null, null]
  }

  const {first,last}=categoryToFirstAndLastArticle[category]
  return [first,last]
}
