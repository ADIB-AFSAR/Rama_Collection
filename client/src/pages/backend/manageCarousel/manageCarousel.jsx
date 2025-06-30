import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../Sidemenu/Sidemenu';
import { getToken } from '../../../redux/service/token.service';
import '../backend.css';

function ManageBanners() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('carousel');
    const [device, setDevice] = useState('desktop');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [slidingText, setSlidingText] = useState('');
    const [slideSuccess, setSlideSuccess] = useState('');
    const [slideError, setSlideError] = useState('');

// Fetch current sliding text
useEffect(() => {
  fetchSlidingText();
}, []);

const fetchSlidingText = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/banner/slidingText`);
    setSlidingText(res.data?.text || '');
  } catch (err) {
    console.error('Error fetching sliding text:', err);
  }
};

const handleSlidingTextSubmit = async (e) => {
  e.preventDefault();
  setSlideSuccess('');
  setSlideError('');

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/admin/banner/slidingText`,
      { text: slidingText },
      { headers: { Authorization: getToken() } }
    );
    setSlideSuccess('Sliding text updated successfully!');
  } catch (err) {
    setSlideError('Failed to update sliding text.');
    console.error(err);
  }
};

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/banner/all`, {
                headers: {
                    Authorization: getToken()
                }
            });
           setBanners(res.data);
        } catch (err) {
            console.error('Failed to fetch banners:', err.message);
        }
        setLoading(false);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleDelete = async (id) => {
        console.log(id)
  const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
  if (!confirmDelete) return;

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/admin/banner/${id}`,
      {
        headers: { Authorization: getToken() }
      }
    );
    alert("Banner deleted!");
    fetchBanners(); // refresh list
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
    alert("Delete failed!");
  }
};



const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedFile) return;

  setUploading(true);
  try {
    // 1. Upload image directly to Cloudinary
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "unsigned_upload"); // replace with your preset

    const cloudinaryRes = await axios.post(
      `https://api.cloudinary.com/v1_1/dssga1s2j/image/upload`,
      formData
    );

    const cloudinaryUrl = cloudinaryRes.data.secure_url;

    // 2. Save Cloudinary image URL to your backend
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/admin/banner/upload`,
      {
        url: cloudinaryUrl,
        device,
        type,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );

    fetchBanners();
    alert("Banner uploaded successfully!");
    setSelectedFile(null);
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed!");
  }
  setUploading(false);
};


    return (
        <>
            <div className="container-fluid page-header mt-2">
                <h1 className="text-center display-6">Manage Banners & Carousel</h1>
            </div>
             
            <div className='container pt-4'>
                <div className='row'>
                    <Sidebar />
                    <div className="card col-9 order shadow">
                        <div className="card-body">
                            <div className="card-header bg-dark d-flex justify-content-between">
                                <h4 className="card-title text-white fw-bold">Upload New Banner</h4>
                            </div>
{/* Sliding Text Update Section */}
<div className="card mb-4 mt-4 shadow">
  <div className="card-header bg-dark text-white">
    <h5 className="mb-0">Update Sliding Info Text</h5>
  </div>
  <div className="card-body">
    <form onSubmit={handleSlidingTextSubmit}>
      <div className="mb-3">
        <label htmlFor="slidingText" className="form-label">Enter Sliding Text</label>
        <textarea
          id="slidingText"
          className="form-control"
          rows="2"
          value={slidingText}
          onChange={(e) => setSlidingText(e.target.value)}
          placeholder="e.g. Extra 40% off on all products"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-success">Update Text</button>
      {slideSuccess && <div className="text-success mt-2">{slideSuccess}</div>}
      {slideError && <div className="text-danger mt-2">{slideError}</div>}
    </form>
    <hr />
<h6 className="mt-3">Preview:</h6>
<div className="running-text-container glowing-text mt-2">
  <div className="running-text small fw-semibold">
    {slidingText || 'Your sliding text will appear here...'}
  </div>
</div>
  </div>
  
</div>

                            {/* Upload Form */}
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="mb-3">
                                    <label htmlFor="fileUpload" className="form-label">Select Image</label>
                                    <input
                                        type="file"
                                        id="fileUpload"
                                        accept="image/*"
                                        className="form-control"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="type" className="form-label">Type</label>
                                        <select
                                            id="type"
                                            className="form-select"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                            <option value="carousel">Carousel</option>
                                            <option value="banner">Product Listing Banner</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="device" className="form-label">Device</label>
                                        <select
                                            id="device"
                                            className="form-select"
                                            value={device}
                                            onChange={(e) => setDevice(e.target.value)}
                                        >
                                            <option value="desktop">Desktop</option>
                                            <option value="mobile">Mobile</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={uploading}>
                                    {uploading ? "Uploading..." : "Upload"}
                                </button>
                            </form>

                            {/* Uploaded Banners Table */}
                            <div className="mt-5">
                                <h5 className="fw-bold">Uploaded Banners</h5>
                                {loading ? (
                                    <div className="spinner-container text-center mt-3">
                                        <Spinner animation="border" size="sm" className="text-primary spinner" />
                                    </div>
                                ) : banners?.length > 0 ? (
                                    <div className="table-responsive mt-3">
                                        <table className="table table-bordered table-hover">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Type</th>
                                                    <th>Device</th>
                                                    <th>Image</th>
                                                    <th>Uploaded At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {banners.map((b, i) => (
    <tr key={b._id}>
      <td>{i + 1}</td>
      <td>{b.type}</td>
      <td>{b.device}</td>
      <td className='d-flex justify-content-center'>
        <img src={b.url} alt="banner" width={`${b.device == "desktop" ? '150px' : "75px" }`} className="img-thumbnail" />
      </td>
      <td>
  {new Date(b.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: '2-digit'
  })}{' '}
  {new Date(b.createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  })}
</td>
      <td>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b._id)}>
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center mt-3">No banners uploaded yet.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageBanners;
