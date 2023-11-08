import Navbar from '@/components/navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 max-w-screen-xl px-4 mx-auto md:px-6 lg:px-8">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
