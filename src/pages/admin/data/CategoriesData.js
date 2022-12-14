import React, { useState, useEffect } from 'react';
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Radio, Button, Space, Switch, Table, Input, Modal, message } from 'antd';
import './categoriesData.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function CategoriesData(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchedText, setSearchText ] = useState("");

  // Search
  const onSearch = (value) => {
    setSearchText(value);
  };
  const { Search } = Input;

  // Data
  const [dataSource, setDataSource] = useState([
    // {  id: uuidv4(), name: `This is category No.1`},
    // {  id: uuidv4(), name: `This is category No.2`},
  ]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get(
          'https://lavie-backend.herokuapp.com/api/categories'
        )
        setDataSource(res.data)
        setAddingCategory(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTodos()
  }, [])

  const columns = [
    {
      title: 'Loại tags',
      dataIndex: 'name',
      filteredValue: [searchedText],
      onFilter: (value, record)=>{
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      className: 'ant-table-cell-action',
      render: (record) => {
        return(
          <Space style={{width:'100%', justifyContent:'center'}} align="center" size="middle">
            <a>
              <EditOutlined
              style={{color: 'green', marginLeft: '15px'}}
              onClick={()=>{
                editCategory(record);
              }}
              />
            </a>
            <a>
              <DeleteOutlined
              style={{color: 'red', marginLeft: '15px'}}
              onClick={()=>{
                deleteCategory(record)
              }}
              />
            </a>
          </Space>
        )
      },
    },
  ];



  // Add Category
  const [isAdding, setIsAdding] = useState(false);
  const [addingCategory, setAddingCategory] = useState({
    // id: uuidv4(), 
    name: ""
  })
  const onAddCategory = ()=>{
    setIsAdding(true)
  }
  const resetAdding = ()=>{
    setIsAdding(false)
    setAddingCategory(false)
  }
  // const addCategory = async (addingCategory) => {
  //   // const request = {
  //   //   // id: uuid(),
  //   //   ...addingCategory,
  //   // };
  //   try {
  //     const res = await axios.post(
  //       'https://lavie-backend.herokuapp.com/api/categories',{
  //         addingCategory
  //       },
  //     );
  //     console.log(res.data);
  //     setDataSource(pre=>{return[...pre, res.data]});
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };
  


  // Delete Category
  const deleteCategory = (record, id) => {
    Modal.confirm({
      title: `Bạn có chắc chắn muốn xoá loại tag "${record.name}" không?`,
      cancelText: "Huỷ",
      centered: "center",
      okText: "Xoá",
      onOk: async () => {
        try {
          await axios.delete(`https://lavie-backend.herokuapp.com/api/categories/${id}`)
          // const newCategory = dataSource.filter(td => td.id !== record.id)
          setDataSource((pre) => {
            return pre.filter((td) => td.id !== record.id)
          })
        } catch (error) {
          console.log(error.message)
        }
        console.log(dataSource)
      }
    })
  }

  // Edit Category
  const editCategory=(record)=>{
    setIsEditing(true);
    setEditingCategory({...record})
  }
  const resetEditing=()=>{
    setIsEditing(false);
    setEditingCategory(null);
  }

  return (
    <div className='ctg-all'>
      <div className='ctg-sbt'>
        {/* Add Category */}
        <Button type="primary" variant="outlined" onClick={()=>{
          onAddCategory()
        }}>
          Thêm
        </Button>
        <Modal
        title="Thêm loại tag mới"
        visible={isAdding}
        centered
        cancelText="Huỷ"
        okText="Thêm"
        onCancel={()=>{
          resetAdding()
        }}
        onOk={ ()=>{
          // const request = {
          //   // id: uuid(),
          //   ...addingCategory,
          // };
          // try {
          //   const res = await axios.post(
          //     'https://lavie-backend.herokuapp.com/api/categories',
              
          //       request
              
          //   )
            console.log(dataSource)
            setDataSource(pre=>{
              return [...pre, addingCategory]
            })
          // } catch (error) {
          //   console.log(error)
          // }
          // addCategory();
          resetAdding()
        }}
        >
          <Input value={addingCategory.name} onChange={(e)=>{
            e.preventDefault();
            // e.stopPropagation();
            // try {
            //   const res = await axios.post(
            //     'https://lavie-backend.herokuapp.com/api/categories',{
            //       name: e.target.value
            //     },
            //     setAddingCategory(pre=>{
            //       return{...pre, name: e.target.value}
            //     }),
            //     console.log(dataSource)
            //   )
            // } catch (error) {
            //   console.log(error)
            // }
            setAddingCategory(()=>{
              return{
                // ...pre, 
                id: uuidv4(), 
                name: e.target.value
              }
            })
            console.log(addingCategory)
          }}/>
        </Modal>

        {/* Search Category */}
        <Search
        prefix = {<SearchOutlined />}
        placeholder="Tìm kiếm"
        allowClear
        enterButton="Tìm kiếm"
        onSearch={onSearch}
        />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
      />

      {/* Edit Category */}
      <Modal
      title="Chỉnh sửa loại tag"
      visible={isEditing}
      centered
      cancelText="Huỷ"
      okText="Lưu"
      onCancel={()=>{
        resetEditing()
      }}
      onOk={()=>{
        setDataSource(pre=>{
          return pre.map(category=>{
            if(category.id === editingCategory.id){
              return editingCategory;
            }
            return category;
          })
        })
        resetEditing();
      }}
      >
        <Input value={editingCategory?.name} onChange={(e)=>{
          setEditingCategory(pre=>{
            return{...pre, name: e.target.value}
          })
        }}/>
      </Modal>
    </div>
  );
};
export default CategoriesData;