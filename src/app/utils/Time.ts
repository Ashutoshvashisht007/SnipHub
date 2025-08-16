export default function formatDate(date: Date){
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "short",
            year: "numeric"
        };

        return new Intl.DateTimeFormat("en-us", options).format(date);
    }