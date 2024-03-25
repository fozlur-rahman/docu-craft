import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
const postsDirectory = path.join(process.cwd(), "docs");

export const getDocuments = () => {
    const fileNames = fs.readdirSync(postsDirectory);

    const allDocuments = fileNames.map((fileName) => {
        const id = fileName.replace(".md", "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const metterResult = matter(fileContents);
        return {
            id,
            ...metterResult.data,
        };
    });

    return allDocuments.sort((a, b) => {
        if (a.order < b.order) {
            return -1;
        }
        if (a.order > b.order) {
            return 1;
        }
        return 0;
    });
};

export async function getDocumentContent(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();
    console.log(contentHtml);

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}
