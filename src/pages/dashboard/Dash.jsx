import { BiPlusCircle } from "react-icons/bi";
const activities = [
  {
    date: "Oct 25",
    description: "Coffee Shop",
    category: "Food & Drink",
    amount: -5.4,
  },
  {
    date: "Oct 24",
    description: "Salary Deposit",
    category: "income",
    amount: 1500,
  },
  {
    date: "Oct 23",
    description: "Online Retailer",
    category: "Shopping",
    amount: -89.99,
  },
  {
    date: "Oct 22",
    description: "Transfer to Savings",
    category: "Transfer",
    amount: -200,
  },
  {
    date: "Oct 21",
    description: "Transport Service",
    category: "Transport",
    amount: -18.5,
  },
];
function Dash() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      <div className="md:w-[20%] flex flex-col gap-4">
        <div className="w-full bg-blue-500 rounded-xl shadow-md text-white px-4 py-9">
          <p>Total Balance </p>
          <p className="text-[32px] font-bold"> 1,250.50</p>
          <p>Available for use</p>
        </div>
        <div className="rounded-4xl text-white gap-3 w-full bg-green-400 flex items-center px-4 py-2">
          <BiPlusCircle className="" />
          <p>Add Funds</p>
        </div>
        <div className="rounded-4xl text-white gap-3 w-full bg-blue-400 flex items-center px-4 py-2">
          <BiPlusCircle className="" />
          <p>Withdraw</p>
        </div>
      </div>
      <div className="md:w-[65%]  flex flex-col justify-between h-[78vh] gap-5">
        <div className="p-4 md:h-[36%] bg-white shadow-md rounded-xl flex flex-col ">
          <div className="flex justify-between items-center w-">
            <h3 className="text-[16px] md:text-[20px]">
              Spending Trend(30days)
            </h3>
            <p>Total spent $30</p>
          </div>
          <div className="border h-[80%]">
            <img
              src="src/assets/images/images.jpg"
              alt="img"
              className=" h-full w-full"
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl  shadow-2xl h-[65%] text-gray-400">
          <h2 className="font-medium pb-2 text-[17px]">Recent Activity</h2>
          <table className="text- w-full h-[88%] border-collapse border-b border-gray-300">
            <thead className="text-left items-start  ">
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th className="hidden md:block">category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className="">
              {activities.map((act, i) => {
                return (
                  <tr
                    key={i}
                    className="border-collapse border-b border-gray-300 py-1.5">
                    <td className="">{act.date}</td>
                    <td className="">
                      {act.description} <br />{" "}
                      <span className="md:hidden">{act.category}</span>{" "}
                    </td>
                    <td className="hidden md:table-cell">{act.category}</td>
                    <td className="text-center md:text-left">{act.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dash;
