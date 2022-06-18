

const Pinlist = () => {

    const listdata = JSON.parse(localStorage.getItem("todolist"))
    const data = [];
    listdata.forEach((item, index) => {
        data.push(<>{item.ispin && <li className="list-group-item" key={index} style={{ backgroundColor: "greenyellow" }}><div style={{ float: "left" }}>
            {item.status ? <input type="checkbox" onChange={(e) => { donetask(e, index) }} checked />
                : <input type="checkbox" onChange={(e) => { donetask(e, index) }} />}

            &nbsp;{item.title}</div>
            <div style={{ float: "right" }}>
                <button onClick={() => pindata(index)}  >&#x1F4CC;</button>&nbsp;
                <br /><br />
                <button onClick={() => deletedata(index)}  >&#10060;</button>&nbsp;
                <button onClick={() => updatedata(index)}  >&#9998;</button></div></li>}</>)
    });

    const donetask = (e, index) => {
        if (e.target.checked) {
            listdata[index].status = true
        document.getElementById("msg").innerHTML="Task Completed"
        document.getElementById("liveToast").style.display="block"
        }
        else {
            listdata[index].status = false
        document.getElementById("msg").innerHTML="Task not Completed"
        document.getElementById("liveToast").style.display="block"
        }
        localStorage.setItem("todolist", JSON.stringify(listdata))
        
    }

    const pindata = (index) => {
        let pin = parseInt(localStorage.getItem("pin"))
        pin = pin - 1
        localStorage.setItem("pin", JSON.stringify(pin))
        listdata[index].ispin = false
        localStorage.setItem("todolist", JSON.stringify(listdata))
        document.getElementById("msg").innerHTML="Successfully UnPined"
        document.getElementById("liveToast").style.display="block"
    }

    const updatedata = (index) => {
        const btndata = document.getElementById("btnadd")
        document.getElementById("txtitem").value = listdata[index].title
        btndata.innerHTML = "Update"
        btndata.value = index
    }

    const deletedata = (index) => {
        listdata.splice(index, 1)
        localStorage.setItem("todolist", JSON.stringify(listdata))
        document.getElementById("msg").innerHTML="Successfully Deleted";
        document.getElementById("liveToast").style.display="block"
    }

    // const close=()=>{
    //     document.getElementById("liveToast1").style.display="none"
    // }
    return (
        <>

            <div className="card" style={{ "width": "30rem" }}>
                <ul className="list-group list-group-flush">
                    {data}
                </ul>
            </div>
            {/* <div className="toast-container position-fixed top-0 end-0 p-3">
                <div id="liveToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body" id="msg">
                            {msg}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={close}></button>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Pinlist