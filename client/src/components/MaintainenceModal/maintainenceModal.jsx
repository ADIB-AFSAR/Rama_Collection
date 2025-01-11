import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './UserModal.css';

const MaintenanceModal = ({ currentUser }) => {
  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    currentUser?.role !== 'admin' && (
      <Modal
        isOpen={true}
        className="maintenance-modal"
        overlayClassName="maintenance-overlay"
        shouldCloseOnOverlayClick={false}
      >
        <div className="maintenance-content">
          <div className="maintenance-message">
            <h2 className='text-white text-center'>Site Under Maintenance</h2>
            {/* <p>We're currently working on updates. Please check back later.</p> */}

            {/* GIF Image */}
            <img
              src="./Gear.gif"
              alt="Maintenance Animation"
              className="maintenance-gif"
            />
          </div>
        </div>
      </Modal>
    )
  );
};

export default MaintenanceModal;
