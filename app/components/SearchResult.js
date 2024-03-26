import Link from "next/link";
import React from "react";

const SearchResult = ({ results, term, closeSearchResults }) => {
    return (
        <div className="absolute left-0 top-12 z-[999] w-3/4 ms-8 rounded-md bg-gray-100 mt-10 p-4 shadow-lg">
            <p className="!text-lg border-b pb-2">
                Showing results for
                <span className="mx-2 font-semibold">{term}:</span>
            </p>
            <ul role="list" className="divide-y divide-gray-100 [&>*]:py-2">
                {results.map((result) => (
                    <li key={result.id}>
                        <Link
                            href={`/docs/${result.id}`}
                            className="transition-all hover:text-emerald-600"
                            onClick={(e) => closeSearchResults(e)}
                        >
                            {result.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResult;
