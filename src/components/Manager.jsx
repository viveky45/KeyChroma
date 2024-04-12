import React, { useRef, useState, useEffect } from 'react'
import addicon from "../assets/addicon.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [dataArray, setdataArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setdataArray(JSON.parse(passwords));
        }

    }, [])



    const showPassword = () => {

        if (ref.current.src.includes("/icons/visibility.svg")) {
            ref.current.src = "/icons/visibilityoff.svg"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "/icons/visibility.svg"
            passwordRef.current.type = "password"
        }
    }
    const savePassword = () => {
        if(form.site.length!=0&&form.username.length!=0&&form.password.length!=0){
            setdataArray([...dataArray, {...form,id:uuidv4()}]);
            localStorage.setItem("passwords", JSON.stringify([...dataArray, {...form,id:uuidv4()}]))
        }
        else{
            toast("Fields can't be empty!", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            
                });
        }
        console.log([...dataArray, {...form,id:uuidv4()}])
        
    }
    const handleDelete = (id) => {
        let newData=  dataArray.filter((item)=> item.id!==id)  
       
        setdataArray(newData);
        
        localStorage.setItem("passwords", JSON.stringify(newData));
    }
    const handleEdit=(id)=>{

        console.log(id)
        let pass= dataArray.filter((item)=> item.id===id);
        setform(pass[0])
        

    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        
            });
        navigator.clipboard.writeText(text)
    }




    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <ToastContainer />
            <div><div className="absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            </div></div>

            <div className=" mx-auto max-w-4xl h-[calc(100% - 88px)] p-4 flex flex-col gap-4 ">
                <h1 className='text-[#43287d] underline underline-offset-4 drop text-center text-lg font-bold'>&lt;Your Own Password Manager/&gt;</h1>
                <div className='flex flex-col p-4 gap-8  '>

                    <input onChange={handleChange} value={form.site} className='inputBox bg-[#1f2937] text-xl' type="text" name="site" placeholder='Enter Website Url' id="site" />

                    <div className="flex flex-col sm:flex-row gap-8 relative">
                        <input onChange={handleChange} value={form.username} className='inputBox w-full bg-[#1f2937]' type="text" placeholder='Enter Username' name="username" id="username" />

                        <input ref={passwordRef} onChange={handleChange} value={form.password} className='inputBox w-full  bg-[#1f2937]' name="password" type="password" placeholder='Enter Password' id="password" />

                        <span className='eyebtn cursor-pointer absolute bottom-1 right-2 sm:right-1 sm:top-1 ' onClick={showPassword} ><img ref={ref} className='invert' src="/icons/visibility.svg" alt="eye" /></span>
                    </div>
                    <div className='m-auto'><button className='addpassBtn flex justify-around'><img className='w-6  text' src={addicon} alt="" /><span onClick={savePassword} className='addpasstxt text-[#eb0e0edd] px-4 font-bold'>Save</span></button></div>
                </div>


                <div className="font-extrabold text-lg text-[#996ff2]">Your Saved Passwords</div>

                <div className="passTable relative overflow-x-auto h-[37vh] overflow-auto  rounded-lg">

                    <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs w-full  text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-3 py-3 w-[40%] bg-[#2f176e]">
                                    Website URL
                                </th>
                                <th scope="col" className="px-3 py-3 bg-[#2f176c6b]">
                                    Username
                                </th>
                                <th scope="col" className="px-3 py-3 bg-[#2f176e] ">
                                    Password
                                </th>
                                <th scope="col" className="px-3 py-3 bg-[#2f176c6b] ">Action
                                </th>
                            </tr>
                        </thead>
                        {dataArray.length === 0 && <tbody ><tr><td className='p-4'>No Saved Password!</td></tr></tbody>}
                        {dataArray.length !== 0 && <tbody>

                            {dataArray.map((item) => {
                                {
                                    return <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 ">
                                        <th scope="row" className="px-4 py-4 flex  items-center justify-between  font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-gray-800 " >
                                            <a className='hover:underline hover:underline-offset-4' target='_blank' href="{item.site}"><span className='siteurl' >{item.site}</span></a><span className="cpybtn cursor-pointer" onClick={() => copyText(item.site)} ><span class="material-symbols-outlined">
                                                content_copy
                                            </span></span>
                                        </th>
                                        <td className="px-3  py-4 bg-[#091425fe]"><span className='flex justify-between items-center' ><span>{item.username}</span> <span className="cpybtn cursor-pointer" onClick={() => copyText(item.username)} ><span class="material-symbols-outlined">
                                            content_copy
                                        </span></span></span>
                                        </td>
                                        <td className="px-3 py-4 bg-gray-50 dark:bg-gray-800">
                                            <span className='flex items-center justify-between'><span>{item.password}</span>
                                                <span className="cpybtn cursor-pointer" id onClick={() => copyText(item.password)} ><span class="material-symbols-outlined">
                                                    content_copy
                                                </span></span></span>
                                        </td>
                                        <td className="px-3 py-4  bg-[#091425fe]">
                                        <span className='flex justify-around items-center gap-4'>
                                                <span className='cursor-pointer' onClick={()=>{handleEdit(item.id)}}><span class="material-symbols-outlined">
                                                    edit_square
                                                </span></span>
                                                <span className='cursor-pointer' onClick={()=>confirm("Are you sure! you want to delete the data?")? handleDelete(item.id):""}><span class="material-symbols-outlined">
                                                    delete
                                                </span></span>
                                            </span>
                                        </td>
                                    </tr>
                                }
                            })}

                        </tbody>
                        }
                    </table>
                </div>

            </div>

        </>
    )
}

export default Manager
