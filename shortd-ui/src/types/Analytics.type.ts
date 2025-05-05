export type AggResult = {
    _id: string,
    count: number
}
export type Analytic = {
    totalClicks: number,
    uniqueVisitors: number,
    clicksDaily: AggResult[],
    countriesByClick: AggResult[],
    topReferrers: AggResult[],
    devicesUsed: AggResult[],
    browserUsageStat: AggResult[],
    clicksInLast24: number,
    clicksPerHour: AggResult[]
}