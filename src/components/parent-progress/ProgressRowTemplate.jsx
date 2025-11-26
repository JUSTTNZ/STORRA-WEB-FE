const ProgressRowTemplate = (item, i) => {
  return (
    <tr
      key={i}
      className={`w-4 text-xs border-t-[#ECEDF0] border-t-[1px] hover:bg-[#f8f9fa] cursor-pointer text-[14px]`}
    >
      
      <td className="w-1/4 table-cell text-start">{item?.subject}</td>
      <td className="w-1/4 table-cell text-start">
        {item?.date}
      </td>
      <td className="w-1/4 table-cell text-start">{item?.level}</td>
      <td className="p-3 table-cell text-start w-1/4">
        <div className="flex flex-row items-center gap-2">
          <img src={`/src/assets/images/parent-dashboard-img/download.png`} alt="" />
          <span>Download</span>
        </div>
      </td>
    </tr>
  );
};

export default ProgressRowTemplate;
