import React,{useState, useEffect} from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../component/Form/CategoryForm';
import { Modal} from 'antd';





const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [selected, setSelected] = useState(null);


    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name});
             if (res?.data.success){
                toast.success(`${name} is Created.`)
                getAllCategory();
                setName("");
             }else{
                toast.error(res.data.message);
             }
        }catch(error){
            console.log(error);
            toast.error("Something wrong in input form");
        }
    }

    //get all category
    const getAllCategory = async() =>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if(data?.success){
                setCategory(data.category);
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    }

    useEffect(()=>{
        getAllCategory();
    },[])


    const handleUpdate = async(e) =>{
        e.preventDefault()
        try{
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name:updatedName});
            if(res.data.success){
                toast.success(res.data.message);
                setSelected(null);
                setUpdatedName("");
                getAllCategory();
                setVisible(false);
            }else{
                toast.error(res.data.message)
            }


        }catch(error){
            console.log(error);
            toast.error("something wrong in update input");
        }
    }

    const handleDelete = async(id) =>{
        try{
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`);
            if(res.data.success){
                toast.success(res.data.message);
                getAllCategory();
                setSelected(null);
            }else{
                toast.error(res.data.message);
            }

        }catch(error){
            console.log(error);
            toast.error("Something wrong in delete")
        }
    }

  return (
    <Layout
      title={"Dashboard - Create Category"}
      discription={
        "Town Shop is your trusted online shopping destination for fashion, electronics, home essentials, beauty products, and more. Enjoy secure payments, fast delivery, and great deals."
      }
      keywords={
        "Town Shop, online shopping, e-commerce, fashion, electronics, clothing, home appliances, beauty products, accessories, online store, best deals, shopping website"
      }
      author={"Rohit Chauhan"}
    >
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="p-3 w-85">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  
                    {category?.map((c)=>(
                        <>
                            <tr>
                                <td key={c._id}>{c.name}</td>
                                <td>
                                <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                                <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}} >Delete</button>
                                </td>
                            </tr>
                        </>
                    ))}
                  
                </tbody>
              </table>
            </div>
            <Modal
                title="Change Category Name"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={visible}
                footer={null}
                onCancel={()=>setVisible(false)}>
                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory