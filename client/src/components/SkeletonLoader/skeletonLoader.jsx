import React from 'react'
import "./skeletonLoader.css"

function SkeletonLoader() {
  return (
    <div className="row">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4">
  <div className="card p-2">
    <div
      className="image-placeholder mb-2"
      style={{ height: "200px", width: "100%" }}
    ></div>
    <div className="placeholder mb-2" style={{ height: "20px", width: "60%" }}></div>
    <div className="placeholder" style={{ height: "16px", width: "40%" }}></div>
  </div>
</div>
        ))}
      </div>
  )
}

export default SkeletonLoader
