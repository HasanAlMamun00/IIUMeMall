import { useQuery } from "@tanstack/react-query";

const AllContacts = () => {

    const { data: contacts = [] } = useQuery({
        queryKey: ['/contactUs'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/contactUs`)
            const data = await res.json();
            return data;
        }
    })

    return (

        <div className="overflow-x-auto rounded-xl border border-gray-300 mb-10 mt-6">

            <table className="min-w-full table">
                <thead className="bg-[#F8FAFC]">
                    <tr>
                        <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                            <span className="text-black font-semibold text-base">  Name{" "} </span>
                        </th>

                        <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                            <span className="text-black font-semibold text-base">  Email{" "}</span>
                        </th>

                        <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                            <span className="text-black font-semibold text-base"> Message{" "}  </span>
                        </th>

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                    {contacts?.data?.map((item) => (
                        <tr key={item?.id}>

                            <td className="text-sm text-gray-500  whitespace-nowrap">
                                <h2 className="text-lg font-semibold text-black">
                                    {item?.name}
                                </h2>
                            </td>
                            <td className="text-sm whitespace-nowrap">
                                <h2 className="text-lg font-semibold text-black">
                                    {item?.email}
                                </h2>
                            </td>
                            <td className="text-sm whitespace-nowrap">
                                <h2 className="text-lg font-semibold text-black">{item?.message && (
                                    <>
                                        {item?.message.slice(0, 25)}<br />
                                        {item?.message.slice(26, 50)} <br />
                                        {item?.message.slice(50)}
                                    </>
                                )}</h2>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default AllContacts;