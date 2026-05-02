import { getWords } from '@/lib/cms/fetcher';
import WordsClient from '@/components/admin/WordsClient';

export default async function WordsPage() {
  const words = await getWords();
  return <WordsClient words={words} />;
}
