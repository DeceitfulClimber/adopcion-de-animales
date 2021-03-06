import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { notLoggedIn } from "../../hooks/alert";
//import find from "../../hooks/find";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./Comment.css";

const Comment = () => {
  const [comment, setComment] = useState([]);
  const { loggedUser, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const foundationId = params.id;

  //console.log("loggedUser :", loggedUser);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/comment/${foundationId}`)
      .then((res) => res.data)
      .then((review) => setComment(review));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) navigate(`/comment/add/${foundationId}`)
    else {
      notLoggedIn();
      navigate("/login");
    } 
  }

  return (
    <div className="comment">
      <ul>
        <h3 align="center">Comentarios</h3>
        {comment.length === 0 ? (
          <p align="center">No hay comentarios aun</p>
        ) : (
          comment.map((review) => (
            <>
              {console.log(review)}
              <div className="container">
                <div id="single-comment">
                  <div className="row">
                    <div className="col-3">
                      <h5 id="name"> {loggedUser ? loggedUser.username : ""}</h5>
                      <img
                        className="userImg"
                        src={
                          /* require(`../../assets/img/users${loggedUser._id}.jpg`) */

                          require(`../../assets/img/users/no_user.jpg`)
                        }
                        alt="Foto de perfil"
                      ></img>
                    </div>

                    <div className="col-9">
                      <p id="textReview">"{review.comment}"</p>
                      <p id="date">
                        <CalendarMonthIcon />
                        {new Date(review.createdAt).toLocaleDateString("es-AR")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </ul>
      <div className="pb-5" align="center">

      <button type="button" className="btn btn-dark" onClick={handleClick}>
        Agregar comentario
      </button>


{/*         <Link to={`/comment/add/${foundationId}`}>
          <button type="button" className="btn btn-dark">
            Agregar comentario
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default Comment;
