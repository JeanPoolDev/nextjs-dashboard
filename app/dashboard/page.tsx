import { Suspense } from 'react'
import { fetchCardData } from '../lib/data'
import { Card } from '../ui/dashboard/cards'
import LatestInvoices from '../ui/dashboard/latest-invoices'
import RevenueChart from '../ui/dashboard/revenue-chart'
import { lusitana } from '../ui/fonts'
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '../ui/skeletons'

export default async function Page () {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices
  } = await fetchCardData()

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Suspense fallback={<CardsSkeleton />}>
          <Card title='Collected' value={totalPaidInvoices} type='collected' />
          <Card title='Pending' value={totalPendingInvoices} type='pending' />
          <Card title='Total Invoices' value={numberOfInvoices} type='invoices' />
          <Card
            title='Total Customers'
            value={numberOfCustomers}
            type='customers'
          />
        </Suspense>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  )
}
