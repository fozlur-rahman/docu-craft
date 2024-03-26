"use client";

import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { useRouter } from "next/navigation";

const Search = ({ docs }) => {
    const [serachResult, setSearchResult] = useState([]);
    const [term, setTerm] = useState("");
    const router = useRouter();
    console.log(router);
    const handleSearch = (e) => {
        const value = e.target.value;
        setTerm(value);
        doSearch(value);
    };

    const doSearch = useDebounce((term) => {
        const found = docs.filter((doc) =>
            doc.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResult(found);
    }, 500);

    const closeSearchResults = (e) => {
        e.preventDefault();
        router.push(e.target.href);
        setTerm("");
    };
    return (
        <>
            <div>
                <button
                    type="button"
                    className="focus:[&amp;:not(:focus-visible)]:outline-none hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
                >
                    <Image
                        src="/search.svg"
                        width={100}
                        height={100}
                        alt="serach-icon"
                        className="h-5 w-5"
                    />
                    <input
                        type="text"
                        value={term}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="flex-1 focus:border-none focus:outline-none"
                    />
                    <kbd className="ml-auto w-auto text-2xs text-zinc-400 dark:text-zinc-500">
                        <kbd className="font-sans">Ctrl </kbd>
                        <kbd className="font-sans">K</kbd>
                    </kbd>
                </button>
            </div>
            {term && term.trim().length > 0 && (
                <SearchResult
                    term={term}
                    results={serachResult}
                    closeSearchResults={closeSearchResults}
                />
            )}
        </>
    );
};

export default Search;
