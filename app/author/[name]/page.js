import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/docs";
import { getDocumentsByAuthor } from "@/utils";
import React from "react";

const Author = ({ params: { name } }) => {
    const docs = getDocuments();
    const matchedDocs = getDocumentsByAuthor(docs, name);
    return (
        <>
            <ContentDisplay id={matchedDocs[0].id} />
        </>
    );
};

export default Author;
