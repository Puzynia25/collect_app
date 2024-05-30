import { marked } from "marked";
import DOMPurify from "dompurify";

export const renderMarkdown = (markdownText) => {
    if (!markdownText) {
        return { __html: "" };
    }
    const rawHTML = marked(markdownText);
    const sanitizedHTML = DOMPurify.sanitize(rawHTML);
    return { __html: sanitizedHTML };
};
