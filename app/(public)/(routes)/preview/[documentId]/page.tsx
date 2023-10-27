import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

import { Cover } from '@/components/cover';
import { Toolbar } from '@/components/toolbar';
import { Id } from '@/convex/_generated/dataModel';

interface DocumentIdPageProps {
  params: {
    documentId: Id<'documents'>;
  };
}

async function getDocument(documentId: Id<'documents'>) {
  const res = await fetch(
    `https://${process.env.DEPLOYMENT_NAME}.convex.site/getByIdAction?documentId=${documentId}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function generateMetadata({
  params
}: DocumentIdPageProps): Promise<Metadata> {
  const document = await getDocument(params.documentId);

  return {
    title: `${document.title} — Motion`,
    openGraph: {
      title: `${document.title} — Motion`,
      url: `/preview/${params.documentId}`
    },
    twitter: {
      title: `${document.title} — Motion`
    }
  };
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const document = await getDocument(params.documentId);

  const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

  return (
    <div className='pb-40'>
      <Cover preview url={document.coverImage} />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar preview initialData={document} />
        <Editor editable={false} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
