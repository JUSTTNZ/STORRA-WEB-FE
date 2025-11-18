const TransactionRowTemplate = (item, i) => {
  return (
    <tr
      key={i}
      className={`text-xs border-t-[#ECEDF0] border-t-[1px] hover:bg-[#f8f9fa] cursor-pointer text-[14px]`}
    >
      <td className="p-3 table-cell text-start">
        <div className="flex flex-row items-center gap-2">
          <img src={`/src/assets/images/wallet/${item?.image}`} alt="" />
          {item?.title}
        </div>
      </td>
      <td className="table-cell text-start">{item?.description}</td>
      <td className="table-cell text-start">{item?.amount}</td>
      <td className="table-cell text-start">
        {item?.date};{item?.time}
      </td>
      <td className="table-cell text-start">{item?.status}</td>
    </tr>
  );
};

export default TransactionRowTemplate;
