import React from "react";
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (movie, i, admin) => {


    const handleDelete = async (movie) => {
        console.log('Movie Name:', movie);
        try {
            const response = await fetch(`http://localhost:3000/movies/delete/${movie.imdbid}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete movie');
            }
            console.log(response);
            // Refresh the page after successful deletion
            window.location.reload();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    }

    return (
        <tr key={i}>
            <td className={`${Text}`}>
                <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={movie.titleImage}
                        alt={movie?.name}
                    />
                </div>
            </td>
            <td className={`${Text} truncate`}>{movie.name}</td>
            <td className={`${Text}`}>{movie.category}</td>
            <td className={`${Text}`}>{movie.language}</td>
            <td className={`${Text}`}>{movie.year}</td>
            <td className={`${Text}`}>{movie.time}</td>
            <td className={`${Text} float-right flex-rows gap-2`}>
                {
                    admin ? (
                        <>
                            <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
                                Edit <FaEdit className="text-green-500" />
                            </button>
                            <button className="bg-subMain text-white rounded flex-colo w-7 h-7" onClick={() => handleDelete(movie)}>
                                <MdDelete />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
                                Download <FaCloudDownloadAlt className="text-green-500" />
                            </button>
                            <Link
                              to={`/movie/${encodeURIComponent(movie?.name)}`} // Encoding the movie name
                              className="bg-subMain text-white rounded flex-colo w-7 h-7"
                            >
                            <GoEye />
                            </Link>
                        </>
                    )
                }
            </td>
        </tr>
    );
};

function Table({ data, admin }) {

    return (
        <div className="overflow-x-scroll overflow-hidden relative w-full">
            <table className="w-full table-auto border border-border divide-y devide-border">
                <thead>
                    <tr className="bg-dryGray">
                        <th scope="col" className={`${Head}`}>
                            Image
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Name
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Category
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Language
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Year
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Hours
                        </th>
                        <th scope="col" className={`${Head} text-end`}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bf-main divide-y divide-gray-800">
                    {data.map((movie, i) => Rows(movie, i, admin))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
