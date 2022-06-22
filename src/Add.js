import { useState, useRef, useEffect } from "react"
import Display from "./Display"
import Pinlist from "./Pinlist"
const Add = () => {

    const [data, setData] = useState()
    const [tododata, setTododata] = useState()
    const [todo, setTodo] = useState()
    const [msg, setMsg] = useState("hii")
    const list = localStorage.getItem("todolist")
    const listdata = JSON.parse(list)

    useEffect(() => {
        setTododata(listdata)
        console.log(tododata)
    }, [])
    useEffect(() => {
        const list = localStorage.getItem("todolist")
        const listdata = JSON.parse(list)
        setTodo(listdata)
    }, [tododata])

    const livetoast = useRef()

    //Add and Update Item
    const getdata = (e) => {
        setData(e.target.value)
    }
    const item = useRef()
    const additem = (e) => {
        const text = e.target.innerHTML
        if (text === "Add") {
            const ndata = {
                title: data,
                ispin: false,
                status: false
            }
            todo.splice(0, 0, ndata)
            setTododata(listdata)
            setMsg("Successfully Added")
        }
        if (text === "Update") {
            const index = e.target.value
            const ndata = {
                title: data,
                ispin: listdata[index].ispin,
                status: listdata[index].status
            }
            todo[index] = ndata
            setTododata(listdata)
            e.target.innerHTML = "Add"
            setMsg("Successfully Updated")
        }
        item.current.value = ""
        localStorage.setItem("todolist", JSON.stringify(todo))
        livetoast.current.style.display = "block"
    }
    const close = () => {
        livetoast.current.style.display = "none"
    }

    // Done task
    const donetask = (e, index) => {
        if (e.target.checked) {
            todo[index].status = true
            setTododata(todo)
            setMsg("Task Completed")
        }
        else {
            todo[index].status = false
            setTododata(todo)
            setMsg("Task not Completed")
        }
        localStorage.setItem("todolist", JSON.stringify(todo))
        livetoast.current.style.display = "block"
    }

    //Delete Item
    const deletedata = (index) => {
        if (todo[index].ispin) {
            let pin = parseInt(localStorage.getItem("pin"))
            pin = pin - 1
            localStorage.setItem("pin", JSON.stringify(pin))
        }
        todo.splice(index, 1)
        setTododata(todo)
        localStorage.setItem("todolist", JSON.stringify(todo))
        setMsg("Successfully Deleted")
        livetoast.current.style.display = "block"
    }

    //Pin Item
    const pindata = (index) => {
        let pin = parseInt(localStorage.getItem("pin"))
        if (!todo[index].ispin) {
            if (pin < 3) {
                pin = pin + 1
                todo[index].ispin = true
                // setTododata(todo)
                localStorage.setItem("todolist", JSON.stringify(todo))
                setMsg("Successfully Pined")

            }
            else {
                setMsg("Can not pin more than 3")

            }
        }
        else {
            pin = pin - 1
            todo[index].ispin = false
            setMsg("Successfully UnPined")

        }
        localStorage.setItem("pin", JSON.stringify(pin))
        setTododata(todo)
        localStorage.setItem("todolist", JSON.stringify(todo))
        livetoast.current.style.display = "block"
    }

    //Update Item
    const updatedata = (index) => {
        const btndata = document.getElementById("btnadd")
        item.current.value = todo[index].title
        btndata.innerHTML = "Update"
        btndata.value = index
    }
    return (
        <>
            <div className="card" style={{ "width": "30rem", textAlign: "center", backgroundColor: 'lightyellow' }}>
                <div className="card-body">
                    <h5 className="title">ToDo List</h5>
                    <input className="form-control" type="text" onChange={getdata} id="txtitem" ref={item} placeholder="Enter Data" aria-label="default input example"></input>
                    <button className='btn btn-info' onClick={(e) => additem(e)} id="btnadd">Add</button>
                </div>
            </div>

            <Pinlist val={tododata} donetask={donetask} deletedata={deletedata} pindata={pindata} updatedata={updatedata} />

            <Display val={tododata} donetask={donetask} deletedata={deletedata} pindata={pindata} updatedata={updatedata} />

            <div className="toast-container position-fixed top-0 end-0 p-3" id="liveToast" >
                <div ref={livetoast} className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            {msg}
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={close}></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add