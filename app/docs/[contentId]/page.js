import ContentDisplay from "@/app/components/ContentDisplay";

const ContentPage = ({ params }) => {
    const { contentId } = params;

    return (
        <>
            <ContentDisplay id={contentId} />
        </>
    );
};

export default ContentPage;
