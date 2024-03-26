import { getDocumentContent } from "@/lib/docs";
import Link from "next/link";



const ContentDisplay = async ({ id }) => {
    const documentContent = await getDocumentContent(id);

    return (
        <article className="prose dark:prose-invert">
            <h1>{documentContent.title}</h1>
            <div>
                <span>Published On: {documentContent.date}</span> by
                <Link href={`/author/${documentContent.author}`}>
                    <p>{documentContent.author}</p>
                </Link>
                under the
                <Link href={`/category/${documentContent.category}`}>
                    <p>{documentContent.category}</p>
                </Link>
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
                            <p>{tag}</p>
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
