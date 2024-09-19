import { SignedIn, SignUpButton, SignedOut, SignInButton } from '@clerk/nextjs';
import DashboardNavBar from './components/DashboardNavBar';
import { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  return (
    <div className="bg-white text-black">
      <div> This is the dashboard</div>
      <Toaster />
    </div>
  );
}
