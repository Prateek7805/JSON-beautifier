const TextOutput = () => {
    return (
        <div className='form-floating'>
            <div readOnly className='form-control' 
                        placeholder='Input your JSON here'
                         id="JSON-OUTPUT" 
                         style={{ width: '100%', height: '90vh', resize: "none", overflowY: 'scroll'}}
                         ></div>
            <label htmlFor="JSON-">JSON output</label>
        </div>
    )
}

export default TextOutput;