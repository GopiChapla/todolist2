import { useState, useRef } from "react"

const Add = () => {

    const [data, setData] = useState()
    const [msg, setmsg] = useState("")
    const getdata = (e) => {
        setData(e.target.value)
    }
    const item = useRef()
    const additem = (e) => {
        const text = e.target.innerHTML
        const listdata = JSON.parse(localStorage.getItem("todolist"))
        if (text === "Add") {
            const ndata = {
                title: data,
                ispin: false,
                status: false
            }
            listdata.push(ndata)
            document.getElementById("msg").innerHTML="Successfully Added";
        }
        if (text === "Update") {
            const index = e.target.value
            const ndata = {
                title: data,
                ispin: listdata[index].ispin,
                status: listdata[index].status
            }
            listdata[index] = ndata
            e.target.innerHTML = "Add"
            item.current.value = ""
        document.getElementById("msg").innerHTML="Successfully Updated";
        }
        localStorage.setItem("todolist", JSON.stringify(listdata))
        document.getElementById("liveToast").style.display = "block"
    }
    const close = () => {
        document.getElementById("liveToast").style.display = "none"
    }
    return (
        <>
            <div className="card" style={{ "width": "30rem", textAlign: "center" }}>
                <div className="card-body">
                    <h5 className="title">ToDo List</h5>
                    <input className="form-control" type="text" onChange={getdata} id="txtitem" ref={item} placeholder="Enter Data" aria-label="default input example"></input>
                    <button className='btn btn-info' onClick={(e) => additem(e)} id="btnadd">Add</button>
                </div>
            </div>
            <div className="toast-container position-fixed top-0 end-0 p-3">
                <div id="liveToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body" id="msg">
                    
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={close}></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add