"use client";

import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useState } from "react";

const Search = ({ docs }) => {
    const [serachResult, setSearchResult] = useState([]);
    const [term, setTerm] = useState("");

    const handleSearch = (e) => {
        setTerm(e.target.value);
        doSearch(term);
    };

    const doSearch = useDebounce((term) => {
        const found = docs.filter((doc) =>
            doc.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResult(found);
    }, 500);
    console.log(serachResult);
    return (
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
    );
};

export default Search;
