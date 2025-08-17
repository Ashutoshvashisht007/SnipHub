export function truncateString(str: string, num: number){
    if(str.length > num){
        return str.slice(0,num) + "...";
    }
    else{
        return str;
    }
}

export function formatDate(date: Date){
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "short",
            year: "numeric"
        };

        return new Intl.DateTimeFormat("en-us", options).format(date);
    }

export function captilizeFirstOccurence(language: string){
    const index = language.search(/\S/); // pehla non-space char ka index
  return index === -1 
    ? language 
    : language.slice(0, index) + language[index].toUpperCase() + language.slice(index + 1);
}
