import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/docs";
import { getDocumentsByTags } from "@/utils";
import React from "react";

const Tags = ({ params: { name } }) => {
    const docs = getDocuments();
    const matchedDocs = getDocumentsByTags(docs, name);
    return (
        <>
            <ContentDisplay id={matchedDocs[0].id} />
        </>
    );
};

export default Tags;
