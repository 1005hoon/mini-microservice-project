import React from 'react'

export default function PostCreate() {
  return (
    <div>
      <form>
        <div className="form-group">
          <label>제목</label>
          <input type="text" className="form-control"/>
        </div>  
        <button className="btn btn-primary">등록</button>
      </form>      
    </div>
  )
}
