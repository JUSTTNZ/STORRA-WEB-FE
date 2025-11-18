const Table = ({ tableColumn, rowData, rowTemplate, view }) => {
  return (
    <table className="min-w-max lg:w-full">
      <thead className="bg-white mb-3 w-full border-collapse border-b border-gray-700">
        <tr className="">
          {tableColumn?.map((item, i) => (
            <th
              key={i}
              className={` ${item.className} text-start py-4 text-[13px] bg-[#F0F0F099]`}
            >
              <div className="">{item.title}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="mt-20">
        {rowData?.map((item, i) => rowTemplate(item, i))}
      </tbody>
    </table>
  );
};

export default Table;
