import './css/clipboard.css';
export function Clipboard() {
    return (
        <form id="clipboard">
            <div>
                <label htmlFor="content">Your content</label>
                <input type="text" name="content" id="content" />
            </div>
        </form>
    );
}
