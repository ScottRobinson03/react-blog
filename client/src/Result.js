export default function Result({ error, output }) {
    if (error) {
        return <p>Error: {error}</p>;
    }
    return <p>{output}</p>;
}
