import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Animation variants for staggered fade-in effect
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 10, staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      {/* Header */}
      <header className='bg-gradient-to-r from-gray-800 to-gray-700 text-white fixed w-full top-0 left-0 z-10'>
        <motion.div
          className='container mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-6'
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className='text-4xl md:text-5xl font-bold mb-4 md:mb-0' variants={itemVariants}>
            NoteApp
          </motion.h1>
          <motion.p className='text-lg md:text-xl mb-4 md:mb-0' variants={itemVariants}>
            Organize your thoughts with ease.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to='/login'
              className='bg-white text-gray-800 py-2 px-6 rounded-full font-semibold hover:bg-gray-100 transition-all'
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className='flex-1 pt-24'>
        {/* Features Section */}
        <motion.section
          className='container mx-auto py-16 px-6'
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 className='text-3xl font-bold mb-8 text-center' variants={itemVariants}>
            Features
          </motion.h2>
          <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <motion.div className='bg-white p-6 rounded-lg shadow-lg' variants={itemVariants}>
              <h3 className='text-xl font-semibold mb-4'>Organize Notes</h3>
              <p className='text-gray-700'>
                Keep your notes organized with tags, categories, and priority levels.
              </p>
            </motion.div>
            <motion.div className='bg-white p-6 rounded-lg shadow-lg' variants={itemVariants}>
              <h3 className='text-xl font-semibold mb-4'>Collaboration</h3>
              <p className='text-gray-700'>
                Share notes with others and collaborate in real-time.
              </p>
            </motion.div>
            <motion.div className='bg-white p-6 rounded-lg shadow-lg' variants={itemVariants}>
              <h3 className='text-xl font-semibold mb-4'>Secure Storage</h3>
              <p className='text-gray-700'>
                Your notes are stored securely with end-to-end encryption.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          className='bg-gray-200 py-16 px-6'
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 className='text-3xl font-bold mb-8 text-center' variants={itemVariants}>
            How It Works
          </motion.h2>
          <motion.div className='flex flex-col md:flex-row justify-center'>
            <motion.div className='bg-white p-6 rounded-lg shadow-lg mx-4 mb-6 md:mb-0' variants={itemVariants}>
              <h3 className='text-xl font-semibold mb-4'>Create Notes</h3>
              <p className='text-gray-700'>
                Start by creating new notes and organizing them into folders.
              </p>
            </motion.div>
            <motion.div className='bg-white p-6 rounded-lg shadow-lg mx-4 mb-6 md:mb-0' variants={itemVariants}>
              <h3 className='text-xl font-semibold mb-4'>Share & Collaborate</h3>
              <p className='text-gray-700'>
                Share your notes with colleagues or friends and work together.
              </p>
            </motion.div>
            <motion.div className='bg-white p-6 rounded-lg shadow-lg mx-4' variants={itemVariants}>
              <h3 className='text-xl font-semibold mb-4'>Access Anywhere</h3>
              <p className='text-gray-700'>
                Access your notes from any device, anytime, anywhere.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className='container mx-auto py-16 px-6'
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 className='text-3xl font-bold mb-8 text-center' variants={itemVariants}>
            What Our Users Say
          </motion.h2>
          <motion.div className='flex flex-col md:flex-row justify-center'>
            <motion.div className='bg-white p-6 rounded-lg shadow-lg mx-4 mb-6 md:mb-0' variants={itemVariants}>
              <p className='text-gray-700 mb-4'>
                "NoteApp has transformed the way I manage my notes. It's so easy
                to use and keeps everything organized!"
              </p>
              <p className='font-semibold text-gray-900'>Jane Doe</p>
            </motion.div>
            <motion.div className='bg-white p-6 rounded-lg shadow-lg mx-4 mb-6 md:mb-0' variants={itemVariants}>
              <p className='text-gray-700 mb-4'>
                "The collaboration features are fantastic. I can work on projects
                with my team seamlessly."
              </p>
              <p className='font-semibold text-gray-900'>John Smith</p>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className='bg-gray-800 text-white py-6'>
        <div className='container mx-auto text-center'>
          <p className='mb-4'>© 2024 Blesinto. All rights reserved.</p>
          <div className='flex justify-center space-x-4'>
            <a href='/privacy-policy' className='hover:underline'>
              Privacy Policy
            </a>
            <a href='/terms-of-service' className='hover:underline'>
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
