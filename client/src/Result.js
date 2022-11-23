import "./Result.css";

export default function Result({ error, output }) {
    if (error) {
        return <p id="result">Error: {error}</p>;
    }
    return <p id="result">{output}</p>;
}
