import { Outlet } from 'react-router-dom';
import { Navbar, Footer, ScrollProgress } from '../components/common';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-dark-bg">
            <ScrollProgress />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default MainLayout;
