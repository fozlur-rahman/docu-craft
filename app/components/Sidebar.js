"use client";
import {
    getDocumentsByAuthor,
    getDocumentsByCategory,
    getDocumentsByTags,
} from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = ({ docs }) => {
    const [rootNodes, setRootNodes] = useState([]);
    const [NonRootNodes, setNonRootNodes] = useState({});
    const pathName = usePathname();

    useEffect(() => {
        let matchedDocs = docs;

        if (pathName.includes("/tags")) {
            const tag = pathName.split("/")[2];

            matchedDocs = getDocumentsByTags(docs, tag);
        } else if (pathName.includes("/category")) {
            const category = pathName.split("/")[2];

            matchedDocs = getDocumentsByCategory(docs, category);
        } else if (pathName.includes("/author")) {
            const author = pathName.split("/")[2];

            matchedDocs = getDocumentsByAuthor(docs, author);
        }

        const root = matchedDocs.filter((doc) => !doc.parent);
        const nonRoot = Object.groupBy(
            matchedDocs.filter((doc) => doc.parent),
            ({ parent }) => parent
        );

        const nonRootsKeys = Reflect.ownKeys(nonRoot);
        nonRootsKeys.forEach((key) => {
            const foundInRoots = root.find((r) => r.id === key);
            if (!foundInRoots) {
                const foundInDocs = docs.find((doc) => doc.id === key);
                root.push(foundInDocs);
            }
        });

        root.sort((a, b) => {
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            return 0;
        });
        
        setRootNodes([...root]);
        setNonRootNodes({ ...nonRoot });
    }, [pathName, docs]);

    return (
        <nav className="hidden lg:mt-10 lg:block">
            <div className="relative mt-3 pl-2">
                <div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
                <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
                <div className="absolute left-2 h-6 w-px bg-emerald-500"></div>
                <ul role="list" className="border-l border-transparent">
                    {rootNodes.map((rootNode) => (
                        <li key={rootNode.id} className="relative">
                            <Link
                                aria-current="page"
                                className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                                href={`/docs/${rootNode.id}`}
                            >
                                <span className="truncate">
                                    {rootNode.title}
                                </span>
                            </Link>

                            {NonRootNodes[rootNode.id] && (
                                <ul role="list" style={{ opacity: 1 }}>
                                    {NonRootNodes[rootNode.id].map(
                                        (subRoot) => (
                                            <li key={subRoot.id}>
                                                <Link
                                                    className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                                    href={`/docs/${rootNode.id}/${subRoot.id}`}
                                                >
                                                    <span className="truncate">
                                                        {subRoot.title}
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
