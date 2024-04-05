import React from "react";
import { FaEdit } from "react-icons/fa";
import {MdDelete} from "react-icons/md";



const Head="text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text="text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows=(data,i,users)=>{
    return(
        <tr key={i}>
            {
                users ? (
                    <>
                        <td className={`${Text}`}>
                
            </td>
            <td className={`${Text}`}>{data.username }</td>
            <td className={`${Text}`}>{data.password }</td>
            <td className={`${Text}`}>{data.mail}</td>
            <td className={`${Text}`}>{data.role}</td>
            <td className={`${Text} float-right flex-rows gap-2`}>
        
                    <button className="bg-subMain text-white rounded flex-colo w-7 h-7">
                    <MdDelete />
                    </button>
            </td>
            </>

                    
                ):
                (
                    //categories
                    <>
                    <td className={`${Text} font-bold`}>{data?._id ? data._id : "2R75T8"}</td>
                    <td className={`${Text}`}>{data.createAt ? data.createAt :"12,Jan 2023"}</td>
                    <td className={`${Text}`}>{data.fullName}</td>
                    <td className={`${Text} float-right flex-rows gap-2`}>

                    <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
                    Edit <FaEdit className="text-green-500" />
                    </button>
                    <button className="bg-subMain text-white rounded flex-colo w-7 h-7">
                    <MdDelete />
                    </button>
                    </td>
                  </>  
                )
                
            }
  
        </tr>
    );

};

function Table2({ data, users }){

  
    return(
        <div className="overflow-x-scroll overflow-hidden relative w-full">
            <table className="w-full table-auto border border-border divide-y devide-border">
                <thead>

                    <tr className="bg-dryGray">

                    {
                        users ? (
                            <>
                             <th scope="col" className={`${Head}`}>
                           
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Name
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Password 
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Email
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Role
                        </th>
                            </>
                        ):
                        (
                            <>
                                  <th scope="col" className={`${Head}`}>
                            Id
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Date
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Title
                        </th>
                            </>
                        )
                    }
                        <th scope="col" className={`${Head} text-end`}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bf-main divide-y divide-gray-800">
                    {data.map((data,i)=>Rows(data,i,users)
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table2;