export function getTimeDifferenceInMinutes(timestamp: Date) {
    const currentTimestamp = new Date();
    const differenceInMilliseconds: number =
        currentTimestamp.getTime() - timestamp.getTime();
    const differenceInMinutes: number = differenceInMilliseconds / (1000 * 60);
    return differenceInMinutes.toFixed(0);
}
