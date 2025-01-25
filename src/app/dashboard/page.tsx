import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashboardContent from '@/components/DashboardContent';

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/dashboard-login');
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardContent />
    </div>
  );
}
