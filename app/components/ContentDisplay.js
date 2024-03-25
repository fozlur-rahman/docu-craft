import { getDocumentContent } from "@/lib/docs";
import Link from "next/link";
import React from "react";
import Tag from "./Tag";

const ContentDisplay = async ({ id }) => {
    const documentContent = await getDocumentContent(id);

    return (
        <article className="prose dark:prose-invert">
            <h1>{documentContent.title}</h1>
            <div>
                <span>Published On: {documentContent.date}</span> by{" "}
                <Link href={`/author/${documentContent.author}`}>
                    {documentContent.author}
                </Link>{" "}
                under the{" "}
                <Link href={`/categories/${documentContent.category}`}>
                    {documentContent.category}
                </Link>{" "}
                category.
            </div>
            <div className="flex gap-5">
                {documentContent.tags &&
                    documentContent.tags.map((tag) => <p key={tag}>{tag}</p>)}
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