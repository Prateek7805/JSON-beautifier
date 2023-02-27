
export default function ({state}) {
    const [input, setInput] = state;
    return (
        <div className='form-floating'>
            <textarea className='form-control' 
                        placeholder='Input your JSON here' 
                        id="JSON-TEXTBOX" 
                        style={{ width: '100%', height: '90vh', resize: "none" }}
                        value={input}
                        onChange={(e)=>{setInput(e.target.value)}}
                        />
            <label htmlFor="JSON-TEXTBOX">JSON input</label>
        </div>
    )
}