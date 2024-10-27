import React, { useState, useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePageModal() {
  const [showModal, setShowModal] = useState(true); // Show modal initially

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false); // Automatically close the modal after 5 seconds (optional)
    }, 5000);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleClose = () => setShowModal(false);

  return (
    <div>
      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          role="dialog"
          tabIndex="-1"
          style={{ backgroundColor: '#6a727b96' }} // Add transparent overlay
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: 'grey', color: 'white' }}>
              <div className="modal-header"> 
                <button
                  type="button"
                  className="close"
                  onClick={handleClose}
                  style={{ backgroundColor: 'transparent', border: 'none', color: '#fff' }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className=" fw-bold modal-body d-flex align-items-center justify-content-center text-center" style={{height : '200px'}}>
                <p>This website is in the development phase.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePageModal;
