import ArticleEditor from '@/components/admin/ArticleEditor';

interface Props {
    params: { id: string };
}

export default function EditArticlePage({ params }: Props) {
    return <ArticleEditor articleId={params.id} />;
}
