import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardImg, CardBody, Container } from "reactstrap";

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { movieId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getMovieDetail();
  }, []);

  function getMovieDetail() {
    setLoading(true);
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=e8ebadca`)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setData(result);
        console.log(data)
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }

  function onClickBook() {
    alert("Ticket Booked");
  }

  return (
    <Container>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
        <Card>
          <CardImg src={data.Poster} alt="Card image cap" />
          <CardBody>
            <h1>{data.Title}</h1>
            <br />
            <h5> Release Date: {data.Released}</h5>
            <h5> Director: {data.Director}</h5>
            <h5> Runtime: {data.Runtime}</h5>
            <h5> Languages Availbale: {data.Language}</h5>
            <br />
            <h6> Cast: {data.Actors}</h6>
            <h6> Plot: {data.Plot}</h6>
          </CardBody>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClickBook}
          >
            Book Ticket
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => history.goBack()}
          >
            Go Back
          </button>
          </Card>
        </>
      )}
    </Container>
  );
}
