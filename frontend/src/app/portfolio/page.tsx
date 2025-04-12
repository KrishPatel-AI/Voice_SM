import { PortfolioSimulator } from '@/components/dashboard/portfolio-simulator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PieChart,
  LineChart,
  TrendingUp,
  Wallet,
  DollarSign,
  BarChart2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssetAllocation } from '@/components/portfolio/asset-allocation';
import { PortfolioPerformance } from '@/components/portfolio/portfolio-performance';

const Portfolio = () => {
  return (
    <div className='container px-12 py-8'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold flex items-center'>
          <Wallet className='mr-2 h-7 w-7 text-primary' />
          Portfolio
        </h1>
        <p className='text-muted-foreground'>
          Simulate and track your investment portfolio
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 mb-8'>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl flex items-center'>
              <DollarSign className='mr-2 h-5 w-5 text-primary' />
              Portfolio Summary
            </CardTitle>
            <CardDescription>
              Overview of your simulated investment portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <Card className='shadow-none bg-muted/50'>
                <CardContent className='p-4'>
                  <div className='text-sm text-muted-foreground'>
                    Total Value
                  </div>
                  <div className='text-2xl font-bold'>$28,750.42</div>
                  <div className='flex items-center mt-1 text-stock-up text-sm'>
                    <TrendingUp className='h-4 w-4 mr-1' />
                    +$345.89 (1.22%) Today
                  </div>
                </CardContent>
              </Card>

              <Card className='shadow-none bg-muted/50'>
                <CardContent className='p-4'>
                  <div className='text-sm text-muted-foreground'>
                    Total Gain/Loss
                  </div>
                  <div className='text-2xl font-bold'>+$3,628.15</div>
                  <div className='flex items-center mt-1 text-stock-up text-sm'>
                    <TrendingUp className='h-4 w-4 mr-1' />
                    +14.43% All-time
                  </div>
                </CardContent>
              </Card>

              <Card className='shadow-none bg-muted/50'>
                <CardContent className='p-4'>
                  <div className='text-sm text-muted-foreground'>
                    Annual Dividend
                  </div>
                  <div className='text-2xl font-bold'>$632.51</div>
                  <div className='text-sm text-muted-foreground mt-1'>
                    2.2% Yield
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='positions' className='mb-8'>
        <TabsList className='w-full grid grid-cols-4 mb-6 max-w-md'>
          <TabsTrigger value='positions'>Positions</TabsTrigger>
          <TabsTrigger value='allocation'>Allocation</TabsTrigger>
          <TabsTrigger value='performance'>Performance</TabsTrigger>
          <TabsTrigger value='simulator'>Simulator</TabsTrigger>
        </TabsList>

        <TabsContent value='positions'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xl'>Portfolio Holdings</CardTitle>
              <CardDescription>
                Current positions and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioHoldings />
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='ml-auto'>
                Export Portfolio Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='allocation'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xl flex items-center'>
                <PieChart className='mr-2 h-5 w-5 text-primary' />
                Asset Allocation
              </CardTitle>
              <CardDescription>
                Breakdown of your portfolio by sector and asset type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssetAllocation />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='performance'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xl flex items-center'>
                <LineChart className='mr-2 h-5 w-5 text-primary' />
                Portfolio Performance
              </CardTitle>
              <CardDescription>
                Track the historical performance of your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioPerformance />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='simulator'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xl flex items-center'>
                <BarChart2 className='mr-2 h-5 w-5 text-primary' />
                Portfolio Simulator
              </CardTitle>
              <CardDescription>
                Test different investment strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioSimulator />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function PortfolioHoldings() {
  const holdings = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 25,
      price: 187.68,
      value: 4692.0,
      cost: 4125.75,
      change: 13.73,
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      shares: 15,
      price: 407.54,
      value: 6113.1,
      cost: 5243.25,
      change: 16.59,
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 20,
      price: 156.28,
      value: 3125.6,
      cost: 2896.4,
      change: 7.91,
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      shares: 12,
      price: 183.05,
      value: 2196.6,
      cost: 1944.36,
      change: 12.97,
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      shares: 8,
      price: 950.02,
      value: 7600.16,
      cost: 5680.16,
      change: 33.8,
    },
    {
      symbol: 'JPM',
      name: 'JPMorgan Chase',
      shares: 18,
      price: 196.47,
      value: 3536.46,
      cost: 3182.3,
      change: 11.13,
    },
    {
      symbol: 'JNJ',
      name: 'Johnson & Johnson',
      shares: 10,
      price: 152.53,
      value: 1525.3,
      cost: 1662.2,
      change: -8.24,
    },
  ];

  return (
    <div className='rounded-md border'>
      <table className='w-full'>
        <thead>
          <tr className='border-b bg-muted/50'>
            <th className='text-left p-3 pl-4'>Symbol</th>
            <th className='text-left p-3'>Name</th>
            <th className='text-right p-3'>Shares</th>
            <th className='text-right p-3'>Price</th>
            <th className='text-right p-3'>Value</th>
            <th className='text-right p-3 pr-4'>Gain/Loss</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((stock) => (
            <tr key={stock.symbol} className='border-b hover:bg-muted/30'>
              <td className='p-3 pl-4 font-medium'>{stock.symbol}</td>
              <td className='p-3'>{stock.name}</td>
              <td className='p-3 text-right'>{stock.shares}</td>
              <td className='p-3 text-right'>${stock.price.toFixed(2)}</td>
              <td className='p-3 text-right'>${stock.value.toFixed(2)}</td>
              <td
                className={`p-3 pr-4 text-right ${
                  stock.change >= 0 ? 'text-stock-up' : 'text-stock-down'
                }`}
              >
                {stock.change >= 0 ? '+' : ''}
                {stock.change.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Portfolio;
