import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowPrompt(false);
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-xs w-full border border-gray-200">
        {/* Close Button - Top Right */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <IoClose size={20} className="text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-5 pt-8">
          
          {/* Text */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Install DreamFox
            </h3>
          </div>
          
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="/dreamfox_logo.png"
              alt="DreamFox Logo"
              className="h-16 w-auto"
            />
          </div>

          

          {/* Install Button - Bottom */}
          <button
            onClick={handleInstall}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Install 
          </button>
        </div>
      </div>
    </div>
  );
}
