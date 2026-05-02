import { getPageSections } from '@/lib/cms/fetcher';
import PageSectionsClient from '@/components/admin/PageSectionsClient';

export default async function PageSectionsPage() {
  const sections = await getPageSections();
  return <PageSectionsClient sections={sections} />;
}
