'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { MarketSummary } from '@/components/market/market-summary';
import { StockList } from '@/components/dashboard/stock-list';
import { MarketNews } from '@/components/market/market-news';

import Link from 'next/link';
import {
  LineChart,
  PieChart,
  BarChart2,
  Eye,
  BarChart,
  Bookmark,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const portfolioData = {
    totalValue: 28750.42,
    changeToday: 345.89,
    changePercent: 1.22,
    allocation: [
      { name: 'Technology', percentage: 42 },
      { name: 'Healthcare', percentage: 23 },
      { name: 'Finance', percentage: 18 },
      { name: 'Consumer', percentage: 12 },
      { name: 'Other', percentage: 5 },
    ],
    watchlist: [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 187.68,
        change: 1.25,
        percentage: 0.67,
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft',
        price: 407.54,
        change: 2.78,
        percentage: 0.69,
      },
      {
        symbol: 'NVDA',
        name: 'NVIDIA',
        price: 950.02,
        change: 15.23,
        percentage: 1.63,
      },
    ],
  };

  const dashboardLinks = [
    {
      title: 'Markets',
      path: '/markets',
      description: 'Market summary and latest news',
      icon: <BarChart2 className='h-6 w-6' />,
    },
    {
      title: 'Watchlist',
      path: '/watchlist',
      description: 'Track your favorite stocks',
      icon: <Eye className='h-6 w-6' />,
    },
    {
      title: 'Compare',
      path: '/compare',
      description: 'Analyze and compare different stocks',
      icon: <LineChart className='h-6 w-6' />,
    },
    {
      title: 'Portfolio',
      path: '/portfolio',
      description: 'Simulate and track your investment portfolio',
      icon: <PieChart className='h-6 w-6' />,
    },
  ];

  return (
    <div className='container px-12 py-8'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Your personalized investment tracking hub
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
        <Card className='lg:col-span-2'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl flex items-center'>
              <PieChart className='mr-2 h-5 w-5 text-primary' />
              Portfolio Overview
            </CardTitle>
            <CardDescription>
              Summary of your simulated investment portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <div className='space-y-4'>
                  <div>
                    <div className='text-muted-foreground text-sm'>
                      Total Portfolio Value
                    </div>
                    <div className='text-3xl font-bold'>
                      ${portfolioData.totalValue.toLocaleString()}
                    </div>
                    <div className='flex items-center mt-1'>
                      {portfolioData.changeToday > 0 ? (
                        <>
                          <ArrowUpRight className='h-4 w-4 text-stock-up' />
                          <span className='text-sm text-stock-up ml-1'>
                            ${portfolioData.changeToday.toFixed(2)} (
                            {portfolioData.changePercent.toFixed(2)}%) Today
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className='h-4 w-4 text-stock-down' />
                          <span className='text-sm text-stock-down ml-1'>
                            ${Math.abs(portfolioData.changeToday).toFixed(2)} (
                            {Math.abs(portfolioData.changePercent).toFixed(2)}%)
                            Today
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className='pt-4'>
                    <div className='flex justify-between text-sm mb-2'>
                      <span className='font-medium'>Asset Allocation</span>
                      <span className='text-muted-foreground'>Percentage</span>
                    </div>
                    <div className='space-y-2'>
                      {portfolioData.allocation.map((asset) => (
                        <div key={asset.name} className='space-y-1'>
                          <div className='flex justify-between text-sm'>
                            <span>{asset.name}</span>
                            <span>{asset.percentage}%</span>
                          </div>
                          <Progress value={asset.percentage} className='h-2' />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className='mb-3 flex items-center justify-between'>
                  <h4 className='font-medium text-sm'>Quick Watchlist</h4>
                  <Link
                    href='/watchlist'
                    className='text-primary text-xs hover:underline'
                  >
                    View All
                  </Link>
                </div>
                <div className='space-y-3'>
                  {portfolioData.watchlist.map((stock) => (
                    <div
                      key={stock.symbol}
                      className='flex items-center justify-between p-2 rounded-lg bg-muted/50'
                    >
                      <div className='flex items-center'>
                        <Avatar className='h-7 w-7 mr-2'>
                          <AvatarFallback className='text-xs bg-primary/10'>
                            {stock.symbol.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='font-medium text-sm'>
                            {stock.symbol}
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            {stock.name}
                          </div>
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='font-medium'>${stock.price}</div>
                        <div
                          className={
                            stock.change > 0
                              ? 'text-stock-up text-xs'
                              : 'text-stock-down text-xs'
                          }
                        >
                          {stock.change > 0 ? '+' : ''}
                          {stock.percentage.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='mt-3 flex justify-end'>
                  <Link href='/portfolio'>
                    <Button size='sm' variant='outline'>
                      Manage Portfolio
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl flex items-center'>
              <BarChart className='mr-2 h-5 w-5 text-primary' />
              Market Pulse
            </CardTitle>
            <CardDescription>Current market indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <MarketSummary />
          </CardContent>
          <CardFooter>
            <Link href='/markets' className='w-full'>
              <Button variant='outline' className='w-full'>
                View Detailed Markets
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 mb-8'>
        <div className='md:col-span-5'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle className='text-xl flex items-center'>
                <Eye className='mr-2 h-5 w-5 text-primary' />
                Watchlist
              </CardTitle>
              <CardDescription>Your tracked stocks</CardDescription>
            </CardHeader>
            <CardContent>
              <StockList />
            </CardContent>
            <CardFooter>
              <Link href='/watchlist' className='w-full'>
                <Button variant='outline' className='w-full'>
                  View Full Watchlist
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className='md:col-span-7'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle className='text-xl flex items-center'>
                <Bookmark className='mr-2 h-5 w-5 text-primary' />
                Latest News
              </CardTitle>
              <CardDescription>Recent financial headlines</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketNews />
            </CardContent>
            <CardFooter>
              <Link href='/markets' className='w-full'>
                <Button variant='outline' className='w-full'>
                  View All News
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>Explore Features</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {dashboardLinks.map((link) => (
            <Card
              key={link.path}
              className='hover:shadow-md transition-shadow border border-muted'
            >
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <div className='p-2 rounded-md bg-primary/10'>
                    {link.icon}
                  </div>
                </div>
                <CardTitle className='text-lg mt-2'>{link.title}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={link.path}>
                  <Button variant='default' className='w-full'>
                    View {link.title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
