import Navbar from '@/components/Navbar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { toaster } from '@/components/ui/toaster'
import { getAnalytics } from '@/services/shortdService'
import { Analytic } from '@/types/Analytics.type'
import { Box, Card, HStack, Link, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Chart from 'chart.js/auto'

interface LocationState {
    sid: string,
    longUrl: string
}
const CHART_IDS = {
    ClicksDaily: "clicksDaily",
    ClicksByCountry: "clicksByCountry",
    TopReferrers: "topReferrers",
    DevicesUsed: "devicesUsed",
    BrowserUsage: "browserUsageStat",
    ClicksPerHour: "clicksPerHour"
}
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}
const Analytics = () => {
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [analytic, setAnalytic] = useState<Analytic | null>(null)
    const locationState = location.state as LocationState
    const fetchData = async () => {
        try {
            setLoading(true)
            const analytics = await getAnalytics(locationState.sid);
            setAnalytic(analytics)
        } catch (error: any) {
            toaster.create({
                placement: "bottom-end",
                title: error.message,
                type: "error"
            })
        } finally {
            setLoading(false)
        }
    }
    const renderClicksDaily = (analytics: Analytic) => {
        new Chart(document.getElementById(CHART_IDS.ClicksDaily) as HTMLCanvasElement, {
            type: 'bar',
            data: {
                labels: analytics?.clicksDaily.map(click => click._id),
                datasets: [
                    {
                        label: "Daily Clicks",
                        data: analytics?.clicksDaily.map(click => click.count)
                    }
                ]
            }
        })
    }
    const renderClicksByCountry = (analytics: Analytic) => {
        new Chart(document.getElementById(CHART_IDS.ClicksByCountry) as HTMLCanvasElement, {
            type: "pie",
            data: {
                labels: analytics.countriesByClick.map(i => i._id),
                datasets: [{
                    label: 'Countries',
                    data: analytics.countriesByClick.map(i => i.count),
                    backgroundColor: analytics.countriesByClick.map(i => random_rgba()),
                    hoverOffset: 4
                }]
            }
        })
    }
    const renderTopReferrers = (analytics: Analytic) => {
        new Chart(document.getElementById(CHART_IDS.TopReferrers) as HTMLCanvasElement, {
            type: "pie",
            data: {
                labels: analytics.topReferrers.map(i => i._id),
                datasets: [{
                    label: 'Referrers',
                    data: analytics.topReferrers.map(i => i.count),
                    backgroundColor: analytics.topReferrers.map(i => random_rgba()),
                    hoverOffset: 4
                }]
            }
        })
    }
    const renderDevicesUsed = (analytics: Analytic) => {
        new Chart(document.getElementById(CHART_IDS.DevicesUsed) as HTMLCanvasElement, {
            type: "bar",
            data: {
                labels: analytics.devicesUsed.map(i => i._id),
                datasets: [{
                    label: 'Devices',
                    data: analytics.devicesUsed.map(i => i.count),
                    backgroundColor: analytics.devicesUsed.map(i => random_rgba()),
                }]
            }
        })
    }
    const renderBrowserUsage = (analytics: Analytic) => {
        new Chart(document.getElementById(CHART_IDS.BrowserUsage) as HTMLCanvasElement, {
            type: "bar",
            data: {
                labels: analytics.browserUsageStat.map(i => i._id),
                datasets: [{
                    label: 'Browsers',
                    data: analytics.browserUsageStat.map(i => i.count),
                    backgroundColor: analytics.browserUsageStat.map(i => random_rgba()),
                }]
            }
        })
    }
    const renderClicksPerHour = (analytics: Analytic) => {
        new Chart(document.getElementById(CHART_IDS.ClicksPerHour) as HTMLCanvasElement, {
            type: "bar",
            data: {
                labels: analytics.clicksPerHour.map(i => i._id),
                datasets: [{
                    label: 'Clicks',
                    data: analytics.clicksPerHour.map(i => i.count),
                    backgroundColor: analytics.clicksPerHour.map(i => random_rgba()),
                }]
            }
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    useLayoutEffect(() => {
        if (analytic) {
            renderClicksDaily(analytic)
            renderClicksByCountry(analytic)
            renderTopReferrers(analytic)
            renderDevicesUsed(analytic)
            renderBrowserUsage(analytic)
            renderClicksPerHour(analytic)
        }
    }, [analytic])
    return analytic ? (
        <div>
            <Navbar />
            <Box className='flex flex-col items-center justify-center gap-6 mt-4' paddingX={{ lgDown: 16, lg: 0 }} paddingBottom={{ lg: 20, lgDown: 16 }}>
                <VStack gap={1}>
                    <HStack gap={2}>
                        <Text fontSize="3xl" fontWeight="bold">Shortd : </Text>
                        <Link textDecor="underline" href={`${import.meta.env.VITE_SHORTD_SERVICE}/${locationState.sid}`}
                            target='_blank'
                        >{import.meta.env.VITE_SHORTD_SERVICE}/{locationState.sid}</Link>
                    </HStack>
                    <HStack gap={2}>
                        <Text fontSize="3xl" fontWeight="bold">Long URL : </Text>
                        <Link textDecor="underline" href={locationState.longUrl} target="_blank">{locationState.longUrl}</Link>
                    </HStack>
                </VStack>
                <HStack gap={4}>
                    <Card.Root className='flex flex-col items-center' paddingY={4} paddingX={10} spaceY={4}>
                        <Text fontSize="4xl" fontWeight="bold">Total Clicks</Text>
                        <Text fontSize="4xl" fontWeight="bold">{analytic.totalClicks}</Text>
                    </Card.Root>
                    <Card.Root className='flex flex-col items-center' paddingY={4} paddingX={10} spaceY={4}>
                        <Text fontSize="4xl" fontWeight="bold">Unique Visitors</Text>
                        <Text fontSize="4xl" fontWeight="bold">{analytic.uniqueVisitors}</Text>
                    </Card.Root>
                    <Card.Root className='flex flex-col items-center' paddingY={4} paddingX={10} spaceY={4}>
                        <Text fontSize="4xl" fontWeight="bold">Clicks in last 24 Hrs</Text>
                        <Text fontSize="4xl" fontWeight="bold">{analytic.clicksInLast24}</Text>
                    </Card.Root>
                </HStack>
                <HStack gap={2}>
                    <VStack gap={1}>
                        <Text fontSize="xl" fontWeight="bold">Daily Clicks</Text>
                        <canvas id={CHART_IDS.ClicksDaily}></canvas>
                    </VStack>
                    <VStack gap={1}>
                        <Text fontSize="xl" fontWeight="bold">Devices Used</Text>
                        <canvas id={CHART_IDS.DevicesUsed}></canvas></VStack>
                    <VStack gap={1}>
                        <Text fontSize="xl" fontWeight="bold">Browser Usage</Text>
                        <canvas id={CHART_IDS.BrowserUsage}></canvas></VStack>
                </HStack>
                <HStack gap={2}>
                    <VStack gap={1}>
                        <Text fontSize="xl" fontWeight="bold">Clicks By Country</Text>
                        <canvas id={CHART_IDS.ClicksByCountry}></canvas></VStack>
                    <VStack gap={1}>
                        <Text fontSize="xl" fontWeight="bold">Top Referrers</Text>
                        <canvas id={CHART_IDS.TopReferrers}></canvas></VStack>
                    <VStack gap={1}>
                        <Text fontSize="xl" fontWeight="bold">Clicks Per Hour</Text>
                        <canvas id={CHART_IDS.ClicksPerHour}></canvas></VStack>
                </HStack>

            </Box>
        </div>
    ) : (<></>)
}

export default ProtectedRoute(Analytics)
