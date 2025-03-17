import React from 'react';
import { 
  FileText, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Moon, 
  Bell, 
  MoreVertical,
  ArrowUpDown
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 bg-black flex flex-col items-center py-5 space-y-8">
        <div className="text-white">
          <div className="bg-white text-black p-2 rounded">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
        </div>
        <div className="flex flex-col space-y-8">
          <button className="p-3 text-white bg-gray-800 rounded hover:bg-gray-700">
            <FileText size={20} />
          </button>
          <button className="p-3 text-white hover:bg-gray-800 rounded">
            <ShoppingBag size={20} />
          </button>
          <button className="p-3 text-white hover:bg-gray-800 rounded">
            <FileText size={20} />
          </button>
          <button className="p-3 text-white hover:bg-gray-800 rounded">
            <Users size={20} />
          </button>
          <button className="p-3 text-white hover:bg-gray-800 rounded">
            <BarChart3 size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white py-4 px-6 flex justify-between items-center border-b">
          <div className="flex items-center">
            <button className="mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Moon size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <div className="flex items-center">
              <span className="mr-2 text-gray-500">Odarna Studio</span>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                O
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Menus Card */}
            <div className="bg-black text-white p-6 rounded-lg shadow">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold">120</h2>
                  <p className="text-gray-400">Total Menus</p>
                </div>
                <div className="bg-gray-800 p-2 rounded h-10">
                  <FileText size={20} />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-1">
                  <span>0%</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full">
                  <div className="bg-gray-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold">180</h2>
                  <p className="text-gray-500">Total Orders Today</p>
                </div>
                <div className="bg-blue-100 p-2 rounded h-10">
                  <ShoppingBag size={20} className="text-blue-500" />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-1">
                  <span>0%</span>
                  <span>62%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-blue-300 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>

            {/* Total Client Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold">240</h2>
                  <p className="text-gray-500">Total Client Today</p>
                </div>
                <div className="bg-gray-100 p-2 rounded h-10">
                  <Users size={20} className="text-gray-500" />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-1">
                  <span>0%</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-gray-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* Revenue Day Ratio Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold">140</h2>
                  <p className="text-gray-500">Revenue Day Ratio</p>
                </div>
                <div className="bg-pink-100 p-2 rounded h-10">
                  <BarChart3 size={20} className="text-pink-500" />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-1">
                  <span>0%</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-pink-300 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between mb-6">
                <h3 className="font-bold text-lg">Revenue</h3>
                <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                  <button className="px-3 py-1 bg-black text-white">Monthly</button>
                  <button className="px-3 py-1 hover:bg-gray-200">Weekly</button>
                  <button className="px-3 py-1 hover:bg-gray-200">Today</button>
                </div>
              </div>
              
              <div className="h-64 relative">
                {/* Simple Line Chart Representation */}
                <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-between">
                  <div className="text-gray-500 text-xs">25k</div>
                  <div className="text-gray-500 text-xs">20k</div>
                  <div className="text-gray-500 text-xs">15k</div>
                  <div className="text-gray-500 text-xs">10k</div>
                  <div className="text-gray-500 text-xs">0</div>
                </div>
                
                <div className="absolute bottom-0 left-12 right-0 h-full">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    {/* Grid lines */}
                    <line x1="0" y1="0" x2="400" y2="0" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="0" y1="150" x2="400" y2="150" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="0" y1="200" x2="400" y2="200" stroke="#f0f0f0" strokeWidth="1" />
                    
                    {/* Revenue line */}
                    <path d="M0 160 L67 150 L134 140 L200 130 L267 80 L334 85 L400 90" stroke="black" strokeWidth="2" fill="none" />
                    
                    {/* Expenses line */}
                    <path d="M0 170 L67 165 L134 160 L200 155 L267 150 L334 145 L400 140" stroke="#ffcccb" strokeWidth="2" fill="none" />
                    
                    {/* Vertical current date line */}
                    <line x1="267" y1="0" x2="267" y2="200" stroke="black" strokeWidth="1" />
                    <circle cx="267" cy="80" r="4" fill="black" />
                    <circle cx="267" cy="150" r="4" fill="#ffcccb" />
                  </svg>
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </div>
                
                {/* Chart Info */}
                <div className="absolute top-1/3 left-2/3">
                  <div className="text-sm font-medium">April 2022</div>
                  <div className="flex items-center text-xs mt-2">
                    <span className="w-2 h-2 bg-black rounded-full mr-1"></span>
                    <span>Income: 18k</span>
                  </div>
                  <div className="flex items-center text-xs mt-1">
                    <span className="w-2 h-2 bg-red-300 rounded-full mr-1"></span>
                    <span>Expenses: 13k</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Orders Summary */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between mb-6">
                <h3 className="font-bold text-lg">Orders Summary</h3>
                <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                  <button className="px-3 py-1 hover:bg-gray-200">Monthly</button>
                  <button className="px-3 py-1 bg-black text-white">Weekly</button>
                  <button className="px-3 py-1 hover:bg-gray-200">Today</button>
                </div>
              </div>
              
              <div className="h-64 relative">
                {/* Bar Chart Representation */}
                <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-between">
                  <div className="text-gray-500 text-xs">25k</div>
                  <div className="text-gray-500 text-xs">20k</div>
                  <div className="text-gray-500 text-xs">15k</div>
                  <div className="text-gray-500 text-xs">10k</div>
                  <div className="text-gray-500 text-xs">0</div>
                </div>
                
                <div className="absolute bottom-0 left-12 right-0 h-5/6 flex justify-around items-end">
                  {/* June 24 */}
                  <div className="flex flex-col items-center w-full">
                    <div className="flex justify-center space-x-2 w-full">
                      <div className="w-1/4 h-32 bg-black"></div>
                      <div className="w-1/4 h-44 bg-gray-200"></div>
                      <div className="w-1/4 h-24 bg-blue-200"></div>
                    </div>
                    <div className="mt-2 text-xs">Jun 24</div>
                  </div>
                  
                  {/* June 25 */}
                  <div className="flex flex-col items-center w-full">
                    <div className="flex justify-center space-x-2 w-full">
                      <div className="w-1/4 h-32 bg-black"></div>
                      <div className="w-1/4 h-44 bg-gray-200"></div>
                      <div className="w-1/4 h-24 bg-blue-200"></div>
                    </div>
                    <div className="mt-2 text-xs">Jun 25</div>
                  </div>
                  
                  {/* June 26 */}
                  <div className="flex flex-col items-center w-full">
                    <div className="flex justify-center space-x-2 w-full">
                      <div className="w-1/4 h-32 bg-black"></div>
                      <div className="w-1/4 h-44 bg-gray-200"></div>
                      <div className="w-1/4 h-24 bg-blue-200"></div>
                    </div>
                    <div className="mt-2 text-xs">Jun 26</div>
                  </div>
                  
                  {/* June 27 */}
                  <div className="flex flex-col items-center w-full">
                    <div className="flex justify-center space-x-2 w-full">
                      <div className="w-1/4 h-32 bg-black"></div>
                      <div className="w-1/4 h-44 bg-gray-200"></div>
                      <div className="w-1/4 h-24 bg-blue-200"></div>
                    </div>
                    <div className="mt-2 text-xs">Jun 27</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between mb-6">
              <h3 className="font-bold text-lg">Order List</h3>
              <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                <button className="px-3 py-1 bg-black text-white">Monthly</button>
                <button className="px-3 py-1 hover:bg-gray-200">Weekly</button>
                <button className="px-3 py-1 hover:bg-gray-200">Today</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm">
                    <th className="pb-3 font-medium">No</th>
                    <th className="pb-3 font-medium">
                      <div className="flex items-center">
                        ID <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">
                      <div className="flex items-center">
                        Customer Name <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">
                      <div className="flex items-center">
                        Amount <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="pb-3 font-medium">
                      <div className="flex items-center">
                        Status Order <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-4">1</td>
                    <td className="py-4">#12345</td>
                    <td className="py-4">Jan 24th, 2020</td>
                    <td className="py-4">Roberto Carlo</td>
                    <td className="py-4">Corner Street 5th Londo</td>
                    <td className="py-4">$34.20</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-1"></span>
                        <span>New Order</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <button>
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-4">2</td>
                    <td className="py-4">#12366</td>
                    <td className="py-4">Jan 22th, 2020</td>
                    <td className="py-4">Rohmad Khair</td>
                    <td className="py-4">Lando Street 5th Yogos</td>
                    <td className="py-4">$44.25</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                        <span className="text-blue-400">On Delivery</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <button>
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;