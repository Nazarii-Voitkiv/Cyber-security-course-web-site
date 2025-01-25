import { getServerSession } from 'next-auth';
import LoginForm from '@/components/LoginForm';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
