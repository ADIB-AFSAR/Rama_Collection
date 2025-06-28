import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const MaintenanceModal = ({ currentUser }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set on load
    window.addEventListener('resize', handleResize);

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const glowKeyframes = `
    @keyframes glow {
      from {
        text-shadow: 0 0 5px #fff, 0 0 10px #ff00de, 0 0 20px #ff00de;
      }
      to {
        text-shadow: 0 0 20px #fff, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de;
      }
    }
    .whatsapp-link {
      background-color: #25D366;
      padding: 10px;
      border-radius: 50%;
      box-shadow: 0 0 12px #25D366;
      display: inline-block;
      transition: box-shadow 0.3s ease;
    }
    .whatsapp-link:hover {
      box-shadow: 0 0 5px #25D366, 0 0 10px #25D366, 0 0 20px #25D366, 0 0 30px #25D366;
    }
  `;

  const glowingTextStyle = {
    fontSize: isMobile ? '2rem' : '3rem',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: `0 0 5px #fff, 0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de`,
    animation: 'glow 2s ease-in-out infinite alternate',
    marginBottom: isMobile ? '20px' : '40px',
  };

  const contactTextStyle = {
    color: '#fff',
    fontSize: isMobile ? '1rem' : '1.2rem',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: '16px',
    justifyContent: 'center',
    textAlign: 'center',
  };

  const modalContentStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : '70%',
    height: isMobile ? '50%' : '70%',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row', // horizontal on desktop
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    padding: isMobile ? '20px' : '40px',
    textAlign: 'center',
    overflow: 'hidden',
    zIndex: 1051,
  };

  return (
    <>
      <style>{glowKeyframes}</style>

      {currentUser?.role !== 'admin' && (
        <Modal
          isOpen={true}
          shouldCloseOnOverlayClick={false}
          style={{
            content: modalContentStyle,
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 1050,
            },
          }}
          contentLabel="Maintenance Modal"
        >
          <div className="w-100 d-flex flex-column align-items-center justify-content-center">
            <h1 style={glowingTextStyle}>Coming Soon!</h1>
            <div style={contactTextStyle}>
              To order please connect on WhatsApp
              <a
                href="https://wa.me/917205656169"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="whatsapp-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.875 7.875 0 0 0 8 0C3.589 0 .005 3.584.005 7.996c0 1.41.372 2.783 1.077 3.993L0 16l4.109-1.072a7.987 7.987 0 0 0 3.891 1.006h.003c4.411 0 7.996-3.584 7.996-7.996 0-2.134-.832-4.14-2.398-5.612zM8 14.512a6.48 6.48 0 0 1-3.307-.897l-.236-.14-2.437.636.651-2.378-.154-.244A6.463 6.463 0 0 1 1.52 7.996C1.52 4.46 4.464 1.52 8 1.52c1.735 0 3.364.676 4.594 1.905A6.443 6.443 0 0 1 14.48 7.996c0 3.536-2.944 6.516-6.48 6.516z" />
                  <path d="M11.131 9.985c-.168-.084-.99-.488-1.143-.543-.153-.056-.264-.084-.376.084-.112.168-.43.542-.527.654-.097.112-.195.126-.363.042-.168-.084-.709-.261-1.35-.834-.499-.446-.836-.998-.933-1.166-.097-.168-.011-.259.073-.343.075-.074.168-.195.252-.292.084-.098.112-.168.168-.28.056-.112.028-.21-.014-.294-.042-.084-.376-.907-.516-1.241-.137-.331-.278-.284-.376-.289l-.321-.006a.615.615 0 0 0-.448.21c-.153.168-.588.574-.588 1.401 0 .826.602 1.623.685 1.734.084.112 1.18 1.804 2.857 2.53 1.004.433 1.398.469 1.9.395.305-.045.99-.405 1.13-.795.14-.39.14-.725.098-.795-.042-.07-.153-.112-.32-.196z" />
                </svg>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MaintenanceModal;
