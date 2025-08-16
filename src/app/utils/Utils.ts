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
