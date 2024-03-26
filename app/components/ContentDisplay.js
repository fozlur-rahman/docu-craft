import { getDocumentContent } from "@/lib/docs";
import Link from "next/link";
import React from "react";

const ContentDisplay = async ({ id }) => {
    const documentContent = await getDocumentContent(id);

    return (
        <article className="prose dark:prose-invert">
            <h1>{documentContent.title}</h1>
            <div>
                <span>Published On: {documentContent.date}</span> by{" "}
                <Link href={`/author/${documentContent.author}`}>
                    <a>{documentContent.author}</a>
                </Link>{" "}
                under the{" "}
                <Link href={`/category/${documentContent.category}`}>
                    <a>{documentContent.category}</a>
                </Link>{" "}
                category.
            </div>
            <div className="flex gap-2">
                {documentContent.tags &&
                    documentContent.tags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/tags/${tag}`}
                            className="  mt-0 mb-0 bg-sky-300 px-2 rounded-full"
                        >
                            <a>{tag}</a>
                        </Link>
                    ))}
            </div>
            <div
                className="lead"
                dangerouslySetInnerHTML={{
                    __html: documentContent.contentHtml,
                }}
            />
        </article>
    );
};

export default ContentDisplay;
