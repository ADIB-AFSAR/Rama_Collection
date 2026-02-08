import React, { useEffect, useMemo } from "react";
import "./seasonalfav.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCategoryTreeStart } from "../../redux/action/category.action";

const SeasonalFaves = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tree = useSelector(state => state.category.tree);
  const loading = useSelector(state => state.category.loading);

  // Load tree once
  useEffect(() => {
    dispatch(getCategoryTreeStart());
  }, [dispatch]);

  /* ----------------------------------
     Extract all children from tree
  ---------------------------------- */
  const children = useMemo(() => {

    if (!tree?.length) return [];

    return tree.flatMap(parent =>
      parent.children?.filter(c => c.showInMenu) || []
    );

  }, [tree]);

  /* ---------------------------------- */

  return (

    <div className="container mx-auto px-0">

      <p className="d-flex justify-content-center w-100 mb-5">
      <span className="ribbon-heading">Shop By Category</span>
    </p>

      <div className="row">

        {/* LOADING */}
        {loading &&

          Array(4).fill().map((_, i) => (

            <div key={i} className="col-md-3 col-6 mb-4">

              <div className="card placeholder-card">

                <div className="skeleton-image" />

                <div className="card-body">
                  <div className="skeleton-text" />
                </div>

              </div>

            </div>

          ))
        }


        {/* DATA */}
        {!loading && children.map(cat => (

          <div
            key={cat._id}
            className="col-md-3 col-6 mb-4"
            onClick={() =>{
              navigate(`/collections/${cat._id}`);
              window.scrollTo(0,0)
            }
            }
          >

            <div className="card collection-card">

              <img
                src={cat.image || "/placeholder.jpg"}
                alt={cat.name}
                className="card-img-top"
              />

              <div className="category-overlay satisfy-regular text-center">

                <h6 className="cat-name">{cat.name}</h6>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
};

export default SeasonalFaves;
