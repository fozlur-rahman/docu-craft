import { getDocumentContent } from "@/lib/docs";
import Link from "next/link";

const ContentDisplay = async ({ id }) => {
    const documentContent = await getDocumentContent(id);

    return (
        <article className="prose dark:prose-invert">
            <h1>{documentContent.title}</h1>
            <div className="flex items-center gap-2 mt-0">
                <span>Published On: {documentContent.date}</span>
                <Link href={`/author/${documentContent.author}`}>
                    {documentContent.author}
                </Link>
                under the
                <Link href={`/category/${documentContent.category}`}>
                    {documentContent.category}
                </Link>
                category.
            </div>
            <div className="flex gap-2">
                {documentContent.tags &&
                    documentContent.tags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/tags/${tag}`}
                            className=" mt-0 mb-0 bg-sky-200 px-2  rounded-full"
                        >
                            {tag}
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
