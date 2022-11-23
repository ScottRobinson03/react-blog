import "./Form.css";

export default function Form({ setAuthor, setContent, createBlog }) {
    return (
        <section id="form-section">
            <input
                onBlur={e => setAuthor(e.target.value)}
                placeholder="Enter Author"
            />
            <input
                onBlur={e => setContent(e.target.value)}
                placeholder="Enter Content"
            />
            <button type="submit" onClick={createBlog}>
                Submit
            </button>
        </section>
    );
}
