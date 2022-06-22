import { useEffect, useState } from "react";

const Display = (props) => {

    const [tododata, setTododata] = useState()
    const [todo, setTodo] = useState()
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
    }, [tododata, props.val])

    const data = []
    if (tododata) {
        todo.forEach((item, index) => {

            data.push(<>{item.ispin || <li className="list-group-item" key={index} ><div style={{ float: "left" }}>
                {item.status ? <input type="checkbox" onChange={(e) => { props.donetask(e, index) }} checked />
                    : <input type="checkbox" onChange={(e) => { props.donetask(e, index) }} />}

                &nbsp;{item.title}</div>
                <div style={{ float: "right" }}><br />
                    <button onClick={() => props.pindata(index)} type="button" className="btn btn-light" >&#x2606;</button>&nbsp;
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => props.deletedata(index)}  ></button>&nbsp;
                    <button type="button" className="btn btn-light" onClick={() => props.updatedata(index)}  >&#9998;</button></div></li>}</>)
        });
    }

    return (
        <>
            <div className="card" style={{ "width": "30rem",marginTop:'5px'}}>
                <ul className="list-group list-group-flush">
                    {data}
                </ul>
            </div>

        </>
    )
}

export default Display