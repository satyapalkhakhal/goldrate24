import CmsPageEditor from '@/components/admin/CmsPageEditor';

interface Props {
    params: { id: string };
}

export default function EditCmsPagePage({ params }: Props) {
    return <CmsPageEditor pageId={params.id} />;
}
