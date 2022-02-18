export const handlebarsHelpers = {
    isOpen: (status: string)=> Number(status) ? true : false,
    isClosed: (status: string)=> Number(status) ? false : true,
    isMessage: (message: string) => message ? true : false,
    isSumOfTimes: (sumOfTimes: string) => Boolean(sumOfTimes) ? true : false,
    insertFetch: ()=>{}
}