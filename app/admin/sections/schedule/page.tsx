import { getSchedule } from '@/lib/cms/fetcher';
import ScheduleClient from '@/components/admin/ScheduleClient';

export default async function SchedulePage() {
  const sessions = await getSchedule();
  return <ScheduleClient sessions={sessions} />;
}
