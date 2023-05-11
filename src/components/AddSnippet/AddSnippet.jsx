import React from "react";
import "./AddSnippet.css";
function AddSnippet() {
  return (
    <div className="AddSnippet FormContainer">
      <form>
        <div className="formGroup">
          <label htmlFor="">Title</label>
          <input type="text" name="" id="" required />
        </div>
        <div className="formGroup">
          <label htmlFor="">Description</label>
          <textarea name="" id="" cols="30" rows="5" required></textarea>
        </div>
        <div className="formGroup">
          <label htmlFor="">Language</label>
          <select name="" id="">
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="">Time Complexity</label>
          <input type="text" name="" id="" placeholder="O(n)" required />
        </div>
        <div className="formGroup">
          <label htmlFor="">Space Complexity</label>
          <input type="text" name="" id="" placeholder="O(n)" required />
        </div>
        <div className="formGroup">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddSnippet;
