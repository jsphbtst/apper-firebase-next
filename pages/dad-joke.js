import { useState, useEffect } from "react";

function DadJokePage() {
  const [joke, setJoke] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setJoke(data.joke);
          setIsLoading(false);
        })
        .catch(() => {
          setError("Failed to retrieve from icanhazdadjoke.com");
        });
    };

    getData();
  }, []);

  if (error.length > 0) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <p style={{ fontSize: "32px" }}>{joke}</p>
        </div>
      )}
    </div>
  );
}

export default DadJokePage;
